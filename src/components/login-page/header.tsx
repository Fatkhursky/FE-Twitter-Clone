// @ts-nocheck
import { FaTwitter } from 'react-icons/fa'
import { mySvg } from '~/public/assets/svg'
import Link from 'next/link'
import { useAtom } from 'jotai'
import { stepRegisterAtom, stepLoginAtom } from '@/src/stores/jotai-atom'
import { useRouter } from 'next/router'

const Header = () => {
  const [stepRegister, setStepRegister] = useAtom(stepRegisterAtom)
  const [stepLogin, setStepLogin] = useAtom(stepLoginAtom)

  const toLogin = () => router.push('/')

  const router = useRouter()

  if (router.pathname === '/login')
    return (
      <div>
        <div className="bg-white flex items-center lg:rounded-t-xl p-2 w-screen lg:w-600 ">
          <div className="w-1/2">
            {stepLogin ? (
              <div className="p-2">
                <div
                  onClick={() => setStepLogin(0)}
                  className="cursor-pointer p-2 hover:bg-slate-200 rounded-full w-fit"
                >
                  <svg className="h-5 w-5 ">{mySvg.close}</svg>
                </div>
              </div>
            ) : (
              <Link href={'https://www.google.com/'}>
                <div className="p-2">
                  <div className="cursor-pointer p-2 hover:bg-slate-200 rounded-full w-fit">
                    <svg className="h-5 w-5 ">{mySvg.close}</svg>
                  </div>
                </div>
              </Link>
            )}
          </div>

          <FaTwitter className="w-7 h-7 text-blue-500" />
          <div className="loginpage__headright"></div>
        </div>
      </div>
    )
  if (router.pathname === '/register')
    return (
      <div>
        <div className="bg-white flex items-center lg:rounded-t-xl p-2 lg:w-600 w-screen">
          <div className="p-2 flex items-center justify-center gap-2">
            {+stepRegister === 1 ? (
              <div
                className="cursor-pointer p-2 hover:bg-slate-200 rounded-full w-fit"
                onClick={toLogin}
              >
                <svg className="h-5 w-5">{mySvg.close}</svg>
              </div>
            ) : (
              <div
                style={{ cursor: 'pointer' }}
                className="loginpage__head__close"
                onClick={() => setStepRegister(+stepRegister - 1)}
              >
                <></>
                <svg className="h-5 w-5">{mySvg.arrow}</svg>
              </div>
            )}

            <h2 className="font-bold">Step {stepRegister} of 6</h2>
          </div>
          <div className="loginpage__headright"></div>
        </div>
      </div>
    )
}

export default Header
