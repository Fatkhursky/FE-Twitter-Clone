//@ts-nocheck
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
  globalName,
} from '@/src/stores/jotai-atom'
import { useAtom } from 'jotai'
import { stepLoginAtom, stepRegisterAtom, DateOfRegister } from '@/src/stores/jotai-atom'
import { ApolloClient, gql, InMemoryCache, useMutation, useQuery } from '@apollo/client'
import { signOut } from 'next-auth/react'
//import { httpLink } from '@/src/utilities/apollo'
// import authLink from '@/src/requests/get-user-gql'
import { authLink, client } from '@/src/utilities/apollo'
import { createOneTweet } from '@/src/requests/graphql'

const HomePage = (results) => {
  let router = useRouter()
  const [token, setToken] = useState('')
  const [myDecodeToken, setMyDecodetoken] = useState('')
  const [stepLogin, setStepLogin] = useAtom(stepLoginAtom)
  const [tweet, setTweet] = useState('')
  const [newTweet, setNewTweet] = useState('')
  const [onComp, setOnComp] = useState('')

  //get data Graphql
  // const initialState = results
  // const [data, setData] = useState(initialState.data)
  const [userName, setUserName] = useAtom(fieldUserName)
  const [name, setName] = useAtom(globalName)
  const [dateRegister, setDateRegister] = useAtom(DateOfRegister)

  useEffect(() => {
    const item = localStorage.getItem('Bearer')
    setToken(item)
    const myDecodeToken = decodeToken(item)
    setMyDecodetoken(myDecodeToken)
    async function fetchData() {
      const query = gql`
        query User($where: UserWhereUniqueInput!) {
          user(where: $where) {
            username
            created_at
            id
            name
          }
        }
      `
      const data = await client.query({
        query: query,
        variables: {
          where: {
            id: myDecodeToken?.data?.id,
          },
        },
      })
      setUserName(data.data.user.username)
      setName(data.data.user.name)
      setDateRegister(data.data.user.created_at.split('-').splice(0, 2).join(' '))
    }
    fetchData()
  }, [])

  // useEffect(() => {
  //   if (onComp === 'profile') {
  //     getTweets()
  //   }
  // }, [onComp])

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

  const body = { content: tweet, image: 'default' }
  let [array, setArray] = useState([])


  const [addTweet, {data, loading, error}] = useMutation(createOneTweet)

  const handleSubmit = async (e) => {
    
    e.preventDefault()
    console.log(3333, myDecodeToken)
    console.log(tweet, 'tweet')
    try {
      const data = await addTweet({
        variables: {
          data: {
            content: tweet,
            user: {
              connect: {
                id:myDecodeToken?.data?.id
              }
            }
          }
        }
       })
      console.log(data, 9999)
     const obj = { id: "31", text: data.data.createOneTweet.content}
     console.log(obj, 'objek') 
     //setTweet('')
      //setNewTweet(data.createOneTweet.content)
     // setArray((prev) => [obj, ...prev])
      if (error) throw error
    } catch (error) {
      console.log('error ges')
      console.log(error)
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
// export async function getStaticProps() {
//   const client = new ApolloClient({
//     uri: 'https://l210526-twitter-app-be.herokuapp.com/graphql',
//     cache: new InMemoryCache(),
//   })
//   const { data } = await client.query({
//     query: gql`
//     query User($where: UserWhereUniqueInput!) {
//       user(where: $where) {
//         username
//         created_at
//       }
//     }
//     `,

//   })
//   client.query({
//     query: query,
//     variables: {
//       username: 'shank'
//     }
//   })
//   return {
//     props: {
//       data: data.users,
//     },
//   }
// }

//@danil2c2
