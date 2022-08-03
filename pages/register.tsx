// @ts-nocheck
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useAtom } from 'jotai'
import { stepRegisterAtom } from '@/src/stores/jotai-atom'
import toast, { Toaster } from 'react-hot-toast'
import Header from '@/src/components/login-page/header'
import Head from 'next/head'
import { register } from '@/src/requests'
import Modal from 'react-modal'
import { authentication } from '.././firebase-config/firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import clsx from 'clsx'

const LoginPage = () => {
  const [fullname, setfullName] = useState('')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [years, setYears] = useState('')
  const dateOfBirth = years.concat('-', month, '-', day)
  const birthDate = toMonthName(month).concat(' ', day, ',', ' ', years)
  const [phone, setPhone] = useState('')
  const [inpPhone, setInpPhone] = useState('')
  const [invalidPass, setInvalidPass] = useState(false)
  const [OTP, setOTP] = useState('')
  const [passNull, setPassNull] = useState(true)
  const [isInvalidNumber, setIsInvalidNumber] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [password, setPassword] = useState('')
  const isTrue = fullname && phone && month && day && years ? true : false
  const [stepNum, setStepNum] = useAtom(stepRegisterAtom)
  const [passFocus, setPassFocus] = useState(false)
  let router = useRouter()

  console.log(router.pathname)
  console.log(33, stepNum)

  //generate date to birth date input form
  function toMonthName(month) {
    const date = new Date()
    date.setMonth(month - 1)

    return date.toLocaleString('en-US', {
      month: 'short',
    })
  }

  //Firebase OTP sms Auth
  function generateRecaptcha() {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      authentication
    )
  }
  const requestOTP = (e) => {
    e.preventDefault()
    if (phone.length >= 12) {
      //setExpandForm(true)
      closeModal()
      generateRecaptcha()
      let appVerifier = window.recaptchaVerifier
      signInWithPhoneNumber(authentication, phone, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult
          console.log('masuk then')
          setStepNum(stepNum + 1)
        })
        .catch((error) => {
          console.log('masuk catch')
          console.log(error)
        })
    }
  }

  const submitOTP = () => {
    let otp = OTP
    //setOTP(otp)
    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          const user = result.user
          setStepNum(stepNum + 1)
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          console.log(error)
        })
    }
  }
  const [customStyles, setCustomStyle] = useState('')
  //Modal
  Modal.setAppElement('*')
  useEffect(() => {
    setCustomStyle({
      overlay: { background: 'rgba(112, 110, 110, 0.65)' },
      content: {
        borderRadius: '15px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        //border: '1px solid rgba(204, 202, 202, 0.75)'
      },
    })
  }, [])

  // const customStyles = {
  //   overlay: { background: 'rgba(112, 110, 110, 0.65)' },
  //   content: {
  //     borderRadius: '15px',
  //     top: '50%',
  //     left: '50%',
  //     right: 'auto',
  //     bottom: 'auto',
  //     marginRight: '-50%',
  //     transform: 'translate(-50%, -50%)',
  //     //border: '1px solid rgba(204, 202, 202, 0.75)'
  //   },
  // }

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const isPassNull = (e) => {
    e.preventDefault()
    setPassNull(!passNull)
  }

  function getUserName(name) {
    return (name =
      '@' + name.replaceAll(' ', '_') + Math.random().toString(36).slice(2, 5))
  }

  //let username = getUserName(fullname)
  const [username, setusername] = useState('')

  const onChangeName = (e) => {
    let fullname = e.target.value
    setfullName(fullname)
    setusername(getUserName(fullname))
  }

  const isApril = month === '4'
  const isJune = month === '6'
  const isSeptember = month === '9'
  const isNovember = month === '11'
  const isFebruary = month === '2'
  const yearNotNull = years !== ''

  const isLeapYear = () => {
    yearNotNull && years % 100 === 0
      ? yearNotNull && years % 400 === 0
      : yearNotNull && years % 4 === 0
  }

  const yearComp = yearsDate.map((obj) => obj.component)

  const yearFilter = yearsDate.map((obj) => {
    if (obj.value % 4 === 0) {
      return obj.component
    }
    return obj.value
  })

  const getDay = () => {
    if (isApril || isJune || isSeptember || isNovember) {
      return daysDate.slice(0, 31)
    } else if (isFebruary && isLeapYear()) {
      return daysDate.slice(0, 30)
    } else if (isFebruary) {
      return daysDate.slice(0, 30)
    } else {
      return daysDate
    }
  }

  const getYear = () => {
    if (isFebruary && day === '29') {
      return yearFilter
    } else {
      return yearComp
    }
  }

  const notify = async () => {
    const newReg = { fullname, dateOfBirth, username, password, phone }
    try {
      const [error, res] = await register(newReg)
      if (error) throw error
      return res.data.message
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message)
      } else if (error.request) {
        throw new Error(error.request)
      } else {
        throw new Error(error.message)
      }
    }
  }

  const toSign = () => {
    router.push('/')
    setStepNum(0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.promise(
      notify(),
      {
        loading: 'Loading...',
        success: (data) => {
          setTimeout(toSign, 1200)

          //setDAte(regisTime)
          return data
        },
        error: (error) => `${error}`,
      },
      {
        style: {
          minWidth: '250px',
        },
        success: {
          duration: 1000,
        },
      }
    )
  }

  const noFeature = () => {
    alert('Fitur belum tersedia')
  }

  const onChangePhone = (e) => {
    let phone = e.target.value
    setPhone(phone)
    function isValidNumber(phone) {
      if (!isFinite(phone)) {
        setIsInvalidNumber(true)
      } else {
        setIsInvalidNumber(false)
      }
    }
    function changeCountryCode(phone) {
      phone = phone.split('')
      if (phone[0] !== '0') {
        setIsInvalidNumber(true)
      }
      if (phone[0] === undefined) {
        setIsInvalidNumber(false)
      }
      if (phone[0] === '0') {
        phone.splice(0, 1, '+', '6', '2')
        return (phone = phone.join(''))
      }
    }
    isValidNumber(phone)
    setInpPhone(phone)
    setPhone(changeCountryCode(phone))
  }

  const onChangeMonth = (e) => setMonth(e.target.value)
  const onChangeDay = (e) => setDay(e.target.value)
  const onChangeYears = (e) => setYears(e.target.value)

  const onChangePassword = (e) => {
    let pass = e.target.value
    setPassword(pass)
    if (pass.length < 8) {
      setInvalidPass(true)
    } else {
      setInvalidPass(false)
    }
  }
  if (stepNum === 1)
    return (
      <>
        <Head>
          <title>Register</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className="background bg-zinc-400 h-screen flex flex-col items-center justify-center">
          <Header />
          <div className="wrapper overflow-y-auto overflow-hidden bg-white h-410 w-600  flex flex-col">
            <div className="content flex flex-col w-11/12 mx-auto gap-5 p-5">
              <div className="loginpage__signup__title1">
                <h1 className="text-2xl font-bold">Create your account</h1>
              </div>

              <div className="textfield-outlined">
                <input
                  autoFocus="autofocus"
                  id="one"
                  type="text"
                  value={fullname}
                  placeholder="&nbsp;&nbsp;"
                  onChange={onChangeName}
                />
                <label htmlFor="one">Name</label>
              </div>

              <div className="textfield-outlined">
                <input
                  id="one"
                  type="text"
                  placeholder="&nbsp;&nbsp;"
                  value={inpPhone}
                  onChange={onChangePhone}
                />
                <label htmlFor="one">Phone</label>
              </div>

              <div>
                {isInvalidNumber ? (
                  <p
                    style={{
                      float: 'left',
                      color: 'red',
                      marginTop: '0px',
                      fontSize: '11px',
                    }}
                  >
                    Please enter a valid phone number.
                  </p>
                ) : null}
                <p
                  onClick={noFeature}
                  id="email"
                  style={{
                    cursor: 'pointer',
                    color: 'rgb(30, 167, 247)',
                    float: 'right',
                  }}
                >
                  Use email instead
                </p>
              </div>

              <div style={{ textAlign: 'left' }}>
                <p className="cursor-pointer text-blue-400 font-bold">Date of birth</p>
                <p className="loginpage__signup__desc">
                  This will not be shown publicly. Confirm your own age, even if this
                  account is for a business, a pet, or something else.
                </p>
              </div>

              <div className="flex gap-2 ">
                <select
                  className="w-3/5 p-2 rounded-md border focus:border-blue-400 focus:border-2"
                  list="Month"
                  placeholder="Month"
                  value={month}
                  onChange={onChangeMonth}
                >
                  {monthsDate}
                </select>
                <select
                  className="w-1/4 rounded-md p-4 border focus:border-blue-400 focus:border-2"
                  list="Days"
                  placeholder="Day"
                  value={day}
                  onChange={onChangeDay}
                >
                  {getDay()}
                </select>
                <select
                  className="w-1/3 rounded-md p-2 border focus:border-blue-400 focus:border-2"
                  list="Years"
                  placeholder="Year"
                  value={years}
                  onChange={onChangeYears}
                >
                  {getYear()}
                </select>
              </div>
            </div>
          </div>

          <div className="footer bg-white p-5 w-600 flex items-center justify-center rounded-b-xl">
            <div
              onClick={() => setStepNum(stepNum + 1)}
              className={clsx(
                'p-3 w-11/12 flex items-center justify-center rounded-full',
                isTrue ? 'bg-[#1f2937] cursor-pointer' : 'bg-[#a1a1aa]'
              )}
            >
              <button
                className={clsx(
                  'font-bold text-xl text-white',
                  isTrue ? 'cursor-pointer' : 'pointer-events-none'
                )}
                type="submit"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </>
    )
  if (stepNum === 2)
    return (
      <>
        <Head>
          <title>Register</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <div className="background bg-zinc-400 h-screen flex flex-col items-center justify-center">
          <Header />
          <div className="wrapper overflow-y-auto overflow-hidden bg-white h-410 w-600  flex flex-col">
            <div className="content flex flex-col w-11/12 mx-auto gap-5 p-5">
              <div className="loginpage__signup__step2 flex flex-col gap-3">
                <div className="text-3xl font-bold">
                  <h1>Customize your experience</h1>
                </div>

                <div className="text-xl font-semibold">
                  <h2>Track where you see Twitter content across the web</h2>
                </div>

                <div className="flex items-center">
                  <p>
                    Twitter uses this data to personalize your experience. This web
                    browsing history will never be stored with your name, email, or phone
                    number.
                  </p>
                  <div className="loginpage__signup__checkbox">
                    <input style={{ cursor: 'pointer' }} type="checkbox" />
                  </div>
                </div>
                <p>
                  By signing up, you agree to our{' '}
                  <span className="loginpage__signup__backlink">Terms</span>,{' '}
                  <span className="loginpage__signup__backlink">Privacy Policy</span>, and{' '}
                  <span className="loginpage__signup__backlink">Cookie Use</span>. Twitter
                  may use your contact information, including your email address and phone
                  number for purposes outlined in our Privacy Policy.{' '}
                  <span className="loginpage__signup__backlink">Learn more</span>
                </p>
              </div>
            </div>
          </div>
          <div className="footer bg-white p-5 w-600 flex items-center justify-center rounded-b-xl">
            <div
              onClick={() => setStepNum(stepNum + 1)}
              className="cursor-pointer p-3 w-11/12 bg flex bg-[#1f2937]  items-center justify-center rounded-full"
            >
              <button className="font-bold text-xl text-white" type="submit">
                Next
              </button>
            </div>
          </div>
        </div>
      </>
    )
  if (stepNum === 3)
    return (
      <>
        <Head>
          <title>Register</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className="background bg-zinc-400 h-screen flex flex-col items-center justify-center">
          <Header />
          <div className="wrapper overflow-y-auto overflow-hidden bg-white h-300 w-600 flex flex-col">
            <div className="content flex flex-col w-11/12 mx-auto gap-5 p-5">
              <div className="text-3xl font-bold">
                <h1>Create your account</h1>
              </div>

              <div className="textfield-outlined">
                <input
                  id="one"
                  type="text"
                  value={fullname || ''}
                  onClick={() => setStepNum(1)}
                  placeholder="&nbsp;&nbsp;"
                  readOnly
                />
                <label htmlFor="one">Name</label>
              </div>
              <div className="textfield-outlined">
                <input
                  id="two"
                  type="text"
                  value={inpPhone || ''}
                  onClick={() => setStepNum(1)}
                  placeholder="&nbsp;&nbsp;"
                  readOnly
                />
                <label htmlFor="two">Phone</label>
              </div>
              <div className="textfield-outlined">
                <input
                  id="three"
                  type="text"
                  value={birthDate || ''}
                  onClick={() => setStepNum(1)}
                  placeholder="&nbsp;&nbsp;"
                  readOnly
                />
                <label htmlFor="three">Birth date</label>
              </div>
            </div>
          </div>
          <div className="footer bg-white p-5 w-600 flex flex-col items-center justify-center rounded-b-xl gap-3">
            <div className="w-11/12">
              <p>
                By signing up, you agree to the{' '}
                <span className="text-blue-400">Terms of Service</span> and{' '}
                <span className="text-blue-400">Privacy Policy</span>, including{' '}
                <span className="text-blue-400">Cookie Use</span>. Twitter may use your
                contact information, including your email address and phone number for
                purposes outlined in our Privacy Policy, like keeping your account secure
                and personalizing our services, including ads.{' '}
                <span className="text-blue-400">Learn more</span>. Others will be able to
                find you by email or phone number, when provided, unless you choose
                otherwise
                <span className="text-blue-400"> here</span>.
              </p>
            </div>

            <Modal
              isOpen={modalIsOpen}
              //onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div className="flex flex-col gap-2 p-2 w-56">
                <div>
                  <h2 className="font-bold text-xl">Verify phone</h2>
                </div>

                <div>
                  <p className="text-slate-500">
                    We'll text your verification code to {inpPhone}. Standard SMS fees may
                    apply.
                  </p>
                </div>

                <button
                  onClick={requestOTP}
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                    borderRadius: '25px',
                    height: '35px',
                    //width: '75%',
                    cursor: 'pointer',
                  }}
                >
                  Ok
                </button>
                <button
                  onClick={() => {
                    closeModal()
                    setStepNum(1)
                  }}
                  style={{
                    borderRadius: '25px',
                    border: '1px solid rgb(204, 202, 202)',
                    height: '35px',
                    //width: '75%',
                    marginTop: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Edit
                </button>
              </div>
            </Modal>
            <div
              onClick={openModal}
              className="cursor-pointer p-3 w-11/12 flex bg-blue-400 items-center justify-center rounded-full"
            >
              <button type="submit" className="text-white font-bold text-xl">
                Sign up
              </button>
            </div>
          </div>

          <div id="recaptcha-container"></div>
        </div>
      </>
    )
  if (stepNum === 4)
    return (
      <>
        <Head>
          <title>Register</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className="background bg-zinc-400 h-screen flex flex-col items-center justify-center">
          <Header />
          <div className="wrapper overflow-y-auto overflow-hidden bg-white h-410 w-600 flex flex-col">
            <div className="content flex flex-col w-11/12 mx-auto gap-5 p-5">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-5">
                  <h1 className="font-bold text-xl">We sent you a code</h1>
                  <p>
                    {' '}
                    <span className="text-slate-500">Enter it below to verify</span>{' '}
                    {inpPhone}
                  </p>
                </div>

                <div className="textfield-outlined">
                  <input
                    id="one"
                    type="text"
                    value={OTP}
                    onChange={(e) => setOTP(e.target.value)}
                    placeholder="&nbsp;&nbsp;"
                  />
                  <label htmlFor="one">Verification code</label>
                </div>
              </div>
            </div>
          </div>
          <div className="footer p-5 w-600 bg-white flex flex-col items-center justify-center rounded-b-xl gap-3">
            <div
              onClick={submitOTP}
              className={clsx(
                'w-11/12 items-center justify-center flex rounded-full p-3',
                OTP ? 'bg-zinc-700 cursor-pointer' : 'bg-slate-400'
              )}
            >
              <button
                className={clsx(
                  'font-bold text-xl text-white',
                  OTP ? 'cursor-pointer' : 'pointer-events-none'
                )}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </>
    )
  if (stepNum === 5)
    return (
      <>
        <Head>
          <title>Register</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className="background bg-zinc-400 h-screen flex flex-col items-center justify-center">
          <Header />
          <div className="wrapper overflow-y-auto overflow-hidden bg-white h-410 w-600 flex flex-col">
            <div className="content flex flex-col w-11/12 mx-auto gap-5 p-5">
              <div className="flex flex-col gap-3">
                <div className="font-bold text-xl">
                  <h1>You're username</h1>
                </div>
                <div>
                  <p>
                    Remember this username!.{' '}
                    <span className="text-slate-500">
                      use uername or your phone number for login later.
                    </span>{' '}
                  </p>
                </div>

                <div className="textfield-outlined">
                  <input
                    disabled
                    id="one"
                    type="text"
                    value={username}
                    placeholder="&nbsp;&nbsp;"
                  />
                  <label htmlFor="one">Username</label>
                </div>
              </div>
            </div>
          </div>
          <div className="footer p-5 w-600 bg-white flex flex-col items-center justify-center rounded-b-xl gap-3">
            <div
              onClick={() => setStepNum(stepNum + 1)}
              className="cursor-pointer w-11/12 items-center justify-center flex rounded-full p-3 bg-zinc-800"
            >
              <button className="text-white font-bold text">Next</button>
            </div>

            <Toaster />
          </div>
        </div>
      </>
    )
  if (stepNum === 6)
    return (
      <>
        <Head>
          <title>Register</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <form className="background bg-zinc-400 h-screen flex flex-col items-center justify-center">
          <Header />
          <div className="wrapper overflow-y-auto overflow-hidden bg-white h-410 w-600 flex flex-col">
            <div className="content flex flex-col w-11/12 mx-auto gap-5 p-5">
              <div className="flex flex-col gap-2">
                <div className="font-bold text-2xl">
                  <h1>You'll need set a password</h1>
                </div>
                <div className="text-slate-500">
                  <p>Make sure it's 8 character or more.</p>
                </div>

                <div className="textfield-outlined  flex items-center">
                  <input
                    id="one"
                    type={passNull ? 'password' : 'text'}
                    value={password}
                    placeholder="&nbsp;&nbsp;"
                    onChange={onChangePassword}
                    onMouseEnter={() => setPassFocus(true)}
                  />
                  <label
                    htmlFor="one"
                    className={clsx(
                      passFocus && invalidPass && password
                        ? 'text-red-500'
                        : 'text-stone-700'
                    )}
                  >
                    Password
                  </label>
                  <svg
                    onClick={isPassNull}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5 absolute right-2 cursor-pointer"
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

                {password && invalidPass ? (
                  <p style={{ textAlign: 'left', marginTop: '0px', color: 'red' }}>
                    Your password needs to be at least 8 characters. Please enter a longer
                    one.
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          <div className="footer p-5 w-600 bg-white flex flex-col items-center justify-center rounded-b-xl gap-3">
            <div
              onClick={handleSubmit}
              className={clsx(
                'w-11/12 items-center justify-center flex rounded-full p-3',
                password ? 'bg-zinc-800 cursor-pointer' : 'bg-gray-400'
              )}
            >
              <button
                className={clsx(
                  'text-white font-bold',
                  password ? 'cursor-pointer' : 'pointer-events-none'
                )}
                type="submit"
             
              >
                Submit
              </button>
            </div>

            <Toaster />
          </div>
        </form>
      </>
    )
}
export default LoginPage

const monthsDate = [
  <option key={1} value="" hidden>
    Month
  </option>,
  <option key={2} value="1">
    January
  </option>,
  <option key={3} value="2">
    February
  </option>,
  <option key={4} value="3">
    March
  </option>,
  <option key={5} value="4">
    April
  </option>,
  <option key={6} value="5">
    May
  </option>,
  <option key={7} value="6">
    June
  </option>,
  <option key={8} value="7">
    July
  </option>,
  <option key={9} value="8">
    August
  </option>,
  <option key={10} value="9">
    September
  </option>,
  <option key={11} value="10">
    October
  </option>,
  <option key={12} value="11">
    November
  </option>,
  <option key={13} value="12">
    December
  </option>,
]

const daysDate = [
  <option key={1} value="" hidden>
    Day
  </option>,
  <option key={2} value="1">
    1
  </option>,
  <option key={3} value="2">
    2
  </option>,
  <option key={4} value="3">
    3
  </option>,
  <option key={5} value="4">
    4
  </option>,
  <option key={6} value="5">
    5
  </option>,
  <option key={7} value="6">
    6
  </option>,
  <option key={8} value="7">
    7
  </option>,
  <option key={9} value="8">
    8
  </option>,
  <option key={10} value="9">
    9
  </option>,
  <option key={11} value="10">
    10
  </option>,
  <option key={12} value="11">
    11
  </option>,
  <option key={13} value="12">
    12
  </option>,
  <option key={14} value="13">
    13
  </option>,
  <option key={15} value="14">
    14
  </option>,
  <option key={16} value="15">
    15
  </option>,
  <option key={17} value="16">
    16
  </option>,
  <option key={18} value="17">
    17
  </option>,
  <option key={19} value="18">
    18
  </option>,
  <option key={20} value="19">
    19
  </option>,
  <option key={21} value="20">
    20
  </option>,
  <option key={22} value="21">
    21
  </option>,
  <option key={23} value="22">
    22
  </option>,
  <option key={24} value="23">
    23
  </option>,
  <option key={25} value="24">
    24
  </option>,
  <option key={26} value="25">
    25
  </option>,
  <option key={27} value="26">
    26
  </option>,
  <option key={28} value="27">
    27
  </option>,
  <option key={29} value="28">
    28
  </option>,
  <option key={30} value="29">
    29
  </option>,
  <option key={31} value="30">
    30
  </option>,
  <option key={32} value="31">
    31
  </option>,
]

const yearsDate = [
  {
    value: 0,
    component: (
      <option key={1} value="" hidden>
        Year
      </option>
    ),
  },
  {
    value: 1989,
    component: (
      <option key={2} value="1989">
        1989
      </option>
    ),
  },
  {
    value: 1990,
    component: (
      <option key={3} value="1990">
        1990
      </option>
    ),
  },
  {
    value: 1991,
    component: (
      <option key={4} value="1991">
        1991
      </option>
    ),
  },
  {
    value: 1992,
    component: (
      <option key={5} value="1992">
        1992
      </option>
    ),
  },
  {
    value: 1993,
    component: (
      <option key={6} value="1993">
        1993
      </option>
    ),
  },
  {
    value: 1994,
    component: (
      <option key={7} value="1994">
        1994
      </option>
    ),
  },
  {
    value: 1995,
    component: (
      <option key={8} value="1995">
        1995
      </option>
    ),
  },
  {
    value: 1996,
    component: (
      <option key={9} value="1996">
        1996
      </option>
    ),
  },
  {
    value: 1997,
    component: (
      <option key={10} value="1997">
        1997
      </option>
    ),
  },
  {
    value: 1998,
    component: (
      <option key={11} value="1998">
        1998
      </option>
    ),
  },
  {
    value: 1999,
    component: (
      <option key={12} value="1999">
        1999
      </option>
    ),
  },
  {
    value: 2000,
    component: (
      <option key={13} value="2000">
        2000
      </option>
    ),
  },
  {
    value: 2001,
    component: (
      <option key={14} value="2001">
        2001
      </option>
    ),
  },
  {
    value: 2002,
    component: (
      <option key={15} value="2002">
        2002
      </option>
    ),
  },
  {
    value: 2003,
    component: (
      <option key={16} value="2003">
        2003
      </option>
    ),
  },
  {
    value: 2004,
    component: (
      <option key={17} value="2004">
        2004
      </option>
    ),
  },
  {
    value: 2005,
    component: (
      <option key={18} value="2005">
        2005
      </option>
    ),
  },
  {
    value: 2006,
    component: (
      <option key={19} value="2006">
        2006
      </option>
    ),
  },
  {
    value: 2007,
    component: (
      <option key={20} value="2007">
        2007
      </option>
    ),
  },
  {
    value: 2008,
    component: (
      <option key={21} value="2008">
        2008
      </option>
    ),
  },
  {
    value: 2009,
    component: (
      <option key={22} value="2009">
        2009
      </option>
    ),
  },
  {
    value: 2010,
    component: (
      <option key={23} value="2010">
        2010
      </option>
    ),
  },
  {
    value: 2011,
    component: (
      <option key={24} value="2011">
        2011
      </option>
    ),
  },
  {
    value: 2012,
    component: (
      <option key={25} value="2012">
        2012
      </option>
    ),
  },
  {
    value: 2013,
    component: (
      <option key={26} value="2013">
        2013
      </option>
    ),
  },
  {
    value: 2014,
    component: (
      <option key={27} value="2014">
        2014
      </option>
    ),
  },
  {
    value: 2015,
    component: (
      <option key={28} value="2015">
        2015
      </option>
    ),
  },
  {
    value: 2016,
    component: (
      <option key={29} value="2016">
        2016
      </option>
    ),
  },
]
