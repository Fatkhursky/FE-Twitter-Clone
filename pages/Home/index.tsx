import { useEffect, useState } from 'react'
import Home from '@/src/components/home/home'
import Head from 'next/head'
import Mainmenu from '@/src/components/mainmenu'
import Rightsection from '@/src/components/home/rightsection'
import { useSession } from 'next-auth/react'
import { createOneTweet, GET_TWEETS } from '@/src/requests/graphql'
import { useRef } from 'react'
import LoadingBar from 'react-top-loading-bar'
import { graphQLClient } from '@/src/libraries/graphql-request'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useBreakpoint from '@/src/shared-hooks/use-breakpoint'
const HomePage = () => {
  const { data: session, status } = useSession()
  const queryClient = useQueryClient()

  const [filterGetTweets, setFilterGetTweets] = useState<any>(null)
  const breakPoints = useBreakpoint()
  useEffect(() => {
    if (status !== 'loading') {
      setFilterGetTweets({
        where: {
          user_id: {
            equals: session?.id,
          },
        },
      })
    }
  }, [status])

  const { data: tweets, refetch } = useQuery(
    ['/home', 'tweets', filterGetTweets],
    async () => {
      const data = await graphQLClient.request(GET_TWEETS, filterGetTweets)
      return data?.tweets || []
    },
    { initialData: [], enabled: filterGetTweets !== null }
  )

  const { mutate, error } = useMutation(
    async (variables) => {
      const data = await graphQLClient.request(createOneTweet, variables)
      // console.log(3333444123, { data, variables })
      return data?.tweets || []
    },
    {
      onMutate: (newData: any) => {
        // @ts-ignore
        ref.current.continuousStart()
        const previousTodos = queryClient.getQueryData([
          '/home',
          'tweets',
          filterGetTweets,
        ])

        queryClient.setQueryData(['/home', 'tweets', filterGetTweets], (old: any) => [
          {
            id: 'new-id',
            content: newData?.data?.content,
            user: {
              name: session?.user?.name,
              username: session?.username,
            },
          },
          //  @ts-ignore
          ...old,
        ])

        return { previousTodos }
      },
      onSuccess: () => {
        refetch()
        // @ts-ignore
        ref.current.complete()
      },
    }
  )

  const [tweet, setTweet] = useState('')
  const ref = useRef(null)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      // @ts-ignore
      mutate({
        data: {
          content: tweet,
          user: {
            connect: {
              id: session?.id,
            },
          },
        },
      })

      setTweet('')
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
      <div className="w-screen flex xs:flex-col sm:flex-row sm:gap-2 bg-white">
        <div className="flex top-0 sticky sm:h-screen w-2/4 ">
          <div className="grow"></div>
          {breakPoints === 'xs' ? null : <Mainmenu />}
        </div>
        <div className="flex flex-row  w-screen gap-3">
          <div className="w-[600px] sm:border relative">
            <LoadingBar className="" color="#3b82f6" ref={ref} />
            <Home
              handleSubmit={handleSubmit}
              tweet={tweet}
              setTweet={setTweet}
              array={tweets}
              filterGetTweets={filterGetTweets}
              refetch={refetch}
            />
          </div>
          {breakPoints === 'md' || breakPoints === 'sm' || breakPoints === 'xs' ? null : (
            <div className="h-fit bg-slate-300 w-80 sticky -top-3/4">
              <Rightsection />
            </div>
          )}
        </div>
        {breakPoints === 'xs' ? <Mainmenu /> : null}
      </div>
    </>
  )
}
export default HomePage
