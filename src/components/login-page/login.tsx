// @ts-nocheck
import Link from 'next/link'
import Header from './header'
import { mySvg } from '~/public/assets/svg.js'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import clsx from 'clsx'
import {
  fieldPhone,
  fieldUserName,
  fieldEmail,
  invalidField,
} from '@/src/stores/jotai-atom'
import useBreakpoint from '@/src/shared-hooks/use-breakpoint'
import { useEffect } from 'react'
const Login = ({ onChangePhoneEmailOrUsername, onSubmitUserName }) => {
  const router = useRouter()
const [breakpoint] = useBreakpoint()
  // useEffect(() => console.log(breakpoint, 88))
  const noFeature = (e) => {
    e.preventDefault()
    alert('Fitur belum tersedia, klik "Sign up" untuk mendaftar')
  }

  const [phone] = useAtom(fieldPhone)
  const [username] = useAtom(fieldUserName)
  const [email] = useAtom(fieldEmail)
  const [invalid, setInvalid] = useAtom(invalidField)

  const handleButtonForgotPassword = () => {
    router.push('/i/flow/password_reset')
  }

  return (
    <div className="background bg-zinc-400 h-screen flex flex-col items-center justify-center">
      <Header />

      <form
        onSubmit={onSubmitUserName}
        className="wrapper overflow-y-auto overflow-hidden bg-white lg:rounded-b-xl h-screen lg:h-505 lg:w-600 w-screen  flex flex-col"
      >
        <div className="content flex flex-col w-96 mx-auto my-auto gap-5 p-5 ">
          <div className="font-bold text-2xl ">
            <h2>Sign in to Twitter</h2>
          </div>
          <div
            onClick={noFeature}
            className="gap-1 cursor-pointer p-1 rounded-full border border-slate-200 w-full justify-center flex items-center"
          >
            {mySvg.google}
            <p>Sign in with Google</p>
          </div>
          <div
            onClick={noFeature}
            className="gap-1 cursor-pointer p-1 rounded-full border border-slate-200 w-full justify-center flex items-center"
          >
            {mySvg.apple}
            <span>Sign in with Apple</span>
          </div>
          <div className="flex items-center">
            <div className="flex-grow bg bg-gray-300 border"></div>
            <div className="flex-grow-0 mx-5 text dark:text-white">or</div>
            <div className="flex-grow bg bg-gray-300 border"></div>
          </div>

          <div className="textfield-outlined">
            <input
              id="one"
              type="text"
              placeholder="&nbsp;&nbsp;"
              value={username || email || phone || invalid}
              onChange={onChangePhoneEmailOrUsername}
              style={invalid ? { border: '1px solid #e51818' } : null}
            />
            <label htmlFor="one">Phone or username</label>
          </div>

          <button
            type="submit"
            className={clsx(
              'py-2 rounded-full   text-white hover:bg-[#27272a]',
              username || phone
                ? 'cursor-pointer bg-[#18181b]'
                : 'pointer-events-none bg-[#71717a]'
            )}
          >
            Next
          </button>

          <button
            onClick={handleButtonForgotPassword}
            className="border rounded-full py-2 hover:bg-[#d1d5db]"
          >
            Forgot Password?
          </button>

          <h1 className="loginpage__login__bottom">
            Don't have account?&nbsp;{' '}
            <span className="text-blue-500 font-bold">
              <Link href="/register">Sign up</Link>
            </span>
          </h1>
        </div>
      </form>
    </div>
  )
}
export default Login
