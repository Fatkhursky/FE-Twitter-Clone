import LoginPage from "./components/loginPage/LoginPage";
import LoginRoute from "./LoginRoute";
import Home from "./components/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeRoute from "./HomeRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="*" element={<HomeRoute />}>
            <Route path="*" element={<LoginPage />} />
          </Route>

          <Route path="/home" element={<LoginRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
 
// bug 
// token ada langsung masuk home tetapi tidak bisa login