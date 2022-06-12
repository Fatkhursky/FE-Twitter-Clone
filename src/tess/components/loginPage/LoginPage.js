import Login from "./Login";
import LoginTwo from "./LoginTwo";
import Signup from "./Signup";
// import { Routes, Route, useNavigate } from "react-router-dom";
import {useRouter} from'next/router'

import { useState } from "react";
// import { useAtom } from "jotai";
// import { textAtom } from "../../atom/State.js";

const LoginPage = () => {
  //const [date] = useAtom(getDate);

  // const [date, setDAte] = useAtom(textAtom);

  // const tes = () => {
  //   setDAte('coba')
  //   console.log(date)
  // }

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
    setIsNext(true);
  };

  let router = useRouter();

  const toSignUp = () => {
    setIsNext(false);
    router.push("/register");
  };

  return (
    <div className="wrap" style={{backgroundColor:""}}>
      <div className="loginpage">
        {isNext ? (
            <LoginTwo userName={userName} toSignUp={toSignUp}/>
        ) : (
            <Login
                className="loginpage__login"
                passName={name}
                username={userName}
                onChangeUsername={(e) => setUserName(e.target.value)}
                onSubmitUserName={isUserName}
                pointer={!userName ? "none" : ""}
                color={userName ? "black" : "rgba(156, 153, 153)"}
            />
        )}


      </div>
    </div>
  );
};

export default LoginPage;
