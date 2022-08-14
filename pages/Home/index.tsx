// @ts-nocheck
//import { config } from 'dotenv';
import { mySvg } from '~/public/assets/svg'
import { useEffect, useState } from 'react'
import { decodeToken } from 'react-jwt'
import { useRouter } from 'next/router'
import Popup from 'reactjs-popup'
import Home from '@/src/components/home/home'
import Profile from '@/src/components/home/profile'
import { storeOneTweet, fetchAllTweets } from '@/src/requests'
import Head from 'next/head'
import Mainmenu from '@/src/components/mainmenu'
import Rightsection from '@/src/components/home/rightsection'

import {
  fieldPhone,
  fieldUserName,
  fieldEmail,
  fieldPhoneCode,
} from '@/src/stores/jotai-atom'
import { useAtom } from 'jotai'
import { stepLoginAtom, stepRegisterAtom, DateOfRegister } from '@/src/stores/jotai-atom'
import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { signOut } from 'next-auth/react'

const HomePage = (results) => {
  let router = useRouter()
  const [token, setToken] = useState('')
  const [myDecodeToken, setMyDecodetoken] = useState('')
  const [stepLogin, setStepLogin] = useAtom(stepLoginAtom)
  const [tweet, setTweet] = useState('')
  const [newTweet, setNewTweet] = useState('')
  const [onComp, setOnComp] = useState('')

  //get data Graphql
  const initialState = results
  const [data, setData] = useState(initialState.data)
  const [userName, setUserName] = useAtom(fieldUserName)
  const [dateRegister, setDateRegister] = useAtom(DateOfRegister)

  useEffect(() => {
    const item = localStorage.getItem('Bearer')
    setToken(item)
    const myDecodeToken = decodeToken(item)
    setMyDecodetoken(myDecodeToken)
    const user = data.filter((e) => e?.id === myDecodeToken?.id || undefined)
    //console.log('user:', user)
    setUserName(user?.[0]?.username)
    const convertDate = Number(user?.[0]?.createdAt)
    //console.log(39283, tes)
    const date = new Date(convertDate).toLocaleDateString('de-DE', {
      //weekday: 'long',
      // day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
    setDateRegister(date)
  }, [])

  useEffect(() => {
    if (onComp === 'profile') {
      getTweets()
    }
  }, [onComp])

  const logOut = async () => {
    setStepLogin(0)
    const data = await signOut({ redirect: false, callbackUrl: `/api/auth/signin` })
    localStorage.removeItem('Bearer')
    //console.log(5, data)
    router.push(data.url)
  }

  function noFeature() {
    alert('Fitur belum tersedia')
  }

  let headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  }
  //console.log("tokenx", token)

  const body = { content: tweet, image: 'default' }
  let [array, setArray] = useState([])

  const handleSubmit = async (e) => {
    console.log('token', token)
    e.preventDefault()
    try {
      const [, res] = await storeOneTweet(body, { Authorization: `Bearer ${token}` })
      //console.log('res:', res)
      const obj = { id: res.data.data.id, text: res.data.data.text }

      setTweet('')
      setNewTweet(res.data.data.text)
      setArray((array) => [obj, ...array])
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

  const [tweets, setTweets] = useState([])

  const getTweets = async () => {
    try {
      const [, res] = await fetchAllTweets({
        Authorization: token,
      })
      const myTweet = res?.data?.data || []
      //console.log(33334, myTweet)
      setTweets(myTweet.reverse())
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  //Pop Up style
  const contentStyle = { position: 'fixed' }
  //const overlayStyle = { }
  //const arrowStyle = {  }

  const isHome = onComp === 'home' ? 'bold' : null
  const isExplore = onComp === 'explore' ? 'bold' : null
  const isNotifications = onComp === 'notifications' ? 'bold' : null
  const isMessages = onComp === 'messages' ? 'bold' : null
  const isBookmarks = onComp === 'bookmarks' ? 'bold' : null
  const isLists = onComp === 'lists' ? 'bold' : null
  const isProfile = onComp === 'profile' ? 'bold' : null
  const isMore = onComp === 'more' ? 'bold' : null

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="w-screen flex flex-row gap-2 bg-white">
        <div className="flex top-0 sticky h-screen w-2/4 ">
          <div className="grow"></div>
          <Mainmenu />
        </div>

        <div className="flex flex-row  w-screen gap-3">
          <div className="w-3/5 border">
            <Home
              handleSubmit={handleSubmit}
              tweet={tweet}
              setTweet={setTweet}
              newTweet={newTweet}
              array={array}
              setArray={setArray}
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
export default HomePage

// fetching Graphql
export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://l210526-twitter-app-be.herokuapp.com/graphql',
    cache: new InMemoryCache(),
  })
  const { data } = await client.query({
    query: gql`
      query {
        users {
          id
          username
          createdAt
        }
      }
    `,
  })
  return {
    props: {
      data: data.users,
    },
  }
}

