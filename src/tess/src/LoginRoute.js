import { Navigate } from "react-router-dom";
import HomePage from "../components/home/HomePage";

const LoginRoute = () => {
  const item = localStorage.getItem("Bearer");
  return (
    item !== null ? (
        <HomePage />
      ) : (
        <Navigate to="/" />
      )
  )
}

export default LoginRoute
