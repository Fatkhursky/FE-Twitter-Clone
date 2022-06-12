import "./../src/styles/index.scss"
import './../src/tess/src/index.scss'
import './../src/tess/components/loginPage/index.scss';
import './../src/tess/components/home/index.scss';
import './../src/tess/components/home/profile.scss';
import './../src/tess/components/addTweet/index.scss';
import './../src/tess/src/index2.scss'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
