import { IoMdClose, IoLogoTwitter } from 'react-icons/io'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function PagePasswordReset() {
  return (
    <div className="w-full h-full flex justify-center items-center bg-[#a1a1aa]">
      {/*<StepOne />*/}
      <StepTwo />
    </div>
  )
}

function StepTwo() {
  const router = useRouter()

  const handleClose = () => {
    router.push('/login')
  }

  return (
    <div className="w-[600px] h-[90vh] rounded-2xl bg-white relative">
      <div
        onClick={handleClose}
        className="absolute top-2 left-2 w-9 h-9 hover:bg-[#0f14191a] active:bg-[#0f14192b] flex justify-center items-center rounded-full transition-all cursor-pointer"
      >
        <IoMdClose className="text-xl" />
      </div>
      <div className="flex py-3 px-20 flex-col items-center h-full">
        <IoLogoTwitter className="text-[#1d9bf0] text-3xl mb-7" />
        <h1 className="text-3xl font-bold place-items-start self-start mb-1.5">
          How do you want to reset your password?
        </h1>
        <div className="mb-3 w-full">
          <p className="text-sm text-[#536471]">
            We found the following information associated with your account.
          </p>
        </div>
        <div className="w-full text-sm font-bold mb-3">
          <div className="flex justify-between w-full py-3">
            <label htmlFor="r1">
              Email a confirmation code to mu*****************@g****.***
            </label>
            <input type="radio" name="group1" id="r1" value="1" />
          </div>
          <div className="flex justify-between w-full py-3">
            <label htmlFor="r2">Text a confirmation code to my phone ending in 54</label>
            <input type="radio" name="group1" id="r2" value="2" />
          </div>
        </div>
        <div className="w-full text-sm">
          <Link href="#">
            <a className="text-[#1d9bf0] hover:underline">
              I don't have access to this information
            </a>
          </Link>
        </div>
        <div className="mt-auto w-full flex flex-col gap-1.5">
          <button className="w-full bg-[#0f1419] hover:opacity-90 active:opacity-80 transition-all p-3.5 rounded-full text-base font-bold text-white mb-3">
            Next
          </button>
          <button className="w-full text-[#0f1419] border border-[#0f1419]/20 hover:bg-[#0f1419]/10 active:bg-[#0f1419]/20 transition-all p-3.5 rounded-full text-base font-bold mb-3">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

function StepOne() {
  const router = useRouter()

  const handleClose = () => {
    router.push('/login')
  }

  return (
    <div className="w-[600px] h-[90vh] rounded-2xl bg-white  relative">
      <div
        onClick={handleClose}
        className="absolute top-2 left-2 w-9 h-9 hover:bg-[#0f14191a] active:bg-[#0f14192b] flex justify-center items-center rounded-full transition-all cursor-pointer"
      >
        <IoMdClose className="text-xl" />
      </div>
      <div className="flex py-3 px-20 flex-col items-center h-full">
        <IoLogoTwitter className="text-[#1d9bf0] text-3xl mb-7" />
        <h1 className="text-3xl font-bold place-items-start self-start mb-9">
          Find your Twitter account
        </h1>
        <div className="textfield-outlined">
          <input type="text" id="satu" placeholder=" " />
          <label htmlFor="satu">Enter your email, phone number, or username</label>
        </div>
        <button className="mt-auto w-full bg-[#0f1419] hover:opacity-90 active:opacity-80 transition-all p-3.5 rounded-full text-base font-bold text-white mb-3">
          Search
        </button>
      </div>
    </div>
  )
}
