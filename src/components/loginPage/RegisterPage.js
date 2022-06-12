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
    router.push("/register.jsx");
  };

  return (
    <div className="wrap" style={{backgroundColor:""}}>
      <div className="loginpage">

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
        {/*//     }*/}
        {/*//   />*/}
        {/*// </Routes>*/}
      </div>
    </div>
  );
};

export default LoginPage;
