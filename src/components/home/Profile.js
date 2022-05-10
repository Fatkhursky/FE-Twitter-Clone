import { mySvg } from "./svg";
import userImage from "./logo193.png";
import Image from "./beranda.jpg";
import { useState } from "react";
import { decodeToken } from "react-jwt";
import Popup from "reactjs-popup";

const Profile = ({ setOnComp, allTweet}) => {
  const [onSection, setOnSection] = useState("");
  const isTweet = onSection === "tweet" || onSection === "" ? "bold" : "";
  const isTweetAndReply = onSection === "tweetandreply" ? "bold" : "";
  const isMedia = onSection === "media" ? "bold" : "";
  const isLike = onSection === "like" ? "bold" : "";
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const noFeature = () => {
    alert("Fitur belum tersedia");
  };
  //Delete some tweet
  const handleDelete = async () => {
    try {
      console.log("delete");
    } catch (error) {}
  };
  const token = localStorage.getItem("Bearer");
  const myDecodedToken = decodeToken(token);
  
  console.log(99, allTweet)
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
          <h2>name</h2>
          <p>345 Tweets</p>
        </div>
      </div>
      <div className="profile__beranda">
        <img id="backdrop" src={Image} alt="beranda" />
        <img id="user" src={userImage} alt="userImage" />
        <div className="profile__desc">
          <div style={{ lineHeight: "7px" }}>
            <h2>Name</h2>
            <p>@username</p>
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
      {allTweet.map((item) => (
        <div className="profile__tweets">
        <img
          style={{ height: "50px", marginLeft: "0px" }}
          src={userImage}
          alt="joebiden"
        />
        <div className="profile__text">
          <p style={{ fontWeight: "bold" }}>
            {myDecodedToken.name}
            <span style={{ fontWeight: "normal" }}>
              &nbsp;@{myDecodedToken.username}&nbsp;
            </span>
          </p>
          <Popup
            trigger={
              <svg
                className="profile__more"
                style={{ height: "30px", width: "30px", marginRight: "0" }}
              >
                {mySvg.more}
              </svg>
            }
            position="left top"
          >
            <div>
              <div
                className="addtweet__popup"
                onClick={handleDelete}
                style={{ display: "flex" }}
              >
                <svg
                  className="addtweet__iconlist"
                  style={{ marginTop: "5px" }}
                >
                  {mySvg.delete}
                </svg>
                <p>Delete</p>
              </div>
              <div
                className="addtweet__popup"
                onClick={noFeature}
                style={{ display: "flex" }}
              >
                <svg
                  className="addtweet__iconlist"
                  style={{ marginTop: "5px" }}
                >
                  {mySvg.pin}
                </svg>
                <p>Pin to your profile</p>
              </div>
              <div
                className="addtweet__popup"
                onClick={noFeature}
                style={{ display: "flex" }}
              >
                <svg
                  className="addtweet__iconlist"
                  style={{ marginTop: "5px" }}
                >
                  {mySvg.doc}
                </svg>
                <p>Add/remove</p>
              </div>
              <div
                className="addtweet__popup"
                onClick={noFeature}
                style={{ display: "flex" }}
              >
                <svg
                  className="addtweet__iconlist"
                  style={{ marginTop: "5px" }}
                >
                  {mySvg.comment}
                </svg>
                <p>Change who can reply</p>
              </div>
              <div
                className="addtweet__popup"
                onClick={noFeature}
                style={{ display: "flex" }}
              >
                <svg
                  className="addtweet__iconlist"
                  style={{ marginTop: "5px" }}
                >
                  {mySvg.embed}
                </svg>
                <p>Embed Tweet</p>
              </div>
              <div
                className="addtweet__popup"
                onClick={noFeature}
                style={{ display: "flex" }}
              >
                <svg
                  className="addtweet__iconlist"
                  style={{ marginTop: "5px" }}
                >
                  {mySvg.polling}
                </svg>
                <p>View Tweets analythics</p>
              </div>
            </div>
          </Popup>
        </div>
        <div style={{ marginLeft: "57px" }}>{item.text}</div>
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
      ))}
      </div>

      



    </div>
  );
};

export default Profile;
