import { mySvg } from "./svg";
import userImage from "./logo193.png";
import Image from "./beranda.jpg";
import { useState } from "react";
import Alltweet from "./Alltweet";
import { decodeToken } from "react-jwt";
import { useAtom } from "jotai";
import { textAtom } from "../../atom/State.js";

const Profile = ({ setOnComp, tweets, setTweets, setArray, array }) => {
  const [date] = useAtom(textAtom);
  //console.log(111, date);
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
  const tes  = () => {
    console.log(12, myDecodedToken)
  }
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
            width: "55px",
            height: "55px",
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
        
        <div className="profile__desc">
          <div>
          <img id="user" src={userImage} alt="userImage" />  
          </div>
          <div style={{ lineHeight: "7px" }}>
            <h2>{myDecodedToken.name}</h2>
            <p>@{myDecodedToken.username}</p>
          </div>
          <p>
            Never lost hope, because it is the key to achieve all your dreams.
          </p>
          <div style={{display:"flex", lineHeight:"5px"}}>
          <svg onClick={tes} style={{width:"30px", height:"30px"}}>{mySvg.date}</svg> 
          <p>Join {date}</p>
          </div>
          
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
