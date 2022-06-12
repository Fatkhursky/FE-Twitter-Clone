import { mySvg } from '../../../public/assets/svg'
import AddTweet from '../addTweet/AddTweet'
import TextareaAutosize from 'react-textarea-autosize'

const Home = ({ handleSubmit, tweet, setTweet, newTweet, array, setArray }) => {
  const color = tweet ? 'rgb(29, 108, 255)' : ''
  const isPointer = tweet ? 'pointer' : ''
  return (
    <div className="homepage__home">
      <div className="homepage__header">
        <h2 className="homepage__title">Home</h2>
        <svg id="stars" style={{ width: '35px', height: '35px', marginTop: '1rem' }}>
          {mySvg.stars}
        </svg>
      </div>

      <div id="main" className="homepage__section">
        <form onSubmit={handleSubmit}>
          <div className="homepage__mainhead">
            <img
              className="homepage__tophead"
              style={{ height: '45px' }}
              src={'/assets/logo193.png'}
              alt="user"
            />
            <TextareaAutosize
              maxLength={280}
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
              className="homepage__tophead"
              placeholder="What's Happening?"
              id="textarea"
            />
          </div>
          <div className="homepage__mainhead2">
            <div className="homepage__iconmainhead">
              <svg className="homepage__icon2">{mySvg.img}</svg>
              <svg className="homepage__icon2">{mySvg.gif}</svg>
              <svg className="homepage__icon2">{mySvg.poll}</svg>
              <svg className="homepage__icon2">{mySvg.emot}</svg>
              <svg className="homepage__icon2">{mySvg.time}</svg>
              <svg className="homepage__icon2">{mySvg.location}</svg>
            </div>
            <button
              type="submit"
              id="tweetbtnmain"
              style={{ backgroundColor: color, cursor: isPointer }}
            >
              Tweet
            </button>
          </div>

          <div>
            {newTweet
              ? array.map((item) => (
                  <AddTweet
                    key={item.id}
                    newTweet={item.text}
                    id={item.id}
                    array={array}
                    setArray={setArray}
                  />
                ))
              : ''}
          </div>

          <div className="homepage__topmain">
            <p className="homepage__topmainitem">Digitals creators &gt;</p>
            <p className="homepage__topmainitem">K-Pop &gt;</p>
            <p className="homepage__topmainitem">Cats &gt;</p>
            <p className="homepage__topmainitem">Viral &gt;</p>
          </div>

          <div className="homepage__botmain">
            <p style={{ fontSize: 'larger', fontWeight: 'bold' }}>Welcome to Twitter!</p>
            <p style={{ marginTop: '-1rem', fontSize: 'small' }}>
              This is the best place to see what’s happening in your world. Find some people and
              topics to follow now.
            </p>
            <button id="letsbtn">Let's go</button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Home
