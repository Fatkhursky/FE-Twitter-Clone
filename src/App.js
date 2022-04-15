import LoginPage from "./components/loginPage/LoginPage";
import Home from "./components/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";



function App() {
 const [tesName, setTesName] = useState("");
console.log(111, tesName)
 const changeTesName = (e) => setTesName(e.target.value)

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="*" element={<LoginPage changeUserName={changeTesName} userName={tesName} />} />
          <Route path="/home" element={<Home userName={tesName} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
