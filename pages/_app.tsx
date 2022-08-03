import '@/src/styles/globals.scss'
import '@/src/styles/global.scss'
import '@/src/styles/index-1.scss'
import '@/src/styles/add-tweet.scss'
import '@/src/styles/index-2.scss'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
export default MyApp
