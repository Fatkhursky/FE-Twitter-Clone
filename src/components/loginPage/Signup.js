import { monthsDate, daysDate, yearsDate } from './valueDate.js'
import api from '../../utilities/axios'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'

import Header from './Header'
import { useAtom } from 'jotai'
import { textAtom } from '../../stores/jotaiAtom.js'

const Signup = ({
  onChangeName,
  onChangePhone,
  onChangeMonth,
  onChangeDay,
  onChangeYears,
  color,
  pointer,
  event,
  month,
  year,
  day,
  name,
  username,
  password,
  email,
  phone,
}) => {
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
  const yearNotNull = year !== ''
  const isLeapYear = () =>
    yearNotNull && year % 100 === 0
      ? yearNotNull && year % 400 === 0
      : yearNotNull && year % 4 === 0
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
      const res = await api.post('/auth/register', newReg)
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

  return (
    <form className="loginpage__signup__wrap" onSubmit={handleSubmit}>
      <Header />
      <div style={{ backgroundColor: '' }} className="loginpage__signup__main">
        <div className="loginpage__signup__form">
          <div className="loginpage__signup__title1">
            <h1 className="loginpage__signup__title">Create your account</h1>
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
              <p className="loginpage__signup__date" style={{ cursor: 'pointer' }}>
                Date of birth
              </p>
              <p className="loginpage__signup__desc">
                This will not be shown publicly. Confirm your own age, even if this account is for a
                business, a pet, or something else.
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
              value={year}
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
            backgroundColor: color,
            cursor: pointer,
            pointerEvents: event,
          }}
        >
          Signup
        </button>
        <Toaster />
      </div>
    </form>
  )
}

export default Signup
