// @ts-nocheck
import Link from 'next/link'
import Header from './header'
import { mySvg } from '~/public/assets/svg.js'
import { useRouter } from 'next/router'
import { useAtom, atom } from 'jotai'
import {
  stepLoginAtom,
  fieldPhone,
  fieldUserName,
  fieldEmail,
  fieldPhoneCode,
  invalidField
} from '@/src/stores/jotai-atom'
import { useEffect } from 'react'

const Login = ({
  onChangePhoneEmailOrUsername,
  onSubmitUserName,
  pointer,
  color,
}) => {
  const [stepRegister, setStepRegister] = useAtom(stepLoginAtom)

  const noFeature = (e) => {
    e.preventDefault()
    alert('Fitur belum tersedia, klik "Sign up" untuk mendaftar')
  }
  
  const [phone] = useAtom(fieldPhone)
  const [username] = useAtom(fieldUserName)
  const [email] = useAtom(fieldEmail)
  const [invalid, setInvalid] = useAtom(invalidField)

  return (
    <div className="loginpage__login__wrap">
      <Header />
      <form onSubmit={onSubmitUserName} className="loginpage__login__box__outer">
        <div className="loginpage__login__box__inner">
          <div className="loginpage__login__box__content">
            <div className="loginpage__login__box__wrap">
              <div className="loginpage__login__title">
                <h2>Sign in to Twitter</h2>
              </div>
              <div
                onClick={noFeature}
                style={{ cursor: 'pointer' }}
                className="loginpage__login__buttons1"
              >
                {mySvg.google}
                <p>Sign in with Google</p>
              </div>
              <div
                onClick={noFeature}
                style={{ cursor: 'pointer' }}
                className="loginpage__login__buttons1"
              >
                {mySvg.apple}
                <span>Sign in with Apple</span>
              </div>
              <h1 className="loginpage__login__content">
                <span>Or</span>
              </h1>

              <label htmlFor="" className="loginpage__login__inp" >
                <input
                  className="loginpage__login__form"
                  type="text"
                  placeholder="&nbsp;&nbsp;"
                  value={username || email || phone || invalid}
                  onChange={onChangePhoneEmailOrUsername}
                  style={invalid ?  { border: '1px solid #e51818'} : null}
                  
                />
                <span
                  className="loginpage__login__label"
                  style={invalid ? {color:'red'} : null}
                >
                  Phone or username
                </span>
              </label>

              <button
                style={{
                  cursor: 'pointer',
                  pointerEvents: pointer,
                  backgroundColor: color,
                }}
                type="submit"
                className="loginpage__login__buttons2"
              >
                Next
              </button>

              <button
                onClick={noFeature}
                style={{ cursor: 'pointer' }}
                className="loginpage__login__buttons2 loginpage__login__buttons2--second"
              >
                Forgot Password?
              </button>

              <h1 className="loginpage__login__bottom">
                Don't have account?&nbsp;{' '}
                <span>
                  <Link
                    href="/register"
                    style={
                      {
                        // cursor: 'pointer',
                        //textDecoration: 'none',
                        //color: 'rgb(16, 131, 238)',
                      }
                    }
                  >
                    Sign up
                  </Link>
                </span>
              </h1>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
export default Login
