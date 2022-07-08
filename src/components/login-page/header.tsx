// @ts-nocheck
import { FaTwitter } from 'react-icons/fa'
import { mySvg } from '~/public/assets/svg'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAtom } from 'jotai'
import { stepAtom } from '@/src/stores/jotai-atom'

const Header = () => {
const [stepNum] = useAtom(stepAtom)

  const { asPath } = useRouter()
  let router = useRouter()

  const toLogin = () => router.push('/')

  if (asPath === '/') {
    return (
      <div>
        <div className="loginpage__head">
          <div className="loginpage__headleft">
            <Link href={'https://www.google.com/'}>
              <div className="loginpage__head__close" style={{cursor: "pointer"}}>{mySvg.close}</div>
            </Link>
          </div>

          <FaTwitter
            className="loginpage__head__twitter"
            style={{ color: 'rgb(16, 131, 238)', fontSize: '35px' }}
          />
          <div className="loginpage__headright"></div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div className="loginpage__head">
          <div className="loginpage__headleft">
            <div
              style={{ cursor: 'pointer' }}
              className="loginpage__head__close"
              onClick={toLogin}
            >
              {mySvg.close}
              
            </div>
            <h2 style={{paddingLeft: "5%"}}>Step {+stepNum + 1} of 5</h2>
          </div>
          <div className="loginpage__headright"></div>
        </div>
      </div>
    )
  }
}

export default Header
