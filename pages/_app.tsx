import '@/src/styles/globals.scss'
import '@/src/styles/global.scss'
import '@/src/styles/index-1.scss'
import '@/src/styles/add-tweet.scss'
import '@/src/styles/index-2.scss'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/src/utilities/apollo'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ApolloProvider>
  )
}
export default MyApp
