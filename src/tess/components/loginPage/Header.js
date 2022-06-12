import { FaTwitter } from "react-icons/fa";
import { mySvg } from "../home/svg";

const Header = () => {
  return (
    <div>
      <div className="loginpage__head">
        <div className="loginpage__headleft">
          <div className="loginpage__head__close">{mySvg.close}</div>
        </div>

        <FaTwitter
          className="loginpage__head__twitter"
          style={{ color: "rgb(16, 131, 238)", fontSize: "35px" }}
        />
        <div className="loginpage__headright"></div>
      </div>
    </div>
  );
};

export default Header;

// <div className="loginpage__head">
// <div>tes</div>
//   <FaTimes
//     className="loginpage__head__close"
//     style={{ fontSize: "2em", cursor: "pointer" }}
//   />
//   <FaTwitter
//     className="loginpage__head__twitter"
//     style={{ color: "rgb(16, 131, 238)", fontSize: "35px" }}
//   />
// </div>
