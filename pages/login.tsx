// @ts-nocheck

import Login from '@/src/components/login-page/login'
import LoginTwo from '@/src/components/login-page/login-two'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useAtom } from 'jotai'
import {
  fieldPhone,
  fieldUserName,
  fieldEmail,
  fieldPhoneCode,
  invalidField,
} from '@/src/stores/jotai-atom'
import { stepLoginAtom, stepRegisterAtom } from '@/src/stores/jotai-atom'

const LoginPage = () => {
  const [phone, setPhone] = useAtom(fieldPhone)
  const [email, setEmail] = useAtom(fieldEmail)
  const [userName, setUserName] = useAtom(fieldUserName)
  const [stepLogin, setStepLogin] = useAtom(stepLoginAtom)
  const [phoneCode, setPhonecode] = useAtom(fieldPhoneCode)
  const [invalid, setInvalid] = useAtom(invalidField)

  // useEffect(() => {
  //   // Perform localStorage action
  //   const item = localStorage.getItem('Bearer')
  //   console.log(111,item)
  // }, [])

  const isUserName = (e) => {
    e.preventDefault()
    setStepLogin(1)
  }

  let router = useRouter()

  const toSignUp = () => {
    setStepLogin(0)
    router.push('/register')
  }

  function onChangePhoneEmailOrUsername(e) {
    let field = e.target.value

    function isNumber(field) {
      field = field.split('')
      if (field[0] === '0') {
        return field.join('')
      }
    }
    function isUserName(field) {
      field = field.split('')
      if (field[0] === '@') {
        return field.join('')
      }
    }
    function addPhoneCode(field) {
      field = field.split('')
      if (field[0] === '0') {
        field.splice(0, 1, '+', '6', '2')
        return (field = field.join(''))
      }
    }
    function invalidField(field) {
      field = field.split('')
      if (field[0] !== '0' && field[0] !== '@') {
        //field.splice(0, 1, '+', '6', '2')
        return (field = field.join(''))
      }
    }

    setUserName(isUserName(field))
    setPhone(isNumber(field))
    setPhonecode(addPhoneCode(field))
    setInvalid(invalidField(field))
  }

  const [v, setV] = useState(false)

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="wrap">
        <div className="loginpage">
          {stepLogin ? (
            <LoginTwo userName={userName} toSignUp={toSignUp} phone={phone} />
          ) : (
            <Login
              className="loginpage__login"
              onChangePhoneEmailOrUsername={onChangePhoneEmailOrUsername}
              onSubmitUserName={isUserName}
              pointer={userName || phone ? '' : 'none'}
              color={userName || phone ? 'black' : 'rgba(156, 153, 153)'}
            />
          )}
        </div>
      </div>
    </>
  )
}
export default LoginPage
