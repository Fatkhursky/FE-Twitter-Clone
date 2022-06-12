import '@/src/styles/global.scss'
import '@/src/styles/index-1.scss'
import '@/src/styles/login-page.scss'
import '@/src/styles/home.scss'
import '@/src/styles/profile.scss'
import '@/src/styles/add-tweet.scss'
import '@/src/styles/index-2.scss'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
