import { useState } from 'react'
import Home from '@/src/components/home/home'
import Head from 'next/head'
import Mainmenu from '@/src/components/mainmenu'
import Rightsection from '@/src/components/home/rightsection'
import { useMutation, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { createOneTweet, GET_TWEETS } from '@/src/requests/graphql'
import { useRef } from 'react'
import LoadingBar from 'react-top-loading-bar'

const HomePage = () => {
  const { data: session, status } = useSession()

  const [addTweet, { error }] = useMutation(createOneTweet)
  const { data: dataox } = useQuery(GET_TWEETS, {
    variables: {
      where: {
        user_id: {
          equals: session?.id,
        },
      },
    },
  })
  const [tweet, setTweet] = useState('')
  const [newTweet, setNewTweet] = useState('')
  const ref = useRef(null)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      // @ts-ignore
      ref.current.continuousStart()
      const res = await addTweet({
        variables: {
          data: {
            content: tweet,
            user: {
              connect: {
                id: session?.id,
              },
            },
          },
        },
      })
      // @ts-ignore
      ref.current.complete()
      const { data } = res
      const obj = data.createOneTweet
      setTweet('')
      setNewTweet(obj.content)
      if (error) throw error
    } catch (error) {
      console.log(error)
    }
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
              array={dataox?.tweets || []}
              setArray={() => {}}
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
