import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Login = ({ onChangeUsername, username, onSubmitUserName, pointer, color }) => {
  const forgot = (e) => {
    e.preventDefault()
    alert('Fitur belum tersedia')
  }
  return (
    <div>
      <Header />
      <form onSubmit={onSubmitUserName} className="loginpage__login__box">
        <h1 className="loginpage__login__title">Sign in to Twitter</h1>
        <div
          style={{ cursor: "pointer" }}
          className="loginpage__login__buttons1"
        >
          <svg
            width="40"
            height="41"
            viewBox="0 0 40 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M39.1309 21.4165C39.1325 20.0562 39.0175 18.6983 38.7871 17.3576H19.9619V25.0457H30.7441C30.5235 26.2736 30.0565 27.4441 29.3713 28.4867C28.6861 29.5292 27.7969 30.4222 26.7573 31.1119V36.1024H33.1922C36.96 32.6284 39.1309 27.491 39.1309 21.4165Z"
              fill="#4285F4"
            />
            <path
              d="M19.9619 40.9237C25.3488 40.9237 29.8846 39.1549 33.1921 36.1051L26.7572 31.1147C24.9662 32.329 22.6595 33.0221 19.9619 33.0221C14.7551 33.0221 10.3358 29.5122 8.75547 24.7823H2.12646V29.9253C3.78792 33.2314 6.33559 36.0107 9.48503 37.9528C12.6345 39.895 16.2617 40.9235 19.9619 40.9237Z"
              fill="#34A853"
            />
            <path
              d="M8.75551 24.7823C7.92005 22.3038 7.92005 19.6198 8.75551 17.1414V11.9984H2.1265C0.728825 14.7796 0.000915527 17.8492 0.000915527 20.9618C0.000915527 24.0745 0.728825 27.144 2.1265 29.9253L8.75551 24.7823Z"
              fill="#FBBC04"
            />
            <path
              d="M19.9618 8.90154C22.8086 8.85503 25.5593 9.93062 27.6194 11.8958L33.3169 6.19837C29.7041 2.80506 24.918 0.94208 19.9618 0.999967C16.2617 1.00014 12.6345 2.02871 9.48503 3.97086C6.33559 5.913 3.78792 8.69228 2.12646 11.9984L8.75547 17.1414C10.3358 12.4115 14.7551 8.90154 19.9618 8.90154Z"
              fill="#EA4335"
            />
          </svg>
          <span>Sign in with Google</span>
        </div>
        <div
          style={{ cursor: "pointer" }}
          className="loginpage__login__buttons1"
        >
          <svg
            width="40"
            height="41"
            viewBox="0 0 77 94"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M69.9982 81.6667C66.1248 87.4533 62.0182 93.1 55.7648 93.1933C49.5115 93.3333 47.5048 89.5067 40.4115 89.5067C33.2715 89.5067 31.0782 93.1 25.1515 93.3333C19.0382 93.5667 14.4182 87.1733 10.4982 81.5267C2.51817 70 -3.59516 48.7667 4.61817 34.4867C8.67817 27.3933 15.9582 22.9133 23.8448 22.7733C29.8182 22.68 35.5115 26.8333 39.1982 26.8333C42.8382 26.8333 49.7448 21.84 56.9782 22.5867C60.0115 22.7267 68.5048 23.8 73.9648 31.8267C73.5448 32.1067 63.8382 37.8 63.9315 49.6067C64.0715 63.7 76.2982 68.4133 76.4382 68.46C76.2982 68.7867 74.4782 75.18 69.9982 81.6667ZM43.3515 7C46.7582 3.12667 52.4048 0.186667 57.0715 0C57.6782 5.46 55.4848 10.9667 52.2182 14.8867C48.9982 18.8533 43.6782 21.9333 38.4515 21.5133C37.7515 16.1467 40.3648 10.5467 43.3515 7Z"
              fill="black"
            />
          </svg>
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
          type='submit'
          className="loginpage__login__buttons2"
        >
          Next
        </button>

        <button
          onClick={forgot}
          style={{ cursor: "pointer", pointerEvents:'' }}
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
      </form>
      <Footer />
    </div>
  );
};

export default Login;
