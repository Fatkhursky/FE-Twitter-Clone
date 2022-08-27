// @ts-nocheck
import { mySvg } from '~/public/assets/svg'
import { useEffect, useState } from 'react'
import AllTweet from '@/src/components/home/all-tweet'
import Popup from 'reactjs-popup'
import { decodeToken } from 'react-jwt'
import { useAtom } from 'jotai'
import { currentMenu } from '@/src/stores/jotai-atom'
import { useRouter } from 'next/router'
import {
  fieldUserName,
  DateOfRegister,
  globalCreateAccDate,
  globalName,
} from '@/src/stores/jotai-atom'
import { gql, useQuery } from '@apollo/client'
import { client } from '@/src/utilities/apollo'
import { GET_TWEETS } from '@/src/requests/graphql'

const Profile = ({ setOnComp, setArray, array }) => {
  //const [date] = useAtom(textAtom)
  const [onSection, setOnSection] = useState('')
  const isTweet = onSection === 'tweet' || onSection === '' ? 'bold' : null
  const isTweetAndReply = onSection === 'tweetandreply' ? 'bold' : null
  const isMedia = onSection === 'media' ? 'bold' : null
  const isLike = onSection === 'like' ? 'bold' : null
  const [name] = useAtom(globalName)
  const [dateCreateAcc] = useAtom(globalCreateAccDate)
  const [userName, setUserName] = useAtom(fieldUserName)
  const [dateRegister, setDateRegister] = useAtom(DateOfRegister)
  const [activeMenu, setActiveMenu] = useAtom(currentMenu)

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

// <div className="pt-5 border-b cursor-pointer">
// <div className="px-2">
//   <div className="">
//     <div className="flex flex-row">
//       <img
//         style={{ height: '45px', marginLeft: '0px' }}
//         src={'/assets/logo193.png'}
//         alt="joebiden"
//       />
//       <div className="w-full flex flex-col px-2">
//         <div className=" flex justify-between items-center">
//           <p style={{ fontWeight: 'bold' }}>
//             name
//             <span style={{ fontWeight: 'normal' }}>&nbsp;username&nbsp;</span>
//           </p>

//           <Popup
//             trigger={
//               <div className=" p-1 rounded-full cursor-pointer hover:bg-slate-300">
//                 <svg className=" h-6 w-6">{mySvg.more}</svg>
//               </div>
//             }
//             position="left top"
//           >
//             <div>
//               <div
//                 className="flex gap-2 flex-row items-center p-2 hover:bg-slate-100 cursor-pointer rounded-t-xl"
//                 // onClick={handleDelete}
//               >
//                 <svg className="w-4 h-4">{mySvg.delete}</svg>
//                 <p>Delete</p>
//               </div>
//               <div
//                 className="flex gap-2 flex-row items-center p-2 hover:bg-slate-100 cursor-pointer "
//                 // onClick={noFeature}
//                 style={{ display: 'flex' }}
//               >
//                 <svg className="w-4 h-4">{mySvg.pin}</svg>
//                 <p>Pin to your profile</p>
//               </div>
//               <div
//                 className="flex gap-2 flex-row items-center p-2 hover:bg-slate-100 cursor-pointer "
//                 // onClick={noFeature}
//                 style={{ display: 'flex' }}
//               >
//                 <svg className="w-4 h-4">{mySvg.doc}</svg>
//                 <p>Add/remove</p>
//               </div>
//               <div
//                 className="flex gap-2 flex-row items-center p-2 hover:bg-slate-100 cursor-pointer "
//                 // onClick={noFeature}
//                 style={{ display: 'flex' }}
//               >
//                 <svg className="w-4 h-4">{mySvg.comment}</svg>
//                 <p>Change who can reply</p>
//               </div>
//               <div
//                 className="flex gap-2 flex-row items-center p-2 hover:bg-slate-100 cursor-pointer "
//                 // onClick={noFeature}
//                 style={{ display: 'flex' }}
//               >
//                 <svg className="w-4 h-4">{mySvg.embed}</svg>
//                 <p>Embed Tweet</p>
//               </div>
//               <div
//                 className="flex gap-2 flex-row items-center p-2 hover:bg-slate-100 cursor-pointer rounded-b-xl"
//                 // onClick={noFeature}
//                 style={{ display: 'flex' }}
//               >
//                 <svg className="w-4 h-4">{mySvg.polling}</svg>
//                 <p>View Tweets analythics</p>
//               </div>
//             </div>
//           </Popup>
//         </div>
//         {/* <div>{newTweet}</div> */} content
//       </div>
//     </div>

//     <div className="flex flex-row py-1 justify-between w-3/4 mx-auto">
//       <div className="p-1 hover:bg-blue-200 hover:fill-blue-600 cursor-pointer flex items-center rounded-full">
//         <svg className="h-4 w-4 ">{mySvg.comment}</svg>
//       </div>
//       <div className="p-1 hover:bg-blue-200 hover:fill-blue-600 cursor-pointer flex items-center rounded-full">
//         <svg className="h-4 w-4 ">{mySvg.retweet}</svg>
//       </div>
//       <div className="p-1 hover:bg-pink-200 hover:fill-pink-600 cursor-pointer flex items-center rounded-full">
//         <svg className="h-4 w-4 ">{mySvg.like}</svg>
//       </div>
//       <div className="p-1 hover:bg-blue-200 hover:fill-blue-600 cursor-pointer flex items-center rounded-full">
//         <svg className="h-4 w-4 ">{mySvg.comment}</svg>
//       </div>
//       <div className="p-1 hover:bg-blue-200 hover:fill-blue-600 cursor-pointer flex items-center rounded-full">
//         <svg className="h-4 w-4 ">{mySvg.up}</svg>
//       </div>
//       <div className="p-1 hover:bg-blue-200 hover:fill-blue-600 cursor-pointer flex items-center rounded-full">
//         <svg className="h-4 w-4 ">{mySvg.polling}</svg>
//       </div>
//     </div>
//   </div>
// </div>
// </div>
