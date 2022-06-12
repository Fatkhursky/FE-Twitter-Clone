import { decodeToken } from 'react-jwt'
import { mySvg } from '../../../public/assets/svg'
import api from '../../utilities/axios'
import Popup from 'reactjs-popup'

const AddTweet = ({ newTweet, id, array, setArray }) => {
  const token = localStorage.getItem('Bearer')
  const myDecodedToken = decodeToken(token)
  let headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  }
  //Delete some tweet
  const handleDelete = async () => {
    try {
      const res = await api.delete(`tweets/${id}`, {
        headers: headers,
      })
      setArray((array = array.filter((item) => item.id !== id)))
      return res.data.message
    } catch (error) {}
  }

  const noFeature = () => {
    alert('Fitur belum tersedia')
  }
  return (
    <div className="addtweet">
      <div className="addtweet__content">
        <div className="addtweet__section" style={{ position: 'relative' }}>
          <img
            style={{ height: '45px', marginLeft: '0px' }}
            src={'/assets/logo193.png'}
            alt="joebiden"
          />
          <div className="addtweet__text">
            <p style={{ fontWeight: 'bold' }}>
              {myDecodedToken.name}
              <span style={{ fontWeight: 'normal' }}>&nbsp;@{myDecodedToken.username}&nbsp;</span>
            </p>

            <Popup
              trigger={
                <svg id="rightmore2" style={{ height: '25px', width: '25px', marginRight: '0' }}>
                  {mySvg.more}
                </svg>
              }
              position="left top"
            >
              <div>
                <div className="addtweet__popup" onClick={handleDelete} style={{ display: 'flex' }}>
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
          <div style={{ marginLeft: '57px' }}>{newTweet}</div>
          <div className="addtweet__icon">
            <svg className="addtweet__iconlist">{mySvg.comment}</svg>
            <svg className="addtweet__iconlist">{mySvg.retweet}</svg>
            <svg className="addtweet__iconlist" id="iconlike">
              {mySvg.like}
            </svg>
            <svg className="addtweet__iconlist">{mySvg.up}</svg>
            <svg className="addtweet__iconlist">{mySvg.polling}</svg>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AddTweet
