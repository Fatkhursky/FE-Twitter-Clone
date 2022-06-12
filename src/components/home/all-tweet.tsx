// @ts-nocheck
import { mySvg } from '~/public/assets/svg'
import { decodeToken } from 'react-jwt'
import Popup from 'reactjs-popup'
import api from '@/src/utilities/axios'
import deleteOneTweet from '@/src/requests/delete-one-tweet'

const AllTweet = ({ item, id, tweets, setTweets, array, setArray }) => {
  const token = localStorage.getItem('Bearer')
  const myDecodedToken = decodeToken(token)
  const noFeature = () => {
    alert('Fitur belum tersedia')
  }

  //Delete some tweet
  const handleDeletet = async () => {
    try {
      const res = await deleteOneTweet(id, { Authorization: token })
      setArray((array = array.filter((item) => item.id !== id)))
      setTweets((tweets = tweets.filter((item) => item.id !== id)))

      return res.data.message
    } catch (error) {}
  }
  let headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  }

  return (
    <div className="profile__tweets">
      <img
        style={{ height: '50px', marginLeft: '0px' }}
        src={'/assets/logo193.png'}
        alt="joebiden"
      />
      <div className="profile__text">
        <p style={{ fontWeight: 'bold' }}>
          {myDecodedToken.name}
          <span style={{ fontWeight: 'normal' }}>&nbsp;@{myDecodedToken.username}&nbsp;</span>
        </p>
        <Popup
          trigger={
            <svg
              className="profile__more"
              style={{ height: '25px', width: '25px', marginRight: '0' }}
            >
              {mySvg.more}
            </svg>
          }
          position="left top"
        >
          <div>
            <div className="addtweet__popup" onClick={handleDeletet} style={{ display: 'flex' }}>
              <svg className="addtweet__iconlist" style={{ marginTop: '5px' }}>
                {mySvg.delete}
              </svg>
              <p>Delete</p>
            </div>
            <div className="addtweet__popup" onClick={noFeature} style={{ display: 'flex' }}>
              <svg className="addtweet__iconlist" style={{ marginTop: '5px' }}>
                {mySvg.pin}
              </svg>
              <p>Pin to your profile</p>
            </div>
            <div className="addtweet__popup" onClick={noFeature} style={{ display: 'flex' }}>
              <svg className="addtweet__iconlist" style={{ marginTop: '5px' }}>
                {mySvg.doc}
              </svg>
              <p>Add/remove</p>
            </div>
            <div className="addtweet__popup" onClick={noFeature} style={{ display: 'flex' }}>
              <svg className="addtweet__iconlist" style={{ marginTop: '5px' }}>
                {mySvg.comment}
              </svg>
              <p>Change who can reply</p>
            </div>
            <div className="addtweet__popup" onClick={noFeature} style={{ display: 'flex' }}>
              <svg className="addtweet__iconlist" style={{ marginTop: '5px' }}>
                {mySvg.embed}
              </svg>
              <p>Embed Tweet</p>
            </div>
            <div className="addtweet__popup" onClick={noFeature} style={{ display: 'flex' }}>
              <svg className="addtweet__iconlist" style={{ marginTop: '5px' }}>
                {mySvg.polling}
              </svg>
              <p>View Tweets analythics</p>
            </div>
          </div>
        </Popup>
      </div>
      <div style={{ marginLeft: '57px' }}>{item}</div>
      <div className="profile__icon">
        <svg className="profile__iconlist">{mySvg.comment}</svg>
        <svg className="profile__iconlist">{mySvg.retweet}</svg>
        <svg className="profile__iconlist" id="iconlike">
          {mySvg.like}
        </svg>
        <svg className="profile__iconlist">{mySvg.up}</svg>
        <svg className="profile__iconlist">{mySvg.polling}</svg>
      </div>
    </div>
  )
}
export default AllTweet
