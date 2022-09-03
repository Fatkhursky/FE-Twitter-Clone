import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import { graphQLClient } from '@/src/libraries/graphql-request'
import { GET_ACCESS_TOKEN } from '@/src/requests/graphql'
import { decodeToken } from 'react-jwt'
async function refreshAccessToken(tokenObject: any) {
  try {
    // Get a new set of tokens with a refreshToken
    const tokenResponse = await graphQLClient.request(GET_ACCESS_TOKEN, {
      token: tokenObject.data.getAccessToken.refreshToken,
    })
    console.log(88, tokenResponse)

    return {
      ...tokenObject.data.getAccessToken,
      accessToken: tokenResponse.data.getAccessToken.accessToken,
      refreshToken: tokenResponse.data.getAccessToken.refreshToken,
    }
  } catch (error) {
    return {
      ...tokenObject,
      error: 'RefreshAccessTokenError',
    }
  }
}

export default NextAuth({
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Email', type: 'text', placeholder: 'john@.com' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials: any) => {
        try {
          const data = await graphQLClient.request(GET_ACCESS_TOKEN, {
            data: {
              password: credentials?.password || '',
              phone: credentials?.username || '',
            },
          })
          console.log(666, data)
          const user = data?.getAccessToken || {}
          return {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            accessToken: user?.accessToken,
            refreshToken: user?.refreshToken,
            username: user?.username,
            created_at: user?.created_at,
          }
          //return  null
        } catch (e) {
          //console.log(3333399, e)
          throw new Error('error auth')
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // first time jwt callback is run, user object is available

      if (user) {
        //@ts-ignore
        const myDecodeToken = decodeToken(user.accessToken)
        token.id = user.id
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.username = user.username
        token.created_at = user.created_at
        //@ts-ignore
        token.accessTokenExpiry = myDecodeToken.exp
      }
      //@ts-ignore
      console.log(token, 8888)
      //console.log(new Date(token.exp * 1000), 222)
      // check if accessTokenExpiry in 24 hours.
      //@ts-ignore

      const shouldRefreshTime = token.accessTokenExpiry - Math.round(new Date().getTime() / 1000)
      //console.log(shouldRefreshTime, 67676)
      // If the token is still valid, just return it.
       if (shouldRefreshTime > 0) {
         console.log('token note xpired')
         return token
       }
      // If the call arrives after 24 hours have passed, we should to refresh the token.
      console.log('expired tokens')
      token = await refreshAccessToken(token)
      return token
      //return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id
        session.accessToken = token.accessToken
        session.refreshToken = token.refreshToken
        session.username = token.username
        session.created_at = token.created_at
      }
      //console.log(session, 3333)
      return session
    },
  },
  secret: 'test',
  jwt: {
    secret: 'test',
  },
  pages: {
    signIn: '/login',
  },
})
