import { Link } from "react-router-dom";
import Header from "./Header";
import { mySvg } from "../home/svg.js";

const Login = ({
  onChangeUsername,
  username,
  onSubmitUserName,
  pointer,
  color,
}) => {
  const forgot = (e) => {
    e.preventDefault();
    alert("Fitur belum tersedia");
  };

  return (
    <div className="loginpage__login__wrap">
      <Header />
      <form
        onSubmit={onSubmitUserName}
        className="loginpage__login__box__outer"
      >
        <div className="loginpage__login__box__inner">
          <div className="loginpage__login__box__content">
            <div className="loginpage__login__box__wrap">
            <div className="loginpage__login__title">
              <h2>Sign in to Twitter</h2>
            </div>
            <div
              style={{ cursor: "pointer" }}
              className="loginpage__login__buttons1"
            >
              {mySvg.google}
              <p>Sign in with Google</p>
            </div>
            <div
              style={{ cursor: "pointer" }}
              className="loginpage__login__buttons1"
            >
              {mySvg.apple}
              <span>Sign in with Apple</span>
            </div>
            <h1 className="loginpage__login__content">
              <span>Or</span>
            </h1>

            <label htmlFor="" className="loginpage__login__inp">
              <input
                className="loginpage__login__form"
                type="text"
                placeholder="&nbsp;&nbsp;"
                value={username}
                onChange={onChangeUsername}
              />
              <span className="loginpage__login__label">
                Phone, email or username
              </span>
              <span className="focus-bg"></span>
            </label>

            <button
              style={{
                cursor: "pointer",
                pointerEvents: pointer,
                backgroundColor: color,
              }}
              type="submit"
              className="loginpage__login__buttons2"
            >
              Next
            </button>

            <button
              onClick={forgot}
              style={{ cursor: "pointer", pointerEvents: "" }}
              className="loginpage__login__buttons2 loginpage__login__buttons2--second"
            >
              Forgot Password?
            </button>

            <h1 className="loginpage__login__bottom">
              Don't have account?&nbsp;{" "}
              <span>
                <Link
                  to="/register"
                  style={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "rgb(16, 131, 238)",
                  }}
                >
                  Sign up
                </Link>
              </span>
            </h1>
            </div>
          </div>
          
        </div>
      </form>
    </div>
  );
};

export default Login;

// <Footer />
