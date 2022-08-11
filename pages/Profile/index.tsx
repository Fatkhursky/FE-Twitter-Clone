//@ts-nocheck
import React from 'react'
import Head from 'next/head'
import Mainmenu from '@/src/components/mainmenu'
import Profile from '@/src/components/home/profile'
import { useState } from 'react'
import Rightsection from '@/src/components/home/rightsection'

const Index = () => {
  const [onComp, setOnComp] = useState('')
  const [tweets, setTweets] = useState('')
  const [array, setArray] = useState('')
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-screen flex flex-row gap-2 bg-white">
        <div className=" flex top-0 sticky h-screen w-2/4 ">
          <div className="grow"></div>
          <Mainmenu />
        </div>

        <div className=" flex flex-row  w-screen gap-3">
          <div className="w-3/5 border" >
            <Profile
              setOnComp={setOnComp}
              tweets={tweets}
              setArray={setArray}
              array={array}
            />
          </div>
          <div className="h-fit w-1/4 sticky -top-3/4">
            <Rightsection />
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
