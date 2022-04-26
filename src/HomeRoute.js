import { Navigate } from "react-router-dom";
import LoginPage from "./components/loginPage/LoginPage";

const HomeRoute = () => {
    const item = localStorage.getItem("Bearer");
  return (
    item !== null ? (
        <Navigate to="/home" />
      ) : (
        <LoginPage />
      )
  )
}

export default HomeRoute