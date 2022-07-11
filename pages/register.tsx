// @ts-nocheck
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAtom } from 'jotai'
import { stepRegisterAtom } from '@/src/stores/jotai-atom'
import toast, { Toaster } from 'react-hot-toast'
import Header from '@/src/components/login-page/header'
import Head from 'next/head'
import { register } from '@/src/requests'
import Modal from 'react-modal'
import { authentication } from '.././firebase-config/firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'

const LoginPage = () => {
  const [fullname, setfullName] = useState('')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [years, setYears] = useState('')
  const dateOfBirth = years.concat('-', month, '-', day)
  const birthDate = toMonthName(month).concat(' ', day, ',', ' ', years)
  const [phone, setPhone] = useState('')
  const [inpPhone, setInpPhone] = useState('')
  function toMonthName(month) {
    const date = new Date()
    date.setMonth(month - 1)

    return date.toLocaleString('en-US', {
      month: 'short',
    })
  }

  //Firebase OTP sms Auth
  const [OTP, setOTP] = useState('')
  const generateRecaptcha = () => {
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
          setStepNum(3)
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
          console.log(user)
          setStepNum(4)
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          console.log('masuk catcth')
          console.log(error)
        })
    }
  }

  //Modal
  Modal.setAppElement('*')
  const customStyles = {
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
  }
  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const [passNull, setPassNull] = useState(true)
  const isPassNull = (e) => {
    e.preventDefault()
    setPassNull(!passNull)
  }

  const [isInvalidNumber, setIsInvalidNumber] = useState(false)

  function getUserName(name) {
    return (name = '@' + name + Math.random().toString(36).slice(2, 5))
  }

  let username = getUserName(fullname)

  const [password, setPassword] = useState('')
  const isTrue = fullname && phone && month && day && years ? true : false
  const [stepNum, setStepNum] = useAtom(stepRegisterAtom)

  const isApril = month === '4'
  const isJune = month === '6'
  const isSeptember = month === '9'
  const isNovember = month === '11'
  const isFebruary = month === '2'
  const yearNotNull = years !== ''
  const isLeapYear = () =>
    yearNotNull && years % 100 === 0
      ? yearNotNull && years % 400 === 0
      : yearNotNull && years % 4 === 0
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

  let router = useRouter()

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

  const onChangeName = (e) => setfullName(e.target.value)

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

  const [invalidPass, setInvalidPass] = useState(false)
  const onChangePassword = (e) => {
    let pass = e.target.value
    setPassword(pass)
    if (pass.length < 8) {
      setInvalidPass(true)
    } else {
      setInvalidPass(false)
    }
  }
  const [passFocus, setPassFocus] = useState(false)
  //const [verifFocus, setVerifFocus] = useState(false)

  if (stepNum === 1) {
    return (
      <>
        <Head>
          <title>Register</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <div className="wrap">
          <div className="loginpage">
            <div className="loginpage__signup__wrap">
              <Header />
              <div style={{ backgroundColor: '' }} className="loginpage__signup__main">
                <div className="loginpage__signup__form">
                  <div className="loginpage__signup__step2">
                    <h1>Customize your experience</h1>
                    <h2>Track where you see Twitter content across the web</h2>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <p>
                        Twitter uses this data to personalize your experience. This web
                        browsing history will never be stored with your name, email, or
                        phone number.
                      </p>
                      <div className="loginpage__signup__checkbox">
                        <input style={{ cursor: 'pointer' }} type="checkbox" />
                      </div>
                    </div>
                    <p>
                      By signing up, you agree to our{' '}
                      <span className="loginpage__signup__backlink">Terms</span>,{' '}
                      <span className="loginpage__signup__backlink">Privacy Policy</span>,
                      and <span className="loginpage__signup__backlink">Cookie Use</span>.
                      Twitter may use your contact information, including your email
                      address and phone number for purposes outlined in our Privacy
                      Policy.{' '}
                      <span className="loginpage__signup__backlink">Learn more</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="loginpage__signup__footer">
                <button
                  className="loginpage__signup__button"
                  type="submit"
                  onClick={() => setStepNum(2)}
                  style={{
                    textDecoration: 'none',
                    backgroundColor: 'rgb(44, 43, 43)',
                    cursor: 'pointer',
                    //pointerEvents: check ? '' : 'none',
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  } else if (stepNum === 2) {
    return (
      <>
        <Head>
          <title>Register</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className="wrap">
          <div className="loginpage">
            <div className="loginpage__signup__wrap">
              <Header />
              <div style={{ backgroundColor: '' }} className="loginpage__signup__main">
                <div className="loginpage__signup__form">
                  <div className="loginpage__signup__title1">
                    <h1 className="loginpage__signup__title">Create your account</h1>
                  </div>

                  <label htmlFor="" className="loginpage__signup__inp">
                    <input
                      className="loginpage__signup__form__animation"
                      type="text"
                      placeholder="&nbsp;&nbsp;"
                      value={fullname}
                      onClick={() => setStepNum(0)}
                      //onChange={onChangeName}
                    />
                    <span className="loginpage__signup__label">Name</span>
                  </label>

                  <label htmlFor="" className="loginpage__signup__inp">
                    <input
                      className="loginpage__signup__form__animation"
                      type="text"
                      placeholder="&nbsp;&nbsp;"
                      value={inpPhone}
                      onClick={() => setStepNum(0)}
                    />
                    <span className="loginpage__signup__label">Phone</span>
                  </label>
                  <label htmlFor="" className="loginpage__signup__inp">
                    <input
                      className="loginpage__signup__form__animation"
                      type="text"
                      placeholder="&nbsp;&nbsp;"
                      value={birthDate}
                      onClick={() => setStepNum(0)}
                      //onChange={onChangeName}
                    />
                    <span className="loginpage__signup__label">Birth date</span>
                  </label>
                </div>
              </div>

              <div className="loginpage__signup__footer__step3">
                <p style={{ textAlign: 'left', padding: '5px 45px', fontSize: '11px' }}>
                  By signing up, you agree to the{' '}
                  <span className="loginpage__signup__backlink">Terms of Service</span>{' '}
                  and <span className="loginpage__signup__backlink">Privacy Policy</span>,
                  including{' '}
                  <span className="loginpage__signup__backlink">Cookie Use</span>. Twitter
                  may use your contact information, including your email address and phone
                  number for purposes outlined in our Privacy Policy, like keeping your
                  account secure and personalizing our services, including ads.{' '}
                  <span className="loginpage__signup__backlink">Learn more</span>. Others
                  will be able to find you by email or phone number, when provided, unless
                  you choose otherwise
                  <span className="loginpage__signup__backlink"> here</span>.
                </p>

                {/* <button onClick={openModal}>Open Modal</button> */}

                <Modal
                  isOpen={modalIsOpen}
                  //onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  {/* <button onClick={closeModal}>close</button> */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      maxWidth: '270px',
                      padding: '10px',
                      //marginTop: '0px'
                    }}
                  >
                    <h2 style={{ marginTop: '0px' }}>Verify phone</h2>
                    <p style={{ marginTop: '-10px' }}>
                      We'll text your verification code to {inpPhone}. Standard SMS fees may
                      apply.
                    </p>
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
                      onClick={() => setStepNum(0)}
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

                <button
                  className="loginpage__signup2__button"
                  type="submit"
                  onClick={openModal}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
          <div id="recaptcha-container"></div>
        </div>
      </>
    )
  } else if (stepNum === 3) {
    return (
      <>
        <Head>
          <title>Register</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className="wrap">
          <div className="loginpage">
            <div className="loginpage__signup__wrap">
              <Header />
              <div className="loginpage__signup__main">
                <div className="loginpage__signup__form">
                  <div>
                    <h1 style={{ textAlign: 'left' }}>We sent you a code</h1>
                    <p style={{ textAlign: 'left', marginTop: '-15px' }}>
                      Enter it below to verify {phone}
                    </p>
                  </div>

                  <label htmlFor="" className="loginpage__signup__inp">
                    <input
                      className="loginpage__signup__form__animation"
                      type="text"
                      placeholder="&nbsp;&nbsp;"
                      value={OTP}
                      onChange={(e) => setOTP(e.target.value)}
                      //onMouseEnter={() => setVerifFocus(true)}
                    />
                    <span className="loginpage__signup__label">Verification code</span>
                  </label>
                  <p
                    style={{
                      textAlign: 'left',
                      marginTop: '0px',
                      color: '#1885e5',
                      cursor: 'pointer',
                    }}
                    onClick={noFeature}
                  >
                    Don't receive email?
                  </p>
                </div>
              </div>
              <div className="loginpage__signup__footer">
                <button
                  className="loginpage__signup__button"
                  //type="submit"
                  onClick={submitOTP}
                  style={{
                    textDecoration: 'none',
                    backgroundColor: isTrue ? 'rgb(44, 43, 43)' : '',
                    cursor: isTrue ? 'pointer' : '',
                    pointerEvents: isTrue ? '' : 'none',
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  } else if (stepNum === 4) {
    return (
      <>
        <Head>
          <title>Register</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <form className="wrap">
          <div className="loginpage">
            <div className="loginpage__signup__wrap">
              <Header />
              <div className="loginpage__signup__main">
                <div className="loginpage__signup__form">
                  <div>
                    <h1 style={{ textAlign: 'left' }}>You'll need set a password</h1>
                    <p style={{ textAlign: 'left', marginTop: '-15px' }}>
                      Make sure it's 8 character or more.
                    </p>
                  </div>

                  <label htmlFor="" className="loginpage__signup__inp">
                    <input
                      className="loginpage__signup__form__animation"
                      type={passNull ? 'password' : 'text'}
                      placeholder="&nbsp;&nbsp;"
                      value={password}
                      onChange={onChangePassword}
                      style={
                        passFocus && invalidPass && password
                          ? { border: '1px solid #e51818' }
                          : null
                      }
                      onMouseEnter={() => setPassFocus(true)}
                    />
                    <span
                      className="loginpage__signup__label"
                      style={
                        passFocus && invalidPass && password ? { color: 'red' } : null
                      }
                    >
                      Password
                    </span>
                    <svg
                      onClick={isPassNull}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="loginpage__signup__eye"
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
                  </label>
                  {password && invalidPass ? (
                    <p style={{ textAlign: 'left', marginTop: '0px', color: 'red' }}>
                      Your password needs to be at least 8 characters. Please enter a
                      longer one.
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="loginpage__signup__footer">
                <button
                  className="loginpage__signup__button"
                  type="submit"
                  onClick={handleSubmit}
                  style={{
                    textDecoration: 'none',
                    backgroundColor: password ? 'rgb(44, 43, 43)' : '',
                    cursor: isTrue ? 'pointer' : '',
                    pointerEvents: password ? '' : 'none',
                  }}
                >
                  Submit
                </button>
                <Toaster />
              </div>
            </div>
          </div>
        </form>
      </>
    )
  } else {
    return (
      <>
        <Head>
          <title>Register</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className="wrap">
          <div className="loginpage">
            <div className="loginpage__signup__wrap">
              <Header />
              <div style={{ backgroundColor: '' }} className="loginpage__signup__main">
                <div className="loginpage__signup__form">
                  <div className="loginpage__signup__title1">
                    <h1 className="loginpage__signup__title">Create your account</h1>
                  </div>

                  <label htmlFor="" className="loginpage__signup__inp">
                    <input
                      autoFocus="autofocus"
                      className="loginpage__signup__form__animation"
                      type="text"
                      placeholder="&nbsp;&nbsp;"
                      value={fullname}
                      onChange={onChangeName}
                    />
                    <span className="loginpage__signup__label">Name</span>
                  </label>

                  <label htmlFor="" className="loginpage__signup__inp">
                    <input
                      className="loginpage__signup__form__animation"
                      type="text"
                      placeholder="&nbsp;&nbsp;"
                      //value={phone}
                      onChange={onChangePhone}
                      //onMouseEnter=
                    />
                    <span className="loginpage__signup__label">Phone</span>
                  </label>

                  <div style={{ display: '' }}>
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
                    <p className="loginpage__signup__date" style={{ cursor: 'pointer' }}>
                      Date of birth
                    </p>
                    <p className="loginpage__signup__desc">
                      This will not be shown publicly. Confirm your own age, even if this
                      account is for a business, a pet, or something else.
                    </p>
                  </div>

                  <div className="loginpage__signup__inputs2">
                    <select
                      className="loginpage__signup__month"
                      list="Month"
                      placeholder="Month"
                      value={month}
                      onChange={onChangeMonth}
                    >
                      {monthsDate}
                    </select>
                    <select
                      className="loginpage__signup__day"
                      list="Days"
                      placeholder="Day"
                      value={day}
                      onChange={onChangeDay}
                    >
                      {getDay()}
                    </select>
                    <select
                      className="loginpage__signup__years"
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

              <div className="loginpage__signup__footer">
                <button
                  className="loginpage__signup__button"
                  type="submit"
                  onClick={() => setStepNum(1)}
                  style={{
                    textDecoration: 'none',
                    backgroundColor: isTrue ? 'rgb(44, 43, 43)' : '',
                    cursor: isTrue ? 'pointer' : '',
                    pointerEvents: isTrue ? '' : 'none',
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
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
