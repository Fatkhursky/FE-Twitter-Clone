import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import { graphQLClient } from '@/src/libraries/graphql-request'
import { GET_ACCESS_TOKEN } from '@/src/requests/graphql'

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

          const user = data?.getAccessToken || {}
          return {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            accessToken: user?.accessToken,
            refreshToken: user?.refreshToken,
          }
        } catch (e) {
          console.log(3333399, e)
          throw new Error('error auth')
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }
      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id
        session.accessToken = token.accessToken
        session.refreshToken = token.refreshToken
      }
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
