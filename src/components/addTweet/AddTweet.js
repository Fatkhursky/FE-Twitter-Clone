import Image from "../home/logo193.png";
import { decodeToken } from "react-jwt";
import { mySvg } from "../home/svg";

const AddTweet = ({ newTweet }) => {
  const token = localStorage.getItem("Bearer");
  const myDecodedToken = decodeToken(token);
  return (
    <div className="addtweet">
      <div className="addtweet__content">
        <div className="addtweet__section">
          <img
            style={{ height: "50px", marginLeft: "0px" }}
            src={Image}
            alt="joebiden"
          />
          <div className="addtweet__text">
            <p style={{ fontWeight: "bold" }}>
              {myDecodedToken.name}
              <span style={{ fontWeight: "normal" }}>
                &nbsp;@{myDecodedToken.username}&nbsp;
              </span>
            </p>
            <svg
              id="rightmore2"
              style={{ height: "30px", width: "30px", marginRight: "0" }}
            >
              {mySvg.more}
            </svg>
          </div>
          <div style={{ marginLeft: "57px" }}>{newTweet}</div>
          <div className="addtweet__icon">
            <svg className="addtweet__iconlist">{mySvg.comment}</svg>
            <svg className="addtweet__iconlist">{mySvg.retweet}</svg>
            <svg className="addtweet__iconlist" id="iconlike">{mySvg.like}</svg>
            <svg className="addtweet__iconlist">{mySvg.up}</svg>
            <svg className="addtweet__iconlist">{mySvg.polling}</svg>
          </div>
        </div>
      </div>
      <hr className="addtweet__line" />
    </div>
  );
};

export default AddTweet;
//{newTweet}
