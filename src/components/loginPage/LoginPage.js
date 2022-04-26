import Login from "./Login";
import LoginTwo from "./LoginTwo";
import Signup from "./Signup";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [years, setYears] = useState("");
  const [isNext, setIsNext] = useState(false);
  const [userName, setUserName] = useState("");
  const isTrue = name && phone && month && day && years ? true : false;
  const username = `user${name}`;
  const password = `pass${name}`;
  const email = `${name}@gmail.com`;

  const isUserName = (e) => {
    e.preventDefault();
    setIsNext(true)
  }

  let navigate = useNavigate();

  const toSignUp = () => {
    setIsNext(false)
    navigate("/register");
  }

  return (
    <div className="wrap">
      <div className="loginpage">
        <Routes>
          <Route
            path="/"
            element={
              isNext ? (
                <LoginTwo userName={userName} toSignUp = {toSignUp} />
              ) : (
                <Login
                  className="loginpage__login"
                  passName={name}
                  username = {userName}
                  onChangeUsername = {(e) => setUserName(e.target.value)}
                  onSubmitUserName={isUserName}
                  pointer={!userName ? "none" : ""}
                  color={userName ? "black" : "rgba(156, 153, 153)"}
                />
              )
            }
          />
          <Route
            path="/register"
            element={
              <Signup
                className="loginpage__signup"
                onChangeName={(e) => setName(e.target.value)}
                onChangePhone={(e) => setPhone(e.target.value)}
                onChangeMonth={(e) => setMonth(e.target.value)}
                onChangeDay={(e) => setDay(e.target.value)}
                onChangeYears={(e) => setYears(e.target.value)}
                month={month}
                year={years}
                day={day}
                color={isTrue ? "rgb(44, 43, 43)" : ""}
                pointer={isTrue ? "pointer" : ""}
                event={isTrue ? "" : "none"}
                name={name}
                username={username}
                password={password}
                email={email}
                phone={phone}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default LoginPage;
