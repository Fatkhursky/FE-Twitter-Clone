import { mySvg } from '~/public/assets/svg'
import AddTweet from '@/src/components/add-tweet/add-tweet'
import TextareaAutosize from 'react-textarea-autosize'

const Home = ({
  handleSubmit,
  tweet,
  setTweet,
  array,
  filterGetTweets,
  refetch,
}: any) => {
  return (
    <div className="h-full">
      <div className="bg-white flex items-center justify-between px-2 py-2 sticky top-0 relative">
        <strong>Home</strong>
        <div className="rounded-full hover:bg-[#f3f4f6] cursor-pointer p-2">
          <svg className="w-6 h-6">{mySvg.stars}</svg>
        </div>
      </div>

      <div id="main" className="homepage__section">
        <form onSubmit={handleSubmit}>
          <div className=" p-2 border-b">
            <div className="flex flex-row items-center gap-2">
              <img className="w-14 h-12" src={'/assets/logo193.png'} alt="user" />
              <TextareaAutosize
                maxLength={280}
                value={tweet}
                onChange={(e) => setTweet(e.target.value)}
                className="w-full border-none outline-none resize-none"
                placeholder="What's Happening?"
                id="textarea"
              />
            </div>

            <div className="w-full py-2">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <div className="hover:bg-[#DBEAFE] cursor-pointer flex items-center justify-center rounded-full p-1.5">
                    <svg className="w-7 h-7">{mySvg.img}</svg>
                  </div>
                  <div className="hover:bg-[#DBEAFE] cursor-pointer flex items-center justify-center rounded-full p-1.5">
                    <svg className="w-7 h-7">{mySvg.gif}</svg>
                  </div>
                  <div className="hover:bg-[#DBEAFE] cursor-pointer flex items-center justify-center rounded-full p-1.5">
                    <svg className="w-7 h-7">{mySvg.poll}</svg>
                  </div>
                  <div className="hover:bg-[#DBEAFE] cursor-pointer flex items-center justify-center rounded-full p-1.5">
                    <svg className="w-7 h-7">{mySvg.emot}</svg>
                  </div>
                  <div className="hover:bg-[#DBEAFE] cursor-pointer flex items-center justify-center rounded-full p-1.5">
                    <svg className="w-7 h-7">{mySvg.time}</svg>
                  </div>
                  <div className="hover:bg-[#DBEAFE] cursor-pointer flex items-center justify-center rounded-full p-1.5">
                    <svg className="w-7 h-7">{mySvg.location}</svg>
                  </div>
                </div>
                <div className="rounded-full px-1 flex items-center justify-center bg-[#1D9BF0] hover:bg-[#197FC5] cursor-pointer">
                  <button className="text-white px-5" type="submit">
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            {array.length > 0 ? (
              array.map((e: any, i: number) => (
                <AddTweet
                  key={i}
                  newTweet={e.content}
                  id={e.id}
                  name={e.user.name}
                  userName={e.user.username}
                  filterGetTweets={filterGetTweets}
                  refetch={refetch}
                />
              ))
            ) : (
              <div className="px-2">
                <strong className="text-xl">Welcome to Twitter!</strong>
                <p>
                  This is the best place to see what’s happening in your world. Find some
                  people and topics to follow now.
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
export default Home
