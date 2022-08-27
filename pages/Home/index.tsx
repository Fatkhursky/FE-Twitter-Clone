//@ts-nocheck
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
import {
  stepLoginAtom,
  allTweet,
  DateOfRegister,
  currentMenu,
} from '@/src/stores/jotai-atom'
import { ApolloClient, gql, InMemoryCache, useMutation, useQuery } from '@apollo/client'
import { signOut } from 'next-auth/react'
//import { httpLink } from '@/src/utilities/apollo'
// import authLink from '@/src/requests/get-user-gql'
import { authLink, client } from '@/src/utilities/apollo'
import { createOneTweet } from '@/src/requests/graphql'
import { useRef } from 'react'
import LoadingBar from 'react-top-loading-bar'

const HomePage = (results) => {
  let router = useRouter()
  const [token, setToken] = useState('')
  const [myDecodeToken, setMyDecodetoken] = useState('')
  const [stepLogin, setStepLogin] = useAtom(stepLoginAtom)
  const [tweet, setTweet] = useState('')
  const [newTweet, setNewTweet] = useState('')
  const [onComp, setOnComp] = useState('')
  const ref = useRef(null)

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
    // async function fetchData() {
    //   const query = gql`
    //     query User($where: UserWhereUniqueInput!) {
    //       user(where: $where) {
    //         username
    //         created_at
    //         id
    //         name
    //       }
    //     }
    //   `
    //   const data = await client.query({
    //     query: query,
    //     variables: {
    //       where: {
    //         id: myDecodeToken?.data?.id,
    //       },
    //     },
    //   })
    //   setUserName(data.data.user.username)
    //   setName(data.data.user.name)
    //   setDateRegister(data.data.user.created_at.split('-').splice(0, 2).join(' '))
    // }
    // fetchData()
  }, [])

  let [array, setArray] = useState([])

  const [addTweet, { data, loading, error }] = useMutation(createOneTweet)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      ref.current.continuousStart()
      const res = await addTweet({
        variables: {
          data: {
            content: tweet,
            user: {
              connect: {
                id: myDecodeToken?.data?.id,
              },
            },
          },
        },
      })
      ref.current.complete()
      const { data } = res
      const obj = data.createOneTweet
      setTweet('')
      setNewTweet(obj.content)
      setArray((prev) => [obj, ...prev])
      if (error) throw error
    } catch (error) {
      console.log(error)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

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
          <div className="w-3/5 border relative">
            <LoadingBar className="" color="#3b82f6" ref={ref} />
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
