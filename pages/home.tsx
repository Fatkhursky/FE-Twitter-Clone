// @ts-nocheck
import { mySvg } from '~/public/assets/svg'
import { useEffect, useState } from 'react'
import { decodeToken } from 'react-jwt'
import { useRouter } from 'next/router'
import api from '@/src/utilities/axios'
import Popup from 'reactjs-popup'
import Home from '@/src/components/home/home'
import Profile from '@/src/components/home/profile'

const HomePage = () => {
  let router = useRouter()
  const [token, setToken] = useState('')

  useEffect(() => {
    if (window !== undefined) {
      const token1 = localStorage.getItem('Bearer')
      setToken(token1)
    }
  })
  const myDecodedToken = decodeToken(token)

  const logOut = () => {
    localStorage.removeItem('Bearer')
    router.push('/')
  }

  function noFeature() {
    alert('Fitur belum tersedia')
  }

  const [tweet, setTweet] = useState('')
  const [newTweet, setNewTweet] = useState('')
  const [onComp, setOnComp] = useState('')

  let headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  }

  const body = { text: tweet, image: 'default' }
  let [array, setArray] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('tweets', body, {
        headers: headers,
      })
      const obj = { id: res.data.data.id, text: res.data.data.text }

      setTweet('')
      setNewTweet(res.data.data.text)
      setArray((array) => [obj, ...array])
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message)
      } else if (error.request) {
        throw new Error(error.request)
      } else {
        throw new Error(error.message)
      }
    }
  }

  const [tweets, setTweets] = useState([])

  const getTweets = async () => {
    try {
      const res = await api.get('tweets', {
        headers: headers,
      })
      const myTweet = res?.data?.data || []
      console.log(33334, myTweet)
      setTweets(myTweet.reverse())
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message)
      } else if (error.request) {
        throw new Error(error.request)
      } else {
        throw new Error(error.message)
      }
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  //Pop Up style
  const contentStyle = { backgroundColor: '', position: 'fixed' }
  const overlayStyle = { background: '' }
  const arrowStyle = { color: '' }

  const isHome = onComp === 'home' ? 'bold' : ''
  const isExplore = onComp === 'explore' ? 'bold' : ''
  const isNotifications = onComp === 'notifications' ? 'bold' : ''
  const isMessages = onComp === 'messages' ? 'bold' : ''
  const isBookmarks = onComp === 'bookmarks' ? 'bold' : ''
  const isLists = onComp === 'lists' ? 'bold' : ''
  const isProfile = onComp === 'profile' ? 'bold' : ''
  const isMore = onComp === 'more' ? 'bold' : ''
  useEffect(() => {
    if (onComp === 'profile') {
      getTweets()
    }
  }, [onComp])

  return (
    <div id="homewrapper">
      <div className="homepage">
        <div>
          <div id="menu" className="homepage__section">
            <div id="twitt">
              <div id="twitter">{mySvg.twitter}</div>
            </div>
            <div style={{ backgroundColor: '' }}>
              <div
                onClick={() => {
                  setOnComp('home')
                  scrollToTop()
                }}
                className="homepage__icons"
              >
                <svg style={{ width: '24px', height: '24px' }}>
                  {onComp === 'home' || onComp === '' ? mySvg.home[1] : mySvg.home[0]}
                </svg>
                <p className="homepage__icontitle" style={{ fontWeight: isHome }}>
                  Home
                </p>
              </div>
            </div>

            <div>
              <div onClick={() => setOnComp('explore')} className="homepage__icons">
                <svg style={{ width: '24px', height: '24px', position: 'static' }}>
                  {onComp === 'explore' ? mySvg.explore[1] : mySvg.explore[0]}
                </svg>
                <p className="homepage__icontitle" style={{ fontWeight: isExplore }}>
                  Explore
                </p>
              </div>
            </div>
            <div>
              {' '}
              <div onClick={() => setOnComp('notifications')} className="homepage__icons">
                <svg style={{ width: '24px', height: '24px' }}>
                  {onComp === 'notifications' ? mySvg.notification[1] : mySvg.notification[0]}
                </svg>
                <p className="homepage__icontitle" style={{ fontWeight: isNotifications }}>
                  Notifications
                </p>
              </div>
            </div>

            <div>
              {' '}
              <div onClick={() => setOnComp('messages')} className="homepage__icons">
                <svg style={{ width: '24px', height: '24px' }}>
                  {onComp === 'messages' ? mySvg.messages[1] : mySvg.messages[0]}
                </svg>
                <p className="homepage__icontitle" style={{ fontWeight: isMessages }}>
                  Messages
                </p>
              </div>
            </div>

            <div>
              {' '}
              <div onClick={() => setOnComp('bookmarks')} className="homepage__icons">
                <svg style={{ width: '24px', height: '24px' }}>
                  {onComp === 'bookmarks' ? mySvg.bookmarks[1] : mySvg.bookmarks[0]}
                </svg>
                <p className="homepage__icontitle" style={{ fontWeight: isBookmarks }}>
                  Bookmarks
                </p>
              </div>
            </div>

            <div>
              {' '}
              <div onClick={() => setOnComp('lists')} className="homepage__icons">
                <svg style={{ width: '24px', height: '24px' }}>
                  {onComp === 'lists' ? mySvg.lists[1] : mySvg.lists[0]}
                </svg>
                <p className="homepage__icontitle" style={{ fontWeight: isLists }}>
                  Lists
                </p>
              </div>
            </div>

            <div>
              {' '}
              <div
                onClick={() => {
                  setOnComp('profile')
                  scrollToTop()
                }}
                className="homepage__icons"
              >
                <svg style={{ width: '24px', height: '24px' }}>
                  {onComp === 'profile' ? mySvg.profile[0] : mySvg.profile[1]}
                </svg>
                <p className="homepage__icontitle" style={{ fontWeight: isProfile }}>
                  Profile
                </p>
              </div>
            </div>

            <div>
              {' '}
              <div onClick={() => setOnComp('more')} className="homepage__icons">
                <svg style={{ width: '24px', height: '24px' }}>{mySvg.moremenu}</svg>
                <p className="homepage__icontitle" style={{ fontWeight: isMore }}>
                  More
                </p>
              </div>
            </div>

            <div>
              <div>
                <button className="homepage__tweetbtn">Tweet</button>
                <div id="addtweet">{mySvg.addTweet}</div>
              </div>
            </div>
            <div style={{ backgroundColor: '', flexGrow: '1' }}></div>
            <Popup
              style={{ backgroundColor: 'red' }}
              trigger={
                <div style={{ backgroundColor: '', width: '' }}>
                  <div className="homepage__accuser">
                    <img
                      id="imgjoe"
                      style={{
                        height: '45px',
                        padding: '0 2% 0 2%',
                        backgroundColor: '',
                      }}
                      src={'/assets/logo193.png'}
                      alt="joebiden"
                    />
                    <div
                      id="leftusername"
                      style={{
                        backgroundColor: '',
                        lineHeight: '3px',
                        padding: '0 0 0 5px',
                        flexGrow: '1',
                      }}
                    >
                      <p>{myDecodedToken?.name}</p>
                      <p id="namejoe" style={{}}>
                        @{myDecodedToken?.username}
                      </p>
                    </div>
                    <svg id="morejoe" style={{ height: '25px', weight: '25px', width: '25px' }}>
                      {mySvg.more}
                    </svg>
                  </div>
                </div>
              }
              {...{ contentStyle, overlayStyle, arrowStyle }}
              position="top left"
            >
              <div>
                <div style={{ display: 'flex' }}>
                  <img
                    id="imgjoe"
                    style={{ height: '50px' }}
                    src={'/assets/logo193.png'}
                    alt="joebiden"
                  />
                  <p id="namejoe" style={{ fontSize: '1.3rem' }}>
                    &nbsp;@{myDecodedToken?.username}
                  </p>
                </div>
                <div className="homepage__popupcontent" onClick={noFeature}>
                  <p>Add an existing account</p>
                </div>
                <div className="homepage__popupcontent" onClick={logOut}>
                  <p>Log Out &nbsp;@{myDecodedToken?.username}</p>
                </div>
              </div>
            </Popup>
          </div>
        </div>

        {onComp === 'profile' ? (
          <Profile setOnComp={setOnComp} tweets={tweets} setArray={setArray} array={array} />
        ) : (
          <Home
            handleSubmit={handleSubmit}
            tweet={tweet}
            setTweet={setTweet}
            newTweet={newTweet}
            array={array}
            setArray={setArray}
          />
        )}

        <div id="right" className="homepage__sectionright">
          <div className="homepage__header2">
            <label>
              <input
                style={{ fontSize: 'larger', backgroundColor: '' }}
                type="text"
                placeholder="Search Twitter"
              />
            </label>
          </div>
          <div className="homepage__rightbox">
            <div className="homepage__headrightbox">
              <h3 style={{ marginTop: '' }}>Trends&nbsp;for&nbsp;you</h3>
            </div>
            <div className="homepage__contentright">
              <div className="homepage__contentrighttitle">
                <p style={{}}>Trending in Indonesia</p>
                <svg id="rightmore" style={{ height: '25px', width: '25px', marginRight: '0' }}>
                  {mySvg.more}
                </svg>
              </div>
              <div className="homepage__contentrightdesc">
                <p style={{ fontWeight: 'Bold' }}>Ari Lasso</p>
                <p style={{ fontSize: 'small' }}>37.65K Tweets</p>
              </div>
            </div>

            <div className="homepage__contentright">
              <div className="homepage__contentrighttitle">
                <p style={{}}>Sport . Trending</p>
                <svg id="rightmore" style={{ height: '25px', width: '25px', marginRight: '0' }}>
                  {mySvg.more}
                </svg>
              </div>

              <div className="homepage__contentrightdesc">
                <p style={{ fontWeight: 'Bold' }}>Manchester</p>
                <p style={{ fontSize: 'small' }}>27.57K Tweets</p>
              </div>
            </div>

            <div className="homepage__contentright">
              <div className="homepage__contentrighttitle">
                <p style={{}}>Politics . Trending</p>
                <svg id="rightmore" style={{ height: '25px', width: '25px', marginRight: '0' }}>
                  {mySvg.more}
                </svg>
              </div>

              <div className="homepage__contentrightdesc">
                <p style={{ fontWeight: 'Bold' }}>Rusia</p>
                <p style={{ fontSize: 'small' }}>45.57K Tweets</p>
              </div>
            </div>

            <div className="homepage__contentright">
              <div className="homepage__contentrighttitle">
                <p style={{}}>Trending in Zimbabwe</p>
                <svg id="rightmore" style={{ height: '25px', width: '25px', marginRight: '0' }}>
                  {mySvg.more}
                </svg>
              </div>

              <div className="homepage__contentrightdesc">
                <p style={{ fontWeight: 'Bold' }}>Inflasi</p>
                <p style={{ fontSize: 'small' }}>23.52K Tweets</p>
              </div>
            </div>

            <div className="homepage__contentright">
              <div className="homepage__contentrighttitle">
                <p style={{}}>Sport . Trending</p>
                <svg id="rightmore" style={{ height: '25px', width: '25px', marginRight: '0' }}>
                  {mySvg.more}
                </svg>
              </div>

              <div className="homepage__contentrightdesc">
                <p style={{ fontWeight: 'Bold' }}>Ronaldo</p>
                <p style={{ fontSize: 'small' }}>76.57K Tweets</p>
              </div>
            </div>

            <div className="homepage__contentright">
              <div className="homepage__contentrighttitle">
                <p style={{}}>Politics . Trending</p>
                <svg id="rightmore" style={{ height: '25px', width: '25px', marginRight: '0' }}>
                  {mySvg.more}
                </svg>
              </div>

              <div className="homepage__contentrightdesc">
                <p style={{ fontWeight: 'Bold' }}>WW3</p>
                <p style={{ fontSize: 'small' }}>65.12K Tweets</p>
              </div>
            </div>

            <div id="smore">
              <h3 style={{ padding: '0% 0% 3% 0% ', color: 'rgb(29, 108, 255)' }}>Show more</h3>
            </div>
          </div>

          <div className="homepage__rightboxbot">
            <h3 style={{ padding: '2% 3% 0% 5%' }}>Who to follow</h3>
            <div className="homepage__rightboxbotcontent">
              <img
                className="homepage__avatar"
                style={{
                  borderRadius: '55px',
                  width: '55px',
                  height: '55px',
                }}
                src={'/assets/foto2.jpg'}
                alt="user1"
              />

              <div className="homepage__username">
                <p style={{ fontWeight: 'bold', fontSize: 'small' }}>Spongebob</p>
                <p style={{ fontSize: 'small' }}>@Sponge_bob</p>
              </div>

              <button
                className="homepage__lastbtn"
                style={{
                  borderRadius: '35px',
                  width: '60px',
                  height: '30px',
                  color: 'white',
                  backgroundColor: 'black',
                }}
              >
                Follow
              </button>
            </div>

            <div className="homepage__rightboxbotcontent">
              <img
                className="homepage__avatar"
                style={{
                  borderRadius: '55px',
                  width: '55px',
                  height: '55px',
                }}
                src={'/assets/foto1.jpg'}
                alt="user1"
              />

              <div className="homepage__username">
                <p style={{ fontWeight: 'bold', fontSize: 'small' }}>Syah_Rul</p>
                <p style={{ fontSize: 'small' }}>@Syarhru345</p>
              </div>

              <button
                className="homepage__lastbtn"
                style={{
                  borderRadius: '35px',
                  width: '60px',
                  height: '30px',
                  color: 'white',
                  backgroundColor: 'black',
                }}
              >
                Follow
              </button>
            </div>

            <div className="homepage__rightboxbotcontent">
              <img
                className="homepage__avatar"
                style={{
                  borderRadius: '55px',
                  width: '55px',
                  height: '55px',
                  marginTop: '',
                }}
                src={'/assets/foto3.jpg'}
                alt="user1"
              />

              <div className="homepage__username">
                <p style={{ fontWeight: 'bold', fontSize: 'small' }}>Pocong</p>
                <p style={{ fontSize: 'small' }}>@Pocong</p>
              </div>

              <button
                className="homepage__lastbtn"
                style={{
                  borderRadius: '35px',
                  width: '60px',
                  height: '30px',
                  color: 'white',
                  backgroundColor: 'black',
                }}
              >
                Follow
              </button>
            </div>

            <div id="smore2">
              <h3 style={{ padding: '', color: 'rgb(29, 108, 255)' }}>Show more</h3>
            </div>
          </div>
          <p className="homepage__tos" style={{ cursor: 'pointer' }}>
            <span>Terms of Service</span>&nbsp;&nbsp;
            <span>Privacy Policy</span>&nbsp;&nbsp;
            <span>Cookie Policy</span>&nbsp;&nbsp;
            <span>Accessibility</span>&nbsp;&nbsp;
            <span>Ads info</span>&nbsp;&nbsp;
            <span>More</span>&nbsp;&nbsp;
          </p>
          <p>© 2022 Twitter, Inc.</p>
        </div>
      </div>
    </div>
  )
}
export default HomePage
