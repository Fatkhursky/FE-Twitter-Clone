import React from 'react'
import { mySvg } from '~/public/assets/svg'
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
    username : "Juki",
  },
  {
    username : "Rojali",
  },
  {
    username : "Jeki",
  }
]

const Rightsection = () => {
  return (
    <div className="flex flex-col h-fit">
      <div className="p-2 top-0 sticky bg-white">
      <div className='relative tes'>
      <input
            id='none'
            className="rounded-full border active:border-sky-400 p-2 pl-[calc(46-450-8] gap-2 "
            type="text"
            placeholder="Search Twitter"
          />
          <label htmlFor="one" className='absolute left-1 top-2'>
            <svg className="h-6 w-6 absolute ">{mySvg.search}</svg>
          </label>
      </div>
      
        
        {/* <label htmlFor="" className="relative">
          <svg className="h-6 w-6 absolute ">{mySvg.search}</svg>
          <input
            className="rounded-full border active:border-sky-400 p-2 pl-[calc(46-450-8] gap-2 "
            type="text"
            placeholder="Search Twitter"
          />
        </label> */}
      </div>
      <div className="bg-[#f3f4f6] rounded-lg">
        <div className="p-2">
          <h2>
            <strong>Trends for you</strong>
          </h2>
        </div>

        {trendsItem.map((item, i) => (
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

        {
          otherUser.map((user, i) => (
            <div key={i} className="p-2 flex flex-col justify-center hover:bg-[#e5e7eb] cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <img className="w-9 h-9" src="/assets/logo193.png" alt="" />
                <div className="flex flex-col">
                  <strong>{user.username}</strong>
                  <p>@{user.username}</p>
                </div>
              </div>
              <button className="rounded-full bg-black p-2 text-white font-bold">
                Follow
              </button>
            </div>
          </div>
          ))
        }

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
