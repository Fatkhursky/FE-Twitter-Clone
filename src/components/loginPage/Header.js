import { FaTimes } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";


const Header = () => {
  return (
    <div >
    <div className="head" >
        <FaTimes
          className="close"
          style={{ fontSize: "2em", cursor: "pointer" }}
        />
        <FaTwitter
          className="twitter"
          style={{ color: "rgb(16, 131, 238)", fontSize: "3rem" }}
        />
      </div>
    </div>
  )
}

export default Header