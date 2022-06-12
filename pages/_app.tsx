import '@/src/styles/global.scss'
import '@/src/styles/index.scss'
import '@/src/styles/loginPage.scss'
import '@/src/styles/home.scss'
import '@/src/styles/profile.scss'
import '@/src/styles/addTweet.scss'
import '@/src/styles/index2.scss'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
