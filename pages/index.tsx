// @ts-nocheck

import Login from '@/src/components/login-page/login'
import LoginTwo from '@/src/components/login-page/login-two'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Head from 'next/head'

const LoginPage = () => {
  const [name, setName] = useState('')
  const [isNext, setIsNext] = useState(false)
  const [userName, setUserName] = useState('')

  const isUserName = (e) => {
    e.preventDefault()
    setIsNext(true)
  }

  let router = useRouter()

  const toSignUp = () => {
    setIsNext(false)
    router.push('/register')
  }

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="wrap" style={{ backgroundColor: '' }}>
        <div className="loginpage">
          {isNext ? (
            <LoginTwo userName={userName} toSignUp={toSignUp} />
          ) : (
            <Login
              className="loginpage__login"
              passName={name}
              username={userName}
              onChangeUsername={(e) => setUserName(e.target.value)}
              onSubmitUserName={isUserName}
              pointer={!userName ? 'none' : ''}
              color={userName ? 'black' : 'rgba(156, 153, 153)'}
            />
          )}
        </div>
      </div>
    </>
  )
}
export default LoginPage
