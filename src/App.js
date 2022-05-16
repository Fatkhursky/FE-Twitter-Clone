import LoginPage from "./components/loginPage/LoginPage";
import LoginRoute from "./LoginRoute";
import HomePage from "./components/home/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeRoute from "./HomeRoute";
import { Provider } from "jotai";
//import { textAtom } from "./atom/State";

function App() {
  return (
    <Provider>
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
    </Provider>
  );
}

// const App = () => (
//   <Provider>
//     <MyApp />
//   </Provider>
// );

export default App;
//export default App;
// token ada langsung masuk home tetapi tidak bisa login
