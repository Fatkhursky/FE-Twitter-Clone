//@ts-nocheck
import React, { useEffect, useState } from 'react'
import { mySvg } from '~/public/assets/svg'
import { IoLogoTwitter } from 'react-icons/io'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import { currentMenu, fieldUserName, globalName } from '../stores/jotai-atom'
import Popup from 'reactjs-popup'
import { signOut, useSession } from 'next-auth/react'
import useBreakpoint from '../shared-hooks/use-breakpoint'

const listMenuIcon = [
  {
    label: 'Home',
    icon: [mySvg.home[0], mySvg.home[1]],
  },
  {
    label: 'Explore',
    icon: [mySvg.explore[0], mySvg.explore[1]],
  },
  {
    label: 'Notifications',
    icon: [mySvg.notification[0], mySvg.notification[1]],
  },
  {
    label: 'Messages',
    icon: [mySvg.messages[0], mySvg.messages[1]],
  },
  {
    label: 'Bookmarks',
    icon: [mySvg.bookmarks[0], mySvg.bookmarks[1]],
  },
  {
    label: 'Lists',
    icon: [mySvg.lists[0], mySvg.lists[1]],
  },
  {
    label: 'Profile',
    icon: [mySvg.profile[1], mySvg.profile[0]],
  },
  {
    label: 'More',
    icon: [mySvg.moremenu, mySvg.moremenu],
  },
]

const listMenuIconBot = [
  {
    label: 'Home',
    icon: [mySvg.home[0], mySvg.home[1]],
  },
  {
    label: 'Search',
    icon: [mySvg.search[0], mySvg.search[1]],
  },
  {
    label: 'Notifications',
    icon: [mySvg.notification[0], mySvg.notification[1]],
  },
  {
    label: 'Messages',
    icon: [mySvg.messages[0], mySvg.messages[1]],
  },
]

const Mainmenu = () => {
  const { data: session } = useSession()
  const breakPoints = useBreakpoint()

  const [name, setName] = useAtom(globalName)
  const [currentRouter, setCurrentRouter] = useState('')
  const router = useRouter()
  const [userName, setUserName] = useAtom(fieldUserName)

  useEffect(() => {
    // console.log(session, 789)
    setUserName(session?.username)
    setName(session?.user?.name)
    setCurrentRouter(router.pathname)
  }, [])

  const handleChangeMenu = (menu: any) => {
    const currentMenu = menu
    router.push(`/${currentMenu}`)
  }
  function noFeature() {
    alert('Fitur belum tersedia')
  }
  const logOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: `/api/auth/signin` })
    localStorage.removeItem('Bearer')
    router.push(data.url)
  }

 if (breakPoints === 'xs') {
  return (
    <div className='bg-white flex gap-2 justify-between px-6 flex-row bottom-0 fixed w-full'>
      {listMenuIconBot.map((menu, i) => (
        <div key={i} className='w-6 py-2 cursor-default'>{menu.label == currentRouter.substring(1) ? menu.icon[1] : menu.icon[0]}</div>
      ))}
    </div>
    // {listMenuIconBot.map((e, i) => (
    //   <div>tes</div>
    // ))}
  )
 } else {
  return (
    <div className="flex flex-col h-screen w-fit items-center top-0 sticky">
      <div className="h-fit">
        <div className="hover:bg-[#e0f2fe] transition-all rounded-full w-12 h-12 items-center justify-center flex cursor-pointer top-12 left-12">
          <IoLogoTwitter className="text-[#1d9bf0] text-3xl" />
        </div>

        {listMenuIcon.map((menu, i) => (
          <div key={i} className="pt-1.5 items-center flex hover:cursor-pointer">
            <div className=" w-full mainMenu">
              <div
                onClick={() => handleChangeMenu(menu.label)}
                className="text-1xs flex items-center w-fit p-2  cursor-pointer rounded-full  transtiton-all"
              >
                <svg className="w-7 h-7">
                  {menu.label == currentRouter.substring(1) ? menu.icon[1] : menu.icon[0]}
                </svg>
                {breakPoints === 'lg' || breakPoints === 'xl' || breakPoints === '2xl' ? (
                  <h1
                    className={clsx(
                      'pl-2',
                      menu.label == currentRouter.substring(1) ? 'font-bold' : null
                    )}
                  >
                    {menu.label}
                  </h1>
                ) : null}
              </div>
            </div>
          </div>
        ))}

        <div className="items-center flex">
          {breakPoints === 'lg' || breakPoints === 'xl' || breakPoints === '2xl' ? (
            <div className="text-1xs w-56 bg-[#1D9BF0] hover:bg-[#197FC5] p-3 cursor-pointer rounded-full transtiton-all flex justify-center">
              <button className="text-white">Tweet</button>
            </div>
          ) : (
            <div className="bg-sky-500 rounded-full p-3">
              <div className="w-6  fill-white">{mySvg.fur}</div>
            </div>
          )}
        </div>
      </div>

      <div className="grow"></div>
      <Popup
        trigger={
          <div className="flex hover:bg-[#e5e7eb] cursor-pointer p-2 rounded-full justify-center items-center w-fit">
            <img className="h-8 w-8" src={'/assets/logo193.png'} alt="" />
            {breakPoints === 'lg' || breakPoints === 'xl' || breakPoints === '2xl' ? <div className="grow pl-2">
              <p>{session?.user?.name}</p>
              <p>{session?.username}</p>
            </div> : null}
            {breakPoints === 'lg' || breakPoints === 'xl' || breakPoints === '2xl' ?       
            <div>
              <svg className="h-7 w-7">{mySvg.more}</svg>
            </div> : null}
            
      
          </div>
        }
        {...{}}
        position="top left"
      >
        <div className="flex flex-col">
          <div className="flex items-center p-2">
            <img
              id="imgjoe"
              style={{ height: '50px' }}
              src={'/assets/logo193.png'}
              alt="joebiden"
            />
            <p id="namejoe" style={{ fontSize: '15px' }}>
              &nbsp;{name}
            </p>
          </div>
          <div className="cursor-pointer hover:bg-[#f1f5f9] p-2" onClick={noFeature}>
            <p>Add an existing account</p>
          </div>
          <div
            className="cursor-pointer hover:bg-[#f1f5f9] p-2 rounded-b-xl"
            onClick={logOut}
          >
            <p>Log Out &nbsp;{userName}</p>
          </div>
        </div>
      </Popup>
    </div>
  )
 }

}

export default Mainmenu
