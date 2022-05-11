import { mySvg } from "./svg";
import userImage from "./logo193.png";
import Image from "./beranda.jpg";
import { useState } from "react";
import Alltweet from "./Alltweet";
import { decodeToken } from "react-jwt";

const Profile = ({ setOnComp, tweets, setTweets, setArray, array }) => {
  const [onSection, setOnSection] = useState("");
  const isTweet = onSection === "tweet" || onSection === "" ? "bold" : "";
  const isTweetAndReply = onSection === "tweetandreply" ? "bold" : "";
  const isMedia = onSection === "media" ? "bold" : "";
  const isLike = onSection === "like" ? "bold" : "";
  const token = localStorage.getItem("Bearer");
  const myDecodedToken = decodeToken(token);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  //console.log(123, tweets.length)
  return (
    <div className="profile__wrap">
      <div className="profile__header">
        <svg
          onClick={() => {
            setOnComp("home");
            scrollToTop();
          }}
          style={{
            hoverColor: "red",
            cursor: "pointer",
            width: "35px",
            height: "35px",
            paddingTop: "3%",
            paddingLeft: "5%",
          }}
        >
          {mySvg.arrow}
        </svg>
        <div className="profile__name">
          <h2>{myDecodedToken.name}</h2>
          <p>{tweets.length} Tweets</p>
        </div>
      </div>
      <div className="profile__beranda">
        <img id="backdrop" src={Image} alt="beranda" />
        <img id="user" src={userImage} alt="userImage" />
        <div className="profile__desc">
          <div style={{ lineHeight: "7px" }}>
            <h2>{myDecodedToken.name}</h2>
            <p>@{myDecodedToken.username}</p>
          </div>
          <p>
            Never lost hope, because it is the key to achieve all your dreams.
          </p>
          <p>Join August 2019</p>
          <p>475 Following&nbsp;&nbsp;&nbsp;105 Follower</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div onClick={() => setOnSection("tweet")} className="profile__item">
            <p style={{ fontWeight: isTweet }}>Tweet</p>
          </div>
          <div
            onClick={() => setOnSection("tweetandreply")}
            className="profile__item"
          >
            <p style={{ fontWeight: isTweetAndReply }}>Tweet & reply</p>
          </div>
          <div onClick={() => setOnSection("media")} className="profile__item">
            <p style={{ fontWeight: isMedia }}>Media</p>
          </div>
          <div onClick={() => setOnSection("like")} className="profile__item">
            <p style={{ fontWeight: isLike }}>Like</p>
          </div>
        </div>
        <div className="profile__line"></div>
      </div>

      <div>
        {tweets.map((item) => (
          <Alltweet
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
  );
};

export default Profile;
