import { GraphQLClient } from 'graphql-request'
import { getSession } from 'next-auth/react'

const endpoint = 'https://l210526-twitter-clone-be.herokuapp.com/graphql'

async function middleware(request: RequestInit) {
  const session = await getSession()
  return {
    ...request,
    headers: {
      ...request.headers,
      authorization: session?.accessToken || '',
    },
  }
}

const graphQLClient = new GraphQLClient(endpoint, {
  // @ts-ignore
  requestMiddleware: middleware,
})

export { graphQLClient }
