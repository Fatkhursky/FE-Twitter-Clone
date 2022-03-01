import LoginPage from "./components/loginPage/LoginPage";
import Home from "./components/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {


  return (
    <BrowserRouter>
      <div style={{background:"green"}} className="App">
        <Routes>
          <Route path="*" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
