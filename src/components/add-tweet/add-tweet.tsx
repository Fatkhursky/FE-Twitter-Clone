import { mySvg } from '~/public/assets/svg'
import Popup from 'reactjs-popup'
import LoadingBar from 'react-top-loading-bar'
import { deleteSomeTweet } from '@/src/requests/graphql'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'
import { graphQLClient } from '@/src/libraries/graphql-request'
import { useSession } from 'next-auth/react'

const AddTweet = ({ newTweet, id, name, userName, filterGetTweets, refetch }: any) => {
  const { data: session, status } = useSession()
  const queryClient = useQueryClient()

  const ref = useRef(null)
  const { mutate, error } = useMutation(
    async (variables) => {
      const data = await graphQLClient.request(deleteSomeTweet, variables)
      return data?.tweets || []
    },
    {
      onMutate: (deleteData: any) => {
        // @ts-ignore
        ref.current.continuousStart()
        const previousTodos = queryClient.getQueryData([
          '/home',
          'tweets',
          filterGetTweets,
        ])

        queryClient.setQueryData(['/home', 'tweets', filterGetTweets], (old) => {
          console.log(
            33334444,
            old,
            old.filter((v: any) => v.id !== deleteData?.where?.id)
          )
          //@ts-ignore
          return old.filter((v: any) => v.id !== deleteData?.where?.id)
        })

        return { previousTodos }
      },
      onSuccess: () => {
        refetch()
        // @ts-ignore
        ref.current.complete()
      },
    }
  )
  console.log(3333444, error)
  const handleDelete = async () => {
    try {
      //@ts-ignore
      ref.current.continuousStart()
      await mutate({
        where: {
          id: id,
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
  return (
    <div className="pt-5 border-b cursor-pointer">
      <LoadingBar className="" color="#be123c" ref={ref} />
      <div className="px-2">
        <div className="">
          <div className="flex flex-row">
            <img
              style={{ height: '45px', marginLeft: '0px' }}
              src={'/assets/logo193.png'}
              alt="joebiden"
            />
            <div className="w-full flex flex-col px-2">
              <div className=" flex justify-between items-center">
                <p style={{ fontWeight: 'bold' }}>
                  {name}
                  <span style={{ fontWeight: 'normal' }}>&nbsp;{userName}&nbsp;</span>
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
                      onClick={handleDelete}
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
              <div>{newTweet}</div>
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
  )
}
export default AddTweet
