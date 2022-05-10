import LoginPage from "./components/loginPage/LoginPage";
import LoginRoute from "./LoginRoute";
import HomePage from "./components/home/HomePage";
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
            <Route path="/home" element={<HomePage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
 
// bug 
// token ada langsung masuk home tetapi tidak bisa login