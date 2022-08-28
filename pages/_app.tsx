import '@/src/styles/globals.scss'
import '@/src/styles/global.scss'
import '@/src/styles/index-1.scss'
import '@/src/styles/add-tweet.scss'
import '@/src/styles/index-2.scss'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/src/libraries/apollo'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </SessionProvider>
      </QueryClientProvider>
    </ApolloProvider>
  )
}
export default MyApp
