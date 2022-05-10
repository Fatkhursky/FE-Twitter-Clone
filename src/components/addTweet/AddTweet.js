import Image from "../home/logo193.png";
import { decodeToken } from "react-jwt";
import { mySvg } from "../home/svg";
import api from "../../api/apiUrl";
import Popup from "reactjs-popup";

const AddTweet = ({ newTweet, id, array, setArray, setProgress }) => {
  const token = localStorage.getItem("Bearer");
  const myDecodedToken = decodeToken(token);
  let headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };
  //Delete some tweet
  const handleDelete = async () => {
    try {
      const res = await api.delete(`tweets/${id}`, {
        headers: headers,
      });
      setProgress(100);
      setArray((array = array.filter((item) => item.id !== id)));
      return res.data.message;
    } catch (error) {}
  };

  const noFeature = () => {
    alert("Fitur belum tersedia");
  };
  return (
    <div className="addtweet">
      <div className="addtweet__content">
        <div className="addtweet__section" style={{ position: "relative" }}>
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

            <Popup
              trigger={
                <svg
                  id="rightmore2"
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
    </div>
  );
};

export default AddTweet;

// <Modal
//   isOpen={modalIsOpen}
//   onAfterOpen={afterOpenModal}
//   onRequestClose={closeModal}
//   style={customStyles}
//   contentLabel="Example Modal"
// >
//   <h2>Delete Tweet?</h2>
//   <p>
//     This can't be undone and it wil;l be removed from yout profile., the
//     timeline of any accounts that follow you, and from Twitter search results.
//   </p>
//   <div>
//     <button onClick={handleDelete}>Delete</button>
//     <button onClick={closeModal}>Cancel</button>
//   </div>
// </Modal>;

// <svg
//   //onClick={handleDelete}
//   id="rightmore2"
//   style={{ height: "30px", width: "30px", marginRight: "0" }}
// >
//   {mySvg.more}
// </svg>;
