// @ts-nocheck

import Login from '@/src/components/loginPage/login'
import LoginTwo from '@/src/components/loginPage/login-two'
import { useRouter } from 'next/router'
import { useState } from 'react'

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
  )
}
export default LoginPage
