import { FaTimes } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";


const Header = () => {
  return (
    <div >
    <div className="loginpage__head" >
        <FaTimes
          className="loginpage__head__close"
          style={{ fontSize: "2em", cursor: "pointer" }}
        />
        <FaTwitter
          className="loginpage__head__twitter"
          style={{ color: "rgb(16, 131, 238)", fontSize:"35px" }}
        />
      </div>
    </div>
  )
}

export default Header