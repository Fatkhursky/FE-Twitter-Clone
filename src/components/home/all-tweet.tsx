import { mySvg } from '~/public/assets/svg'
import Popup from 'reactjs-popup'
import { GET_TWEETS } from '@/src/requests/graphql'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { deleteSomeTweet } from '@/src/requests/graphql'
import LoadingBar from 'react-top-loading-bar'
import { useRef } from 'react'
import { useSession } from 'next-auth/react'
import { graphQLClient } from '@/src/libraries/graphql-request'
const AllTweet = () => {


  const ref = useRef(null)
  const { data: session, status } = useSession()
  const [filterGetTweets, setFilterGetTweets] = useState<any>(null)
  const queryClient = useQueryClient()

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
    ['/profile', 'tweets', filterGetTweets],
    async () => {
      const data = await graphQLClient.request(GET_TWEETS, filterGetTweets)
      return data?.tweets || []
    },
    { initialData: [], enabled: filterGetTweets !== null }
  )

  const { mutate, error } = useMutation(
    async (variables) => {
      const data = await graphQLClient.request(deleteSomeTweet, variables)
      return data?.tweets || []
    },
    {
      onMutate: (deleteData: any) => {
        // @ts-ignore
        ref.current.continuousStart()
        const prevData = queryClient.getQueryData(['/profile', 'tweets', filterGetTweets])
        queryClient.setQueryData(['/profile', 'tweets', filterGetTweets], (old: any) => {
          return old.filter((v: any) => v.id !== deleteData?.where?.id)
        })
        return {prevData}
      },
      onSuccess: () => {
        refetch()
        // @ts-ignore
        ref.current.complete()
      },
    }
  )

  const handleDelete = async (id:any) => {
    try {
      //@ts-ignore
      ref.current.continuousStart()
      await mutate({
        where: {
          id: id
        },
      })
      //@ts-ignore
      ref.current.complete()
      // return res.data.deleteOneTweet !== null ? 'success' : 'Failed'
    } catch (error) {}
    console.log(error)
  }

  const noFeature = () => {
    alert('Fitur belum tersedia')
  }

  return (tweets || []).map((e: any, i: any) => (
    <div key={i} className="pt-5 border-b cursor-pointer">
      <div className="px-2">
        <div className="">
          <div className="flex flex-row">
            <img
              style={{ height: '45px', marginLeft: '0px' }}
              src={'/assets/logo193.png'}
              alt="joebiden"
            />
            <div className="w-full flex flex-col px-2">
              <LoadingBar className="" color="#be123c" ref={ref} />
              <div className=" flex justify-between items-center">
                <p style={{ fontWeight: 'bold' }}>
                  {e.user.name}
                  <span style={{ fontWeight: 'normal' }}>
                    &nbsp; {e.user.username}&nbsp;
                  </span>
                </p>

                <Popup
                  trigger={
                    <div className=" p-1 rounded-full cursor-pointer hover:bg-slate-300">
                      <svg className=" h-6 w-6">{mySvg.more}</svg>
                    </div>
                  }
                  position="left top"
                >
                  <div>
                    <div
                      className="flex gap-2 flex-row items-center p-2 hover:bg-slate-100 cursor-pointer rounded-t-xl"
                      onClick={() => handleDelete(e.id)}
                    >
                      <svg className="w-4 h-4">{mySvg.delete}</svg>
                      <p>Delete</p>
                    </div>
                    <div
                      className="flex gap-2 flex-row items-center p-2 hover:bg-slate-100 cursor-pointer "
                      onClick={noFeature}
                      style={{ display: 'flex' }}
                    >
                      <svg className="w-4 h-4">{mySvg.pin}</svg>
                      <p>Pin to your profile</p>
                    </div>
                    <div
                      className="flex gap-2 flex-row items-center p-2 hover:bg-slate-100 cursor-pointer "
                      onClick={noFeature}
                      style={{ display: 'flex' }}
                    >
                      <svg className="w-4 h-4">{mySvg.doc}</svg>
                      <p>Add/remove</p>
                    </div>
                    <div
                      className="flex gap-2 flex-row items-center p-2 hover:bg-slate-100 cursor-pointer "
                      onClick={noFeature}
                      style={{ display: 'flex' }}
                    >
                      <svg className="w-4 h-4">{mySvg.comment}</svg>
                      <p>Change who can reply</p>
                    </div>
                    <div
                      className="flex gap-2 flex-row items-center p-2 hover:bg-slate-100 cursor-pointer "
                      onClick={noFeature}
                      style={{ display: 'flex' }}
                    >
                      <svg className="w-4 h-4">{mySvg.embed}</svg>
                      <p>Embed Tweet</p>
                    </div>
                    <div
                      className="flex gap-2 flex-row items-center p-2 hover:bg-slate-100 cursor-pointer rounded-b-xl"
                      onClick={noFeature}
                      style={{ display: 'flex' }}
                    >
                      <svg className="w-4 h-4">{mySvg.polling}</svg>
                      <p>View Tweets analythics</p>
                    </div>
                  </div>
                </Popup>
              </div>
              {e.content}
            </div>
          </div>

          <div className="flex flex-row py-1 justify-between w-3/4 mx-auto">
            <div className="p-1 hover:bg-blue-200 hover:fill-blue-600 cursor-pointer flex items-center rounded-full">
              <svg className="h-4 w-4 ">{mySvg.comment}</svg>
            </div>
            <div className="p-1 hover:bg-blue-200 hover:fill-blue-600 cursor-pointer flex items-center rounded-full">
              <svg className="h-4 w-4 ">{mySvg.retweet}</svg>
            </div>
            <div className="p-1 hover:bg-pink-200 hover:fill-pink-600 cursor-pointer flex items-center rounded-full">
              <svg className="h-4 w-4 ">{mySvg.like}</svg>
            </div>
            <div className="p-1 hover:bg-blue-200 hover:fill-blue-600 cursor-pointer flex items-center rounded-full">
              <svg className="h-4 w-4 ">{mySvg.comment}</svg>
            </div>
            <div className="p-1 hover:bg-blue-200 hover:fill-blue-600 cursor-pointer flex items-center rounded-full">
              <svg className="h-4 w-4 ">{mySvg.up}</svg>
            </div>
            <div className="p-1 hover:bg-blue-200 hover:fill-blue-600 cursor-pointer flex items-center rounded-full">
              <svg className="h-4 w-4 ">{mySvg.polling}</svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))
}
export default AllTweet
