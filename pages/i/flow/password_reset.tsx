import { IoMdClose, IoLogoTwitter } from 'react-icons/io'

export default function PagePasswordReset() {
  return (
    <div className="w-[600px] h-[90vh] rounded-2xl bg-white relative">
      <div className="absolute top-2 left-2 w-9 h-9 hover:bg-[#0f14191a] active:bg-[#0f14192b] flex justify-center items-center rounded-full transition-all cursor-pointer">
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
