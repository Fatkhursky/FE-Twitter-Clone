import { mySvg } from '~/public/assets/svg'
import AddTweet from '@/src/components/add-tweet/add-tweet'
import TextareaAutosize from 'react-textarea-autosize'
import useBreakpoint from '@/src/shared-hooks/use-breakpoint'
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
const listMenuIcon = [
  {
    label: 'Profile',
    icon: [mySvg.profile[1], mySvg.profile[0]],
  },
  {
    label: 'Lists',
    icon: [mySvg.lists[0], mySvg.lists[1]],
  },
  {
    label: 'Topics',
    icon: [mySvg.topics],
  },
  {
    label: 'Bookmarks',
    icon: [mySvg.bookmarks[0], mySvg.bookmarks[1]],
  },
  {
    label: 'Moments',
    icon: [mySvg.moments],
  },
  {
    label: 'Twitter Circle',
    icon: [mySvg.profileLove],
  },
  {
    label: 'Newsletters',
    icon: [mySvg.newsLetters],
  },
  {
    label: 'Twitter for Professionals',
    icon: [mySvg.rocket],
  },
  {
    label: 'Twitter Ads',
    icon: [mySvg.ads],
  },
  {
    label: 'Analitycs',
    icon: [mySvg.polling],
  },
  {
    label: 'Settings and privacy',
    icon: [mySvg.setting],
  },
  {
    label: 'Help Center',
    icon: [mySvg.help],
  },
  {
    label: 'Data saver',
    icon: [mySvg.dataSaver],
  },
  {
    label: 'Display',
    icon: [mySvg.display],
  },
  {
    label: 'Keyboard shorcuts',
    icon: [mySvg.shorcut],
  },
]
const Home = ({
  handleSubmit,
  tweet,
  setTweet,
  array,
  filterGetTweets,
  refetch,
}: any) => {
  const router = useRouter()
  const logOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: `/api/auth/signin` })
    // localStorage.removeItem('Bearer')
    router.push(data.url)
  }

  const breakPoints = useBreakpoint()
  const [showMenu, setShowMenu] = useState(false)
  return (
    <div className="h-full ">
      {breakPoints === 'xs' ? (
        <div
          className={
            'w-1/2 fixed bg-white p-2 z-30 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform' +
            (showMenu ? ' -translate-x-0 ' : ' -translate-x-full ')
          }
        >
          <div className="flex justify-between pb-5">
            <strong>Account info</strong>
            <div className="w-4 h-4" onClick={() => setShowMenu(false)}>
              {mySvg.close}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <img className="w-10 h-10" src={'/assets/logo193.png'} alt="user" />
            <div className="h-4 w-4 border border-slate-300 rounded-full">
              {mySvg.plus}
            </div>
          </div>
          <strong>Name</strong>
          <p>@username</p>
          <div className="flex gap-3 pt-2">
            <p>
              <strong>0</strong> Following
            </p>
            <p>
              <strong>0</strong> Follower
            </p>
          </div>
          {listMenuIcon.map((e, i) => (
            <div key={i} className="">
              <div className="py-2 flex flex-col ">
                <div className="flex gap-2 items-center">
                  <div className="w-4 h-4">{e.icon[0]}</div>
                  {e.label}
                </div>
              </div>
            </div>
          ))}
          <button className='cursor-default' onClick={logOut}>Log out</button>
        </div>
      ) : null}
      <div className="header flex items-center justify-between px-2 py-2 sticky top-0 relative">
        <div className="flex justify-center items-center gap-2">
          {breakPoints === 'xs' ? (
            <img
              onClick={() => setShowMenu(true)}
              className="w-10 h-10"
              src={'/assets/logo193.png'}
              alt="user"
            />
          ) : null}
          <strong>Home</strong>
        </div>

        <div className="rounded-full hover:bg-[#f3f4f6] cursor-pointer p-2">
          <svg className="w-6 h-6">{mySvg.stars}</svg>
        </div>
      </div>

      <div id="main" className="homepage__section">
        <form onSubmit={handleSubmit}>
          {breakPoints !== 'xs' ? (
            <div className=" p-2 border-b">
              <div className="flex flex-row items-center gap-2">
                <img className="w-14 h-12" src={'/assets/logo193.png'} alt="user" />
                <TextareaAutosize
                  maxLength={280}
                  value={tweet}
                  onChange={(e) => setTweet(e.target.value)}
                  className="w-full border-none outline-none resize-none"
                  placeholder="What's Happening?"
                  id="textarea"
                />
              </div>

              <div className="w-full py-2">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <div className="hover:bg-[#DBEAFE] cursor-pointer flex items-center justify-center rounded-full p-1.5">
                      <svg className="w-7 h-7">{mySvg.img}</svg>
                    </div>
                    <div className="hover:bg-[#DBEAFE] cursor-pointer flex items-center justify-center rounded-full p-1.5">
                      <svg className="w-7 h-7">{mySvg.gif}</svg>
                    </div>
                    <div className="hover:bg-[#DBEAFE] cursor-pointer flex items-center justify-center rounded-full p-1.5">
                      <svg className="w-7 h-7">{mySvg.poll}</svg>
                    </div>
                    <div className="hover:bg-[#DBEAFE] cursor-pointer flex items-center justify-center rounded-full p-1.5">
                      <svg className="w-7 h-7">{mySvg.emot}</svg>
                    </div>
                    <div className="hover:bg-[#DBEAFE] cursor-pointer flex items-center justify-center rounded-full p-1.5">
                      <svg className="w-7 h-7">{mySvg.time}</svg>
                    </div>
                    <div className="hover:bg-[#DBEAFE] cursor-pointer flex items-center justify-center rounded-full p-1.5">
                      <svg className="w-7 h-7">{mySvg.location}</svg>
                    </div>
                  </div>
                  <div className="rounded-full px-1 flex items-center justify-center bg-[#1D9BF0] hover:bg-[#197FC5] cursor-pointer">
                    <button className="text-white px-5" type="submit">
                      Tweet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div>
            {array.length > 0 ? (
              array.map((e: any, i: number) => (
                <AddTweet
                  key={i}
                  newTweet={e.content}
                  id={e.id}
                  name={e.user.name}
                  userName={e.user.username}
                  filterGetTweets={filterGetTweets}
                  refetch={refetch}
                />
              ))
            ) : (
              <div className="px-2">
                <strong className="text-xl">Welcome to Twitter!</strong>
                <p>
                  This is the best place to see what’s happening in your world. Find some
                  people and topics to follow now.
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
export default Home
