import { FaTwitter } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { mySvg } from "./svg";
import Image from "./logo193.png";
import foto1 from "./foto1.jpg";
import foto2 from "./foto2.jpg";
import foto3 from "./foto3.jpg";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";
import { decodeToken } from "react-jwt";





const Home = () => {

  const token = localStorage.getItem("Bearer");
  const myDecodedToken = decodeToken(token);
  console.log(999, myDecodedToken.username)

  const [tweet, setTweet] = useState("");
  const color = tweet ? "rgb(29, 108, 255)" : "";
  const isPointer = tweet ? "pointer" : "";

  return (
    <div className="homepage">
      <div className="homepage__header">
        <h1 className="homepage__home">Home</h1>

        <svg
          id="stars"
          style={{ width: "35px", height: "35px", marginTop: "1rem" }}
        >
          {mySvg.stars}
        </svg>
      </div>

      <div className="homepage__header2">
        <label>
          <input
            style={{ fontSize: "larger" }}
            type="text"
            placeholder="Search Twitter"
          />
        </label>
      </div>

      <div className="homepage__header3">
        <FaTwitter id="twitter" style={{ color: "blue", fontSize: "2.5em" }} />
      </div>

      <div id="menu" className="homepage__section">
        <div className="homepage__iconhome">
          <svg style={{ width: "35px", height: "35px" }}>{mySvg.home}</svg>
          <p className="homepage__icontitle">Home</p>
        </div>

        <div style={{ width: "150px" }} className="homepage__icons">
          <svg style={{ width: "35px", height: "35px", position: "static" }}>
            {mySvg.explore}
          </svg>
          <p className="homepage__icontitle">Explore</p>
        </div>

        <div style={{ width: "210px" }} className="homepage__icons">
          <svg style={{ width: "35px", height: "35px" }}>
            {mySvg.notification}
          </svg>
          <p className="homepage__icontitle">Notifications</p>
        </div>

        <div style={{ width: "180px" }} className="homepage__icons">
          <svg style={{ width: "35px", height: "35px" }}>{mySvg.messages}</svg>
          <p className="homepage__icontitle">Messages</p>
        </div>

        <div style={{ width: "190px" }} className="homepage__icons">
          <svg style={{ width: "35px", height: "35px" }}>{mySvg.bookmarks}</svg>
          <p className="homepage__icontitle">Bookmarks</p>
        </div>

        <div style={{ width: "110px" }} className="homepage__icons">
          <svg style={{ width: "35px", height: "35px" }}>{mySvg.lists}</svg>
          <p className="homepage__icontitle">Lists</p>
        </div>

        <div style={{ width: "130px" }} className="homepage__icons">
          <svg style={{ width: "35px", height: "35px" }}>{mySvg.profile}</svg>
          <p className="homepage__icontitle">Profile</p>
        </div>

        <div style={{ width: "120px" }} className="homepage__icons">
          <svg style={{ width: "35px", height: "35px" }}>{mySvg.moremenu}</svg>
          <p className="homepage__icontitle">More</p>
        </div>

        <div>
          <button className="homepage__tweetbtn">Tweet</button>
        </div>

        <div className="homepage__accuser">
          <img
            id="imgjoe"
            style={{ height: "50px" }}
            src={Image}
            alt="joebiden"
          />
          <p id="namejoe" style={{ fontSize: "1.3rem" }}>
            &nbsp;@{myDecodedToken.username}
          </p>
          <FiMoreHorizontal id="morejoe" style={{ fontSize: "1.9rem" }} />
        </div>
      </div>
      <div id="main" className="homepage__section">
        <div className="homepage__mainhead">
          <img
            className="homepage__tophead"
            style={{ height: "50px" }}
            src={Image}
            alt="user"
          />
          <TextareaAutosize
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
            id="tweetbtnmain"
            style={{ backgroundColor: color, cursor: isPointer }}
          >
            Tweet
          </button>
        </div>
        <div>
        <h1>tes</h1>

          
          
        </div>
        <div>
          <hr className="homepage__line" />
        </div>
        <div className="homepage__topmain">
          <p className="homepage__topmainitem">Digitals creators &gt;</p>
          <p className="homepage__topmainitem">K-Pop &gt;</p>
          <p className="homepage__topmainitem">Cats &gt;</p>
          <p className="homepage__topmainitem">Viral &gt;</p>
        </div>

        <div className="homepage__botmain">
          <h1 style={{ fontSize: "bold" }}>Welcome to Twitter!</h1>
          <p style={{ marginTop: "-1rem" }}>
            This is the best place to see what’s happening in your world. Find
            some people and topics to follow now.
          </p>
          <button id="letsbtn">Let's go</button>
        </div>
      </div>
      <div id="right" className="homepage__section">
        <div className="homepage__rightbox">
          <section className="homepage__headrightbox">
            <h1 style={{ marginTop: "0" }}>Trends&nbsp;for&nbsp;you</h1>
            <svg id="setting" style={{ height: "30px", width: "30px" }}>
              {mySvg.setting}
            </svg>
          </section>

          <div className="homepage__contentright">
            <div className="homepage__contentrighttitle">
              <p style={{}}>Trending in Indonesia</p>
              <svg
                id="rightmore"
                style={{ height: "30px", width: "30px", marginRight: "0" }}
              >
                {mySvg.more}
              </svg>
            </div>

            <div className="homepage__contentrightdesc">
              <p style={{ fontWeight: "Bold" }}>Ari Lasso</p>
              <p style={{ marginTop: "-1rem" }}>37.65K Tweets</p>
            </div>
          </div>

          <div className="homepage__contentright">
            <div className="homepage__contentrighttitle">
              <p style={{}}>Sport . Trending</p>
              <svg
                id="rightmore"
                style={{ height: "30px", width: "30px", marginRight: "0" }}
              >
                {mySvg.more}
              </svg>
            </div>

            <div className="homepage__contentrightdesc">
              <p style={{ fontWeight: "Bold" }}>Manchester</p>
              <p style={{ marginTop: "-1rem" }}>27.57K Tweets</p>
            </div>
          </div>

          <div className="homepage__contentright">
            <div className="homepage__contentrighttitle">
              <p style={{}}>Politics . Trending</p>
              <svg
                id="rightmore"
                style={{ height: "30px", width: "30px", marginRight: "0" }}
              >
                {mySvg.more}
              </svg>
            </div>

            <div className="homepage__contentrightdesc">
              <p style={{ fontWeight: "Bold" }}>Rusia</p>
              <p style={{ marginTop: "-1rem" }}>45.57K Tweets</p>
            </div>
          </div>

          <div className="homepage__contentright">
            <div className="homepage__contentrighttitle">
              <p style={{}}>Trending in Zimbabwe</p>
              <svg
                id="rightmore"
                style={{ height: "30px", width: "30px", marginRight: "0" }}
              >
                {mySvg.more}
              </svg>
            </div>

            <div className="homepage__contentrightdesc">
              <p style={{ fontWeight: "Bold" }}>Inflasi</p>
              <p style={{ marginTop: "-1rem" }}>23.52K Tweets</p>
            </div>
          </div>

          <div className="homepage__contentright">
            <div className="homepage__contentrighttitle">
              <p style={{}}>Sport . Trending</p>
              <svg
                id="rightmore"
                style={{ height: "30px", width: "30px", marginRight: "0" }}
              >
                {mySvg.more}
              </svg>
            </div>

            <div className="homepage__contentrightdesc">
              <p style={{ fontWeight: "Bold" }}>Ronaldo</p>
              <p style={{ marginTop: "-1rem" }}>76.57K Tweets</p>
            </div>
          </div>

          <div className="homepage__contentright">
            <div className="homepage__contentrighttitle">
              <p style={{}}>Politics . Trending</p>
              <svg
                id="rightmore"
                style={{ height: "30px", width: "30px", marginRight: "0" }}
              >
                {mySvg.more}
              </svg>
            </div>

            <div className="homepage__contentrightdesc">
              <p style={{ fontWeight: "Bold" }}>WW3</p>
              <p style={{ marginTop: "-1rem" }}>65.12K Tweets</p>
            </div>
          </div>

          <div id="smore">
            <h3 style={{ padding: "0% 0% 3% 0% ", color: "rgb(29, 108, 255)" }}>
              Show more
            </h3>
          </div>
        </div>

        <div className="homepage__rightboxbot">
          <h2 style={{ padding: "2% 3% 0% 5%" }}>Who to follow</h2>
          <div className="homepage__rightboxbotcontent">
            <img
              className="homepage__avatar"
              style={{
                borderRadius: "400px",
                width: "65px",
                height: "65px",
                marginTop: "-0.8rem",
              }}
              src={foto2}
              alt="user1"
            />

            <div className="homepage__username">
              <p style={{ fontWeight: "bold", marginTop: "-0.1rem" }}>
                Spongebob
              </p>
              <p style={{ marginTop: "-1rem" }}>@Sponge_bob</p>
            </div>

            <button
              className="homepage__lastbtn"
              style={{
                borderRadius: "25px",
                width: "95px",
                height: "45px",
                color: "white",
                backgroundColor: "black",
              }}
            >
              Follow
            </button>
          </div>

          <div className="homepage__rightboxbotcontent">
            <img
              className="homepage__avatar"
              style={{
                borderRadius: "400px",
                width: "65px",
                height: "65px",
                marginTop: "-0.8rem",
              }}
              src={foto1}
              alt="user1"
            />

            <div className="homepage__username">
              <p style={{ fontWeight: "bold", marginTop: "-0.1rem" }}>
                Syah_Rul
              </p>
              <p style={{ marginTop: "-1rem" }}>@Syarhru345</p>
            </div>

            <button
              className="homepage__lastbtn"
              style={{
                borderRadius: "25px",
                width: "95px",
                height: "45px",
                color: "white",
                backgroundColor: "black",
              }}
            >
              Follow
            </button>
          </div>

          <div className="homepage__rightboxbotcontent">
            <img
              className="homepage__avatar"
              style={{
                borderRadius: "400px",
                width: "65px",
                height: "65px",
                marginTop: "-0.8rem",
              }}
              src={foto3}
              alt="user1"
            />

            <div className="homepage__username">
              <p style={{ fontWeight: "bold", marginTop: "-0.1rem" }}>Pocong</p>
              <p style={{ marginTop: "-1rem" }}>@Pocong</p>
            </div>

            <button
              className="homepage__lastbtn"
              style={{
                borderRadius: "25px",
                width: "95px",
                height: "45px",
                color: "white",
                backgroundColor: "black",
              }}
            >
              Follow
            </button>
          </div>

          <div id="smore2">
            <h3 style={{ padding: "0% 0% 3% 3% ", color: "rgb(29, 108, 255)" }}>
              Show more
            </h3>
          </div>
        </div>
        <p className="homepage__tos" style={{ cursor: "pointer" }}>
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
  );
};

export default Home;
