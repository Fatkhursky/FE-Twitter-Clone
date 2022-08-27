//@ts-nocheck
import React, { useEffect, useState } from 'react'
import { mySvg } from '~/public/assets/svg'
import { IoLogoTwitter } from 'react-icons/io'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAtom } from 'jotai'
import {
  currentMenu,
  fieldUserName,
  globalName,
  globalCreateAccDate,
} from '../stores/jotai-atom'
import Popup from 'reactjs-popup'
import { signOut } from 'next-auth/react'
import { decodeToken } from 'react-jwt'
import { DATAUSER_QUERY } from '../requests/graphql'
import { useQuery } from '@apollo/client'
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

const Mainmenu = () => {
  const [name, setName] = useAtom(globalName)
  //const contentStyle = { position: 'fixed' }
  const [activeMenu, setActiveMenu] = useAtom(currentMenu)
  const [currentRouter, setCurrentRouter] = useState('')
  const router = useRouter()
  const [token, setToken] = useState()
  const [userName, setUserName] = useAtom(fieldUserName)

  useEffect(() => {
    const item = localStorage.getItem('Bearer')
    setToken(decodeToken(item))
    setCurrentRouter(router.pathname)
  }, [])

  const { loading, error, data } = useQuery(DATAUSER_QUERY, {
    variables: {
      where: {
        id: token?.data?.id,
      },
    },
    onCompleted(data) {
      setUserName(data?.user?.username)
      setName(data?.user?.name)
    },
  })

  // if (loading) return 'Loading...'
  // if (error) return `Error! ${error.message}`

  const handleChangeMenu = (menu: any) => {
    const currentMenu = menu
    setActiveMenu(menu)
    router.push(`/${currentMenu}`)
  }
  function noFeature() {
    alert('Fitur belum tersedia')
  }
  const logOut = async () => {
    //setStepLogin(0)
    const data = await signOut({ redirect: false, callbackUrl: `/api/auth/signin` })
    localStorage.removeItem('Bearer')
    //console.log(5, data)
    router.push(data.url)
  }

  return (
    <div className="flex flex-col h-screen w-64 top-0 sticky">
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
                <h1
                  className={clsx(
                    'pl-2',
                    menu.label == currentRouter.substring(1) ? 'font-bold' : null
                  )}
                >
                  {menu.label}
                </h1>
              </div>
            </div>
          </div>
        ))}

        <div className="items-center flex">
          <div className="text-1xs w-56 bg-[#1D9BF0] hover:bg-[#197FC5] p-3 cursor-pointer rounded-full transtiton-all flex justify-center">
            <button className="text-white">Tweet</button>
          </div>
        </div>
      </div>

      <div className="grow"></div>
      <Popup
        trigger={
          <div className="flex hover:bg-[#e5e7eb] cursor-pointer p-2 rounded-full justify-center items-center w-56">
            <img className="h-12 w-12" src={'/assets/logo193.png'} alt="" />
            <div className="grow pl-2">
              <p>{data?.user?.name}</p>
              <p>{data?.user?.username}</p>
            </div>
            <div>
              <svg className="h-7 w-7">{mySvg.more}</svg>
            </div>
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

export default Mainmenu

{
  /* <Popup
                style={{ backgroundColor: 'red' }}
                trigger={
                  <div className="flex hover:bg-[#e5e7eb] cursor-pointer p-2 rounded-full justify-center items-center w-56">
                  <img className="h-12 w-12" src={'/assets/logo193.png'} alt="" />
                  <div className="grow pl-2">
                    <p>name</p>
                    <p>@name</p>
                  </div>
                  <div>
                    <svg className="h-7 w-7">{mySvg.more}</svg>
                  </div>
                </div>
                }
                {...{ contentStyle }}
                position="top left"
              >
                <div>
                  <div style={{ display: 'flex' }}>
                    <img
                      id="imgjoe"
                      style={{ height: '50px' }}
                      src={'/assets/logo193.png'}
                      alt="joebiden"
                    />
                    <p id="namejoe" style={{ fontSize: '15px' }}>
                      &nbsp;{userName}
                    </p>
                  </div>
                  <div className="homepage__popupcontent" onClick={noFeature}>
                    <p>Add an existing account</p>
                  </div>
                  <div className="homepage__popupcontent" onClick={logOut}>
                    <p>Log Out &nbsp;{userName}</p>
                  </div>
                </div>
              </Popup> */
}
