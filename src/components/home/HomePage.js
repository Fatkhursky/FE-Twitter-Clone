import { FaTwitter } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { mySvg } from "./svg";
import Image from "./logo193.png";
import foto1 from "./foto1.jpg";
import foto2 from "./foto2.jpg";
import foto3 from "./foto3.jpg";
import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import api from "../../api/apiUrl";
import Popup from "reactjs-popup";
import Home from "./Home";
import Profile from "./Profile";


const HomePage = () => {
  

  let navigate = useNavigate();
  const token = localStorage.getItem("Bearer");
  const myDecodedToken = decodeToken(token);

  const logOut = () => {
    localStorage.removeItem("Bearer");
    navigate("/");
  };

  function noFeature() {
    alert("Fitur belum tersedia");
  }

  const [tweet, setTweet] = useState("");
  const [newTweet, setNewTweet] = useState("");
  const [onComp, setOnComp] = useState("");

  let headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };

  const body = { text: tweet, image: "default" };
  let [array, setArray] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("tweets", body, {
        headers: headers,
      });
      const obj = { id: res.data.data.id, text: res.data.data.text };

      setTweet("");
      setNewTweet(res.data.data.text);
      setArray((array) => [obj, ...array]);
      //setId(res.data.data.id);
      //return res.data.message;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
        // console.log(error.response.status);
        // console.log(error.response.headers);
      } else if (error.request) {
        throw new Error(error.request);
      } else {
        throw new Error(error.message);
      }
    }
  };

  let [tweets, setTweets] = useState([]);

  const getTweets = async () => {
    //e.preventDefault();
    try {
      const res = await api.get("tweets", {
        headers: headers,
      });
      const myTweet = res.data.data;
      setTweets(myTweet.reverse());
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
        // console.log(error.response.status);
        // console.log(error.response.headers);
      } else if (error.request) {
        throw new Error(error.request);
      } else {
        throw new Error(error.message);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //Pop Up style
  const contentStyle = { backgroundColor: "", position: "fixed" };
  const overlayStyle = { background: "" };
  const arrowStyle = { color: "" };

  const isHome = onComp === "home" ? "bold" : "";
  const isExplore = onComp === "explore" ? "bold" : "";
  const isNotifications = onComp === "notifications" ? "bold" : "";
  const isMessages = onComp === "messages" ? "bold" : "";
  const isBookmarks = onComp === "bookmarks" ? "bold" : "";
  const isLists = onComp === "lists" ? "bold" : "";
  const isProfile = onComp === "profile" ? "bold" : "";
  const isMore = onComp === "more" ? "bold" : "";
  useEffect(() => {
    if (onComp === "profile") {
      //console.log("gettweets")
      return getTweets();
    }
  });
  return (
    <div className="homepage">
      <div>
        <div className="homepage__mainheader">
          <FaTwitter
            id="twitter"
            style={{ color: "blue", fontSize: "2.5em" }}
          />
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
        <div id="menu" className="homepage__section">
          <div
            onClick={() => {
              setOnComp("home");
              scrollToTop();
            }}
            className="homepage__iconhome"
          >
            <svg style={{ width: "35px", height: "35px" }}>
              {onComp === "home" || onComp === ""
                ? mySvg.home[1]
                : mySvg.home[0]}
            </svg>
            <p className="homepage__icontitle" style={{ fontWeight: isHome }}>
              Home
            </p>
          </div>

          <div
            onClick={() => setOnComp("explore")}
            style={{ width: "150px" }}
            className="homepage__icons"
          >
            <svg style={{ width: "35px", height: "35px", position: "static" }}>
              {onComp === "explore" ? mySvg.explore[1] : mySvg.explore[0]}
            </svg>
            <p
              className="homepage__icontitle"
              style={{ fontWeight: isExplore }}
            >
              Explore
            </p>
          </div>

          <div
            onClick={() => setOnComp("notifications")}
            style={{ width: "210px" }}
            className="homepage__icons"
          >
            <svg style={{ width: "35px", height: "35px" }}>
              {onComp === "notifications"
                ? mySvg.notification[1]
                : mySvg.notification[0]}
            </svg>
            <p
              className="homepage__icontitle"
              style={{ fontWeight: isNotifications }}
            >
              Notifications
            </p>
          </div>

          <div
            onClick={() => setOnComp("messages")}
            style={{ width: "180px" }}
            className="homepage__icons"
          >
            <svg style={{ width: "35px", height: "35px" }}>
              {onComp === "messages" ? mySvg.messages[1] : mySvg.messages[0]}
            </svg>
            <p
              className="homepage__icontitle"
              style={{ fontWeight: isMessages }}
            >
              Messages
            </p>
          </div>

          <div
            onClick={() => setOnComp("bookmarks")}
            style={{ width: "190px" }}
            className="homepage__icons"
          >
            <svg style={{ width: "35px", height: "35px" }}>
              {onComp === "bookmarks" ? mySvg.bookmarks[1] : mySvg.bookmarks[0]}
            </svg>
            <p
              className="homepage__icontitle"
              style={{ fontWeight: isBookmarks }}
            >
              Bookmarks
            </p>
          </div>

          <div
            onClick={() => setOnComp("lists")}
            style={{ width: "110px" }}
            className="homepage__icons"
          >
            <svg style={{ width: "35px", height: "35px" }}>
              {onComp === "lists" ? mySvg.lists[1] : mySvg.lists[0]}
            </svg>
            <p className="homepage__icontitle" style={{ fontWeight: isLists }}>
              Lists
            </p>
          </div>

          <div
            onClick={() => {
              setOnComp("profile");
              scrollToTop();
              //getTweets();
            }}
            style={{ width: "130px" }}
            className="homepage__icons"
          >
            <svg style={{ width: "35px", height: "35px" }}>
              {onComp === "profile" ? mySvg.profile[0] : mySvg.profile[1]}
            </svg>
            <p
              className="homepage__icontitle"
              style={{ fontWeight: isProfile }}
            >
              Profile
            </p>
          </div>

          <div
            onClick={() => setOnComp("more")}
            style={{ width: "120px" }}
            className="homepage__icons"
          >
            <svg style={{ width: "35px", height: "35px" }}>
              {mySvg.moremenu}
            </svg>
            <p className="homepage__icontitle" style={{ fontWeight: isMore }}>
              More
            </p>
          </div>

          <div>
            <button className="homepage__tweetbtn">Tweet</button>
          </div>

          <Popup
            style={{ backgroundColor: "red" }}
            trigger={
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
            }
            {...{ contentStyle, overlayStyle, arrowStyle }}
            position="top"
          >
            <div>
              <div style={{ display: "flex" }}>
                <img
                  id="imgjoe"
                  style={{ height: "50px" }}
                  src={Image}
                  alt="joebiden"
                />
                <p id="namejoe" style={{ fontSize: "1.3rem" }}>
                  &nbsp;@{myDecodedToken.username}
                </p>
              </div>
              <div className="homepage__popupcontent" onClick={noFeature}>
                <p>Add an existing account</p>
              </div>
              <div className="homepage__popupcontent" onClick={logOut}>
                <p>Log Out &nbsp;@{myDecodedToken.username}</p>
              </div>
            </div>
          </Popup>
        </div>
      </div>

      {onComp === "profile" ? (
        <Profile
          setOnComp={setOnComp}
          tweets={tweets}
          setArray={setArray}
          array={array}
        />
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

export default HomePage;
