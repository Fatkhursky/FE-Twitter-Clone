// @ts-nocheck

import Signup from '@/src/components/loginPage/signup'
import { useRouter } from 'next/router'
import { useState } from 'react'

const LoginPage = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [years, setYears] = useState('')
  const isTrue = name && phone && month && day && years ? true : false
  const username = `user${name}`
  const password = `pass${name}`
  const email = `${name}@gmail.com`

  let router = useRouter()

  return (
    <div className="wrap" style={{ backgroundColor: '' }}>
      <div className="loginpage">
        <Signup
          className="loginpage__signup"
          onChangeName={(e) => setName(e.target.value)}
          onChangePhone={(e) => setPhone(e.target.value)}
          onChangeMonth={(e) => setMonth(e.target.value)}
          onChangeDay={(e) => setDay(e.target.value)}
          onChangeYears={(e) => setYears(e.target.value)}
          month={month}
          year={years}
          day={day}
          color={isTrue ? 'rgb(44, 43, 43)' : ''}
          pointer={isTrue ? 'pointer' : ''}
          event={isTrue ? '' : 'none'}
          name={name}
          username={username}
          password={password}
          email={email}
          phone={phone}
        />
      </div>
    </div>
  )
}
export default LoginPage
