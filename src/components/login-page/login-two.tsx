//@ts-nocheck
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import Header from './header'
import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { login } from '@/src/requests'
import { useAtom } from 'jotai'
import {
  fieldUserName,
  fieldPhone,
  fieldEmail,
  fieldPhoneCode,
  globalCreateAccDate
} from '@/src/stores/jotai-atom'
import clsx from 'clsx'
import { useQuery, gql, useMutation } from '@apollo/client'
import { LOGIN_MUTATION } from '@/src/requests/graphql'
import { FaProjectDiagram } from 'react-icons/fa'

//userName, toSignUp, phone
const LoginTwo = ({ toSignUp }) => {
  const [passNull, setPassNull] = useState(true)
  const [passValue, setPassValue] = useState('')
  const [phone, setPhone] = useAtom(fieldPhone)
  const [userName, setUserName] = useAtom(fieldUserName)
  const [createAccDate, setCreateAccDate] = useAtom(globalCreateAccDate)
  const [phoneCode, setPhonecode] = useAtom(fieldPhoneCode)

  const isPassNull = (e) => {
    e.preventDefault()
    setPassNull(!passNull)
  }

  const onChangePass = (e) => {
    setPassValue(e.target.value)
  }

  const [loginGql, { data, loading, error }] = useMutation(LOGIN_MUTATION)

  const notify = async () => {
  
    const varGql = phoneCode ? {data: {phone: phoneCode , password: passValue}} : {data: {username:userName , password: passValue}}
    try {
     if (error) throw error
      const  data   = await loginGql({variables: varGql})
      //const [error, res] = await login(newLogin)
      console.log( 564, data.data.getAccessToken.username)
      //setCreateAccDate(data.data.getAccessToken.created_at)
      //setName(data.data.getAccessToken.name)
      //setUserName(data.data.getAccessToken.username)
      console.log(123, userName)
      const token = data.data.getAccessToken.accessToken
      localStorage.setItem('Bearer', token)
      //auth signIn
      const setSession = await signIn('credentials', {
        username: userName || phoneCode,
        password: passValue,
        redirect: false,
      })
      //console.log(77, setSession)

      return ('Login sucess')
    } catch (error) {
      //console.log(666, error)
      if (error.response) {
        throw new Error(error.response.data.data.message)
      } else if (error.request) {
        throw new Error(error.request)
      } else {
        throw new Error(error.message)
      }
    }
  }

  let router = useRouter()
  const toHome = () => {
    router.push('/Home')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.promise(
      notify(),
      {
        loading: 'Loading...',
        success: (data) => {
          const token = localStorage.getItem('Bearer')
          // const wait = () => {
          //   if (token) {
          //     return toHome()
          //   }
          // }
          // setTimeout(wait, 1000)
          toHome()
          return data
        },
        error: (error) => `${error}`,
      },
      {
        style: {
          minWidth: '250px',
        },
        success: {
          duration: 500,
        },
      }
    )
  }
  return (
    <form onSubmit={handleSubmit} className="background bg-zinc-400 h-screen flex flex-col items-center justify-center">
      <Header />
      <div
      
        className="wrapper overflow-y-auto overflow-hidden bg-white h-410 w-600  flex flex-col"
        
      >
        <div className="content flex flex-col w-3/4 mx-auto  gap-5 p-5">
          <div className="">
            <div className="loginpage__logintwo__box">
              <div className="flex flex-col gap-3">
                <div className="loginpage__login__title1">
                  <h2 className="text-3xl">Enter your password</h2>
                </div>
                <div className="textfield-outlined">
                  <input
                    id="one"
                    type="text"
                    value={userName || phone}
                    disabled={true}
                  />
                  <label htmlFor="one">{userName ? 'username' : 'phone'}</label>
                </div>

                <div className="textfield-outlined">
                  <input
                    id="two"
                    type={passNull ? 'password' : 'text'}
                    value={passValue}
                    onChange={onChangePass}
                    placeholder="&nbsp;&nbsp;"
                  />
                  <label htmlFor="two">Password</label>
                  <svg
                    onClick={isPassNull}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5 absolute right-2 top-1/3 cursor-pointer"
                    style={{ color: 'rgb(15, 20, 25)' }}
                  >
                    {passNull ? (
                      <g>
                        <path d="M14.548 11.634c-1.207 0-2.188-.98-2.188-2.188 0-.664.302-1.25.77-1.653-.363-.097-.736-.165-1.13-.165-2.416 0-4.375 1.96-4.375 4.376S9.585 16.38 12 16.38c2.418 0 4.377-1.96 4.377-4.376 0-.4-.07-.78-.17-1.146-.402.47-.992.776-1.66.776z"></path>
                        <path d="M12 19.79c-7.228 0-10.12-6.724-10.24-7.01-.254-.466-.254-1.105.035-1.642C1.88 10.923 4.772 4.2 12 4.2s10.12 6.723 10.24 7.01c.254.465.254 1.104-.035 1.64-.085.216-2.977 6.94-10.205 6.94zm0-14c-6.154 0-8.668 5.787-8.772 6.033-.068.135-.068.208-.033.273.137.316 2.65 6.104 8.805 6.104 6.18 0 8.747-5.973 8.772-6.033.07-.136.07-.21.034-.274-.138-.316-2.652-6.103-8.806-6.103z"></path>
                      </g>
                    ) : (
                      <g>
                        <path d="M7.625 12.004c0 .15.03.292.044.438l4.777-4.778c-.147-.018-.294-.036-.447-.036-2.416 0-4.375 1.96-4.375 4.376zm8.752 0c0-.156-.018-.306-.037-.456l-4.786 4.787c.15.015.293.045.446.045 2.418 0 4.377-1.96 4.377-4.376z"></path>
                        <path d="M20.806 11.893c.036.064.036.138-.034.274-.025.06-2.592 6.033-8.772 6.033-.745 0-1.433-.088-2.073-.237l-1.284 1.284c.998.333 2.108.543 3.357.543 7.228 0 10.12-6.724 10.205-6.94.29-.536.29-1.175.035-1.64-.057-.136-.747-1.72-2.216-3.346L18.897 8.99c1.246 1.397 1.844 2.755 1.91 2.903zm-17.616.203c-.035-.065-.035-.138.033-.273.104-.246 2.618-6.033 8.772-6.033.748 0 1.44.088 2.082.24l1.283-1.284c-1-.335-2.113-.546-3.365-.546-7.228 0-10.12 6.723-10.205 6.938-.29.537-.29 1.176-.035 1.642.057.136.748 1.722 2.22 3.35l1.128-1.126c-1.25-1.398-1.848-2.76-1.913-2.908zm-.778 10.242c-.192 0-.384-.073-.53-.22-.293-.293-.293-.768 0-1.06L21.058 1.882c.293-.294.768-.294 1.06 0s.294.767 0 1.06L2.942 22.12c-.146.145-.338.22-.53.218z"></path>
                      </g>
                    )}
                  </svg>
                </div>
                <Toaster />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer bg-white flex items-center justify-center rounded-b-xl w-600">
        <div className="wrapper w-3/4 flex flex-col">
          <div>
            <button
              type="submit"
              className={clsx("flex justify-center rounded-full py-3 w-full items-center text-white font-bold text-xl", passValue ? 'bg-slate-800 cursor-pointer': 'bg-slate-400 pointer-events-none')}
            >
              Log in
            </button>
          </div>
          <div className="p-3">
            <div className="flex gap-1">
              Don't have account?{' '}
              <span className="text-blue-700 font-bold text-md">
                <button onClick={toSignUp}>Sign Up</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default LoginTwo

//0832 896 214
// const notify = async () => {
//   const newLogin = { username: userName, phone: phoneCode, password: passValue }
//   try {
//     const [error, res] = await login(newLogin)
//     if (error) throw error

//     localStorage.setItem('Bearer', res.data.data.accessToken)
//     //auth signIN
//     const setSession = await signIn('credentials', {
//       username: userName || phoneCode,
//       password: passValue,
//       redirect: false,
//     })
//     //console.log(77, setSession)

//     return res.data.message
//   } catch (error) {
//     //console.log(666, error)
//     if (error.response) {
//       throw new Error(error.response.data.data.message)
//     } else if (error.request) {
//       throw new Error(error.request)
//     } else {
//       throw new Error(error.message)
//     }
//   }
// }