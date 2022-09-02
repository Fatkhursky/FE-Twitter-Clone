import React from 'react'
import { mySvg } from '~/public/assets/svg'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { graphQLClient } from '@/src/libraries/graphql-request'
import { GET_USERS } from '@/src/requests/graphql'
const trendsItem = [
  {
    title: 'Politics. Trending',
    content: 'LGBT',
    tweets: '63.6k Tweets',
  },
  {
    title: 'Fashion. Trending',
    content: 'Citayam',
    tweets: '62.6k Tweets',
  },
  {
    title: 'Sport. Trending',
    content: 'CR7',
    tweets: '70.6k Tweets',
  },
  {
    title: 'Politics. Trending',
    content: 'Ganti Presiden',
    tweets: '63.6k Tweets',
  },
]

const otherUser = [
  {
    username: 'Juki',
  },
  {
    username: 'Rojali',
  },
  {
    username: 'Jeki',
  },
]

const Rightsection = () => {
  const { data: session, status } = useSession()
  const [filterUsers, setFilterUsers] = useState<any>(null)
  
  useEffect(() => {
    if (status !== 'loading') {
      setFilterUsers({
        where: {
          id: {
            not: {
              equals: session?.id,
            },
          },
          AND: [
            {
              followers: {
                every: {
                  follower: {
                    isNot: {
                      id: {
                        equals: session?.id,
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      })
    }
  }, [status])

  // prototipe
  const { data: users, refetch } = useQuery(
    ['rightsection', 'users', filterUsers],
    async () => {
      const data = await graphQLClient.request(GET_USERS, filterUsers)
      //console.log(data?.users)
      return data?.users || []
    },
    { initialData: [], enabled: filterUsers !== null }
  )

  //

  return (
    <div className="flex flex-col h-fit">
      <div className="p-2 top-0 sticky bg-white">
        <div className="relative tes">
          <input
            id="none"
            className="rounded-full border active:border-sky-400 p-2 pl-[calc(46-450-8] gap-2 "
            type="text"
            placeholder="Search Twitter"
          />
          <label htmlFor="one" className="absolute left-1 top-2">
            <svg className="h-6 w-6 absolute ">{mySvg.search[0]}</svg>
          </label>
        </div>
      </div>
      <div className="bg-[#f3f4f6] rounded-lg">
        <div className="p-2">
          <h2>
            <strong>Trends for you</strong>
          </h2>
        </div>

        {trendsItem.map((item:any, i:any) => (
          <div
            key={i}
            className="p-2 flex flex-col justify-center hover:bg-[#e5e7eb] cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <p className="leading-none">{item.title}</p>
              <svg className="w-7 h-6 p-0 leading-none">{mySvg.more}</svg>
            </div>
            <div>
              <strong>{item.content}</strong>
            </div>
            <div>{item.tweets}</div>
          </div>
        ))}

        <div className="p-2 flex flex-col justify-center rounded-b-lg hover:bg-[#e5e7eb] cursor-pointer">
          <h2>Show more</h2>
        </div>
      </div>

      <div className="bg-[#f3f4f6] rounded-lg mt-5">
        <div className="p-2">
          <h2>
            <strong>Who to follow</strong>
          </h2>
        </div>

        {users.map((e:any, i:any) => (
          <div
            key={i}
            className="p-2 flex flex-col justify-center hover:bg-[#e5e7eb] cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <img className="w-9 h-9" src="/assets/logo193.png" alt="" />
                <div className="flex flex-col">
                  <strong>{e.name}</strong>
                  <p>@{e.username}</p>
                </div>
              </div>
              <button onClick={()=> console.log(e.id)} className="rounded-full bg-black p-2 text-white font-bold">
                Follow
              </button>
            </div>
          </div>
        ))}

        <div className="p-2 flex flex-col justify-center rounded-b-lg hover:bg-[#e5e7eb] cursor-pointer">
          <h2>Show more</h2>
        </div>
      </div>
      <nav>
        <span>Terms of Service</span>&nbsp;&nbsp;
        <span>Privacy Policy</span>&nbsp;&nbsp;
        <span>Cookie Policy</span>&nbsp;&nbsp;
        <span>Accessibility</span>&nbsp;&nbsp;
        <span>Ads info</span>&nbsp;&nbsp;
        <span>More</span>&nbsp;&nbsp;
      </nav>
    </div>
  )
}

export default Rightsection
