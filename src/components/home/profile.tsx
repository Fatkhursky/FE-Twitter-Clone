// @ts-nocheck
import { mySvg } from '~/public/assets/svg'
import { useState } from 'react'
import AllTweet from '@/src/components/home/all-tweet'
import { decodeToken } from 'react-jwt'
import { useAtom } from 'jotai'
import { textAtom } from '@/src/stores/jotai-atom'

const Profile = ({ setOnComp, tweets, setTweets, setArray, array }) => {
  //const [date] = useAtom(textAtom)
  const [onSection, setOnSection] = useState('')
  const isTweet = onSection === 'tweet' || onSection === '' ? 'bold' : ''
  const isTweetAndReply = onSection === 'tweetandreply' ? 'bold' : ''
  const isMedia = onSection === 'media' ? 'bold' : ''
  const isLike = onSection === 'like' ? 'bold' : ''
  const token = 'localStorage.getItem("Bearer")'
  const myDecodedToken = decodeToken(token)
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  const tes = () => {
    console.log(12, myDecodedToken)
  }
  return (
    <div className="profile__wrap">
      <div className="profile__header">
        <svg
          onClick={() => {
            setOnComp('home')
            scrollToTop()
          }}
          style={{
            hoverColor: 'red',
            cursor: 'pointer',
            width: '55px',
            height: '55px',
            paddingTop: '3%',
            paddingLeft: '5%',
          }}
        >
          {mySvg.arrow}
        </svg>
        <div className="profile__name">
          <h2>{myDecodedToken?.name}</h2>
          <p>{tweets.length} Tweets</p>
        </div>
      </div>
      <div className="profile__beranda">
        <img id="backdrop" src={'/assets/beranda.jpg'} alt="beranda" />

        <div className="profile__desc">
          <div>
            <img id="user" src={'/assets/logo193.png'} alt="userImage" />
          </div>
          <div style={{ lineHeight: '7px' }}>
            <h2>{myDecodedToken?.name}</h2>
            <p>@{myDecodedToken?.username}</p>
          </div>
          <p>Never lost hope, because it is the key to achieve all your dreams.</p>
          <div style={{ display: 'flex', lineHeight: '5px' }}>
            <svg onClick={tes} style={{ width: '30px', height: '30px' }}>
              {mySvg.date}
            </svg>
            <p>Join </p>
          </div>

          <p>475 Following&nbsp;&nbsp;&nbsp;105 Follower</p>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div onClick={() => setOnSection('tweet')} className="profile__item">
            <p style={{ fontWeight: isTweet }}>Tweet</p>
          </div>
          <div onClick={() => setOnSection('tweetandreply')} className="profile__item">
            <p style={{ fontWeight: isTweetAndReply }}>Tweet & reply</p>
          </div>
          <div onClick={() => setOnSection('media')} className="profile__item">
            <p style={{ fontWeight: isMedia }}>Media</p>
          </div>
          <div onClick={() => setOnSection('like')} className="profile__item">
            <p style={{ fontWeight: isLike }}>Like</p>
          </div>
        </div>
        <div className="profile__line"></div>
      </div>
      <div>
        {tweets.map((item) => (
          <AllTweet
            key={item.id}
            item={item.text}
            id={item.id}
            tweets={tweets}
            setTweets={setTweets}
            array={array}
            setArray={setArray}
          />
        ))}
      </div>
    </div>
  )
}
export default Profile
