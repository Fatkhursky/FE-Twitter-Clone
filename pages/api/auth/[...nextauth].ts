import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import { authLink, client } from '@/src/utilities/apollo'
import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client'

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
          const { data } = await client.mutate({
            mutation: gql`
              mutation fdsdf($data: GetAccessTokenInput!) {
                getAccessToken(data: $data) {
                  id
                  name
                  email
                  accessToken
                  refreshToken
                }
              }
            `,
            variables: {
              data: {
                password: credentials?.password || '',
                phone: credentials?.username || '',
              },
            },
          })
          console.log(333344441, data, credentials)
          console.log(111, credentials)
          //database look up
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
    //encryption: true,
  },
  pages: {
    signIn: '/login',
  },
})
