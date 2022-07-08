//@ts-nocheck
import { authentication } from '.././firebase-config/firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { useState } from 'react'

const Tes = () => {
  const countryCode = '+62'
  const [phoneNumber, setPhoneNumber] = useState(countryCode)
  const [OTP, setOTP] = useState('')
  const [expandForm, setExpandForm] = useState(false)

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
    if (phoneNumber.length >= 12) {
      setExpandForm(true)
      generateRecaptcha()
      let appVerifier = window.recaptchaVerifier
      signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult
        })
        .catch((error) => {
          // Error; SMS not sent
          // ...
          console.log(error)
        })
    }
  }

  const verifyOTP = (e) => {
    let otp = e.target.value
    setOTP(otp)
    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          const user = result.user
          console.log(user)
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          console.log(error)
        })
    }
  }

  return (
    <div>
      <form onSubmit={requestOTP}>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button placeholder="phone">submit</button>
      </form>
      <div id="recaptcha-container"></div>
      {expandForm ? (
        <div>
          <input type="text" inputMode="number" onChange={verifyOTP} value={OTP} />
          <button>Send OTP</button>
        </div>
      ) : null}
    </div>
  )
}

export default Tes
