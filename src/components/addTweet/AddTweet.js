import Image from "../home/logo193.png";
import { decodeToken } from "react-jwt";
import { mySvg } from "../home/svg";
import api from "../../api/apiUrl";
import { useEffect } from "react";

const AddTweet = ({ newTweet, id, array, setArray }) => {
  const token = localStorage.getItem("Bearer");
  const myDecodedToken = decodeToken(token);
  let headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };
  //Delete some tweet
  const handleDelete = async () => {
    //const body = { text: text, userId: userId };
    //console.log(22, id);
    try {
      const res = await api.delete(`tweets/${id}`, {
        headers: headers,
      });
      setArray((array = array.filter((item) => item.id !== id)));
      return res.data.message
    } catch (error) {}
  };

  useEffect(() => {
    console.log(333, array);
  });

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
              onClick={handleDelete}
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
            <svg className="addtweet__iconlist" id="iconlike">
              {mySvg.like}
            </svg>
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
