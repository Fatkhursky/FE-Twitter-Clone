// @ts-nocheck
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAtom } from 'jotai'
import { textAtom } from '@/src/stores/jotai-atom'
import api from '@/src/utilities/axios'
import toast, { Toaster } from 'react-hot-toast'
import Header from '@/src/components/login-page/header'
import Head from 'next/head'
import login from '@/src/requests/login'
import register from '@/src/requests/register'

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

  const [date, setDAte] = useAtom(textAtom)
  let dateObj = new Date()
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  let regisMonth = months[dateObj.getMonth()]
  let regisYear = dateObj.getFullYear()
  let regisDate = dateObj.getDate()
  const regisTime = regisDate + ' ' + regisMonth + ' ' + regisYear

  const isApril = month === 'April'
  const isJune = month === 'June'
  const isSeptember = month === 'September'
  const isNovember = month === 'November'
  const isFebruary = month === 'February'
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
    const newReg = { name, username, password, email, phone }
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
          setDAte(regisTime)
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

  const onChangeName = (e) => setName(e.target.value)
  const onChangePhone = (e) => setPhone(e.target.value)
  const onChangeMonth = (e) => setMonth(e.target.value)
  const onChangeDay = (e) => setDay(e.target.value)
  const onChangeYears = (e) => setYears(e.target.value)
  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="wrap" style={{ backgroundColor: '' }}>
        <div className="loginpage">
          <form className="loginpage__signup__wrap" onSubmit={handleSubmit}>
            <Header />
            <div
              style={{ backgroundColor: '' }}
              className="loginpage__signup__main"
            >
              <div className="loginpage__signup__form">
                <div className="loginpage__signup__title1">
                  <h1 className="loginpage__signup__title">
                    Create your account
                  </h1>
                </div>

                <div className="loginpage__signup__inputs1">
                  <input
                    className="loginpage__signup__name"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={onChangeName}
                  />
                </div>
                <div className="loginpage__signup__inputs1">
                  <input
                    className="loginpage__signup__phone"
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={onChangePhone}
                  />
                </div>
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
                      This will not be shown publicly. Confirm your own age,
                      even if this account is for a business, a pet, or
                      something else.
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
                style={{
                  textDecoration: 'none',
                  backgroundColor: isTrue ? 'rgb(44, 43, 43)' : '',
                  cursor: isTrue ? 'pointer' : '',
                  pointerEvents: isTrue ? '' : 'none',
                }}
              >
                Signup
              </button>
              <Toaster />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default LoginPage

const monthsDate = [
  <option key={1} value="" hidden>
    Month
  </option>,
  <option key={2} value="January">
    January
  </option>,
  <option key={3} value="February">
    February
  </option>,
  <option key={4} value="March">
    March
  </option>,
  <option key={5} value="April">
    April
  </option>,
  <option key={6} value="May">
    May
  </option>,
  <option key={7} value="June">
    June
  </option>,
  <option key={8} value="July">
    July
  </option>,
  <option key={9} value="August">
    August
  </option>,
  <option key={10} value="September">
    September
  </option>,
  <option key={11} value="October">
    October
  </option>,
  <option key={12} value="November">
    November
  </option>,
  <option key={13} value="December">
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