import Header from "./Header";
import Login from "./Login";
import Footer from "./Footer";
import Signup from "./Signup";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [years, setYears] = useState("");
  const isTrue = name && phone && month && day && years ? true : false


  return (
    <div className="loginpage">
      <Header />
      <Routes>
        <Route path="/" element={<Login className="loginpage__login" />} />
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
              color={isTrue ? 'rgb(44, 43, 43)' : ''}
              pointer={isTrue ? 'pointer' : ''}
              event={isTrue ? '' : 'none'}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default LoginPage;
