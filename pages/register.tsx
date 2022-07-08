// @ts-nocheck
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAtom } from 'jotai'
import { stepAtom } from '@/src/stores/jotai-atom'
import toast, { Toaster } from 'react-hot-toast'
import Header from '@/src/components/login-page/header'
import Head from 'next/head'
import { register } from '@/src/requests'


const LoginPage = () => {
  const [fullname, setfullName] = useState('')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [years, setYears] = useState('')
  const dateOfBirth = years.concat('-', month, '-', day)

  function getUserName(name) {
    return name = '@' + name + Math.random().toString(36).slice(2, 5);
    
  }
  

  let username = getUserName(fullname)
  console.log(username)
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const isTrue = fullname && phone && month && day && years ? true : false
  const [stepNum, setStepNum] = useAtom(stepAtom)
 
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
    //console.log(newReg)
    try {
      const [error, res] = await register(newReg)
      console.log(99, password)
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
  const onChangePhone = (e) => setPhone(e.target.value)
  const onChangeMonth = (e) => setMonth(e.target.value)
  const onChangeDay = (e) => setDay(e.target.value)
  const onChangeYears = (e) => setYears(e.target.value)
  const onChangePassword = (e) => setPassword(e.target.value)

  const [check, setCheck] = useState(false)
  const checkbox = () => setCheck(!check)
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
                      <input type="checkbox" onChange={checkbox} />
                    </div>
                    <p>
                      By signing up, you agree to our Terms, Privacy Policy, and Cookie
                      Use. Twitter may use your contact information, including your email
                      address and phone number for purposes outlined in our Privacy
                      Policy. Learn more
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
                    backgroundColor: check ? 'rgb(44, 43, 43)' : '',
                    cursor: check ? 'pointer' : '',
                    pointerEvents: check ? '' : 'none',
                  }}
                >
                  Next
                </button>
                <Toaster />
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
                    <h1 className="loginpage__signup__title">Create oyur account</h1>
                  </div>

                  <label htmlFor="" className="loginpage__signup__inp">
                    <input
                      className="loginpage__signup__form__animation"
                      type="text"
                      placeholder="&nbsp;&nbsp;"
                      value={fullname}
                      //onChange={onChangeName}
                    />
                    <span className="loginpage__signup__label">Name</span>
                  </label>

                  <label htmlFor="" className="loginpage__signup__inp">
                    <input
                      className="loginpage__signup__form__animation"
                      type="text"
                      placeholder="&nbsp;&nbsp;"
                      value={phone}
                      //onChange={onChangeName}
                    />
                    <span className="loginpage__signup__label">Phone</span>
                  </label>

                  <label htmlFor="" className="loginpage__signup__inp">
                    <input
                      className="loginpage__signup__form__animation"
                      type="text"
                      placeholder="&nbsp;&nbsp;"
                      value={dateOfBirth}
                      //onChange={onChangeName}
                    />
                    <span className="loginpage__signup__label">Birth date</span>
                  </label>
                 
                </div>
              </div>

              <div className="loginpage__signup__footer__step3">
                <p style={{ textAlign: 'left', padding: '5px 45px', fontSize: '11px' }}>
                  By signing up, you agree to the Terms of Service and Privacy Policy,
                  including Cookie Use. Twitter may use your contact information,
                  including your email address and phone number for purposes outlined in
                  our Privacy Policy, like keeping your account secure and personalizing
                  our services, including ads. Learn more. Others will be able to find you
                  by email or phone number, when provided, unless you choose otherwise
                  here.
                </p>
                <button
                  className="loginpage__signup2__button"
                  type="submit"
                  onClick={handleSubmit}
                  //onClick={() => setStepNum(1)}
                  // style={{
                  //   textDecoration: 'none',
                  //   backgroundColor: isTrue ? 'rgb(44, 43, 43)' : '',
                  //   cursor: isTrue ? 'pointer' : '',
                  //   pointerEvents: isTrue ? '' : 'none',
                  // }}
                >
                  Sign up
                </button>
                <Toaster />
              </div>
            </div>
          </div>
        </div>
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

                  {/* <div className="loginpage__signup__inputs1">
                    <input
                      className="loginpage__signup__name"
                      type="text"
                      placeholder="Name"
                      value={fullname}
                      onChange={onChangeName}
                    />
                  </div> */}
                  <label htmlFor="" className="loginpage__signup__inp">
                    <input
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
                      value={phone}
                      onChange={onChangePhone}
                    />
                    <span className="loginpage__signup__label">Phone</span>
                  </label>

                  {/* <div className="loginpage__signup__inputs1">
                    <input
                      className="loginpage__signup__phone"
                      type="text"
                      placeholder="Phone"
                      value={phone}
                      onChange={onChangePhone}
                    />
                  </div> */}
                  <div className="loginpage__signup__content">
                    <p
                      onClick={noFeature}
                      id="email"
                      style={{ cursor: 'pointer', color: 'rgb(30, 167, 247)' }}
                    >
                      Use email instead
                    </p>
                    <div>
                      <p
                        className="loginpage__signup__date"
                        style={{ cursor: 'pointer' }}
                      >
                        Date of birth
                      </p>
                      <p className="loginpage__signup__desc">
                        This will not be shown publicly. Confirm your own age, even if
                        this account is for a business, a pet, or something else.
                      </p>
                    </div>
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
                <Toaster />
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
