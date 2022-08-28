// @ts-nocheck
import { mySvg } from '~/public/assets/svg'
import { useState } from 'react'
import AllTweet from '@/src/components/home/all-tweet'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { fieldUserName, DateOfRegister, globalName } from '@/src/stores/jotai-atom'

const Profile = () => {
  const [onSection, setOnSection] = useState('')
  const isTweet = onSection === 'tweet' || onSection === '' ? 'bold' : null
  const isTweetAndReply = onSection === 'tweetandreply' ? 'bold' : null
  const isMedia = onSection === 'media' ? 'bold' : null
  const isLike = onSection === 'like' ? 'bold' : null
  const [name] = useAtom(globalName)
  const [userName, setUserName] = useAtom(fieldUserName)
  const [dateRegister, setDateRegister] = useAtom(DateOfRegister)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const router = useRouter()

  return (
    <div className="h-fit">
      <div className="bg-white z-10 flex items-center p-2 gap-5 sticky top-0">
        <svg
          className=" h-7 w-7 cursor-pointer"
          onClick={() => {
            router.push('/Home')
            scrollToTop()
          }}
        >
          {mySvg.arrow}
        </svg>
        <div>
          <strong>{userName}</strong>
          <p>0 Tweets</p>
        </div>
        {/* <button onClick={allTweet}>SHOW DATA</button> */}
      </div>
      <div className="relative">
        <img id="backdrop" src={'/assets/beranda.jpg'} alt="beranda" />
        <img
          className="h-36 w-36  rounded-full p-1 bg-white absolute top-2/3 left-3"
          src={'/assets/logo193.png'}
          alt="userImage"
        />
      </div>

      <div className="h-20 mt-2">
        <div className="hover:cursor-pointer flex justify-center items-center  border-2 border-inherit rounded-full hover:bg-[#e2e8f0] p-1 float-right">
          <button className="px-2">Set up profile</button>
        </div>
      </div>

      <div>
        <div className="px-2.5">
          <div>
            <strong>{name}</strong>
            <p>{userName}</p>
          </div>
          <div className="flex items-center">
            <svg className="w-6 h-6">{mySvg.date}</svg>
            <p>Join {dateRegister} </p>
          </div>

          <p>475 Following&nbsp;&nbsp;&nbsp;105 Follower</p>
        </div>
        <div className="flex justify-between py-3">
          <div onClick={() => setOnSection('tweet')} className="w-1/4 cursor-pointer">
            <p
              style={{ fontWeight: isTweet }}
              className="items-center justify-center flex"
            >
              Tweet
            </p>
          </div>
          <div
            onClick={() => setOnSection('tweetandreply')}
            className="w-1/4 cursor-pointer"
          >
            <p
              style={{ fontWeight: isTweetAndReply }}
              className="items-center justify-center flex"
            >
              Tweet & reply
            </p>
          </div>
          <div onClick={() => setOnSection('media')} className=" w-1/4 cursor-pointer">
            <p
              style={{ fontWeight: isMedia }}
              className="items-center justify-center flex"
            >
              Media
            </p>
          </div>
          <div onClick={() => setOnSection('like')} className="w-1/4 cursor-pointer">
            <p
              style={{ fontWeight: isLike }}
              className="items-center justify-center flex"
            >
              Like
            </p>
          </div>
        </div>
        <div className="profile__line"></div>
      </div>
      <AllTweet />
    </div>
  )
}
export default Profile
