import { Navigate } from "react-router-dom";
import Home from "./components/home/Home";

const LoginRoute = () => {
  const item = localStorage.getItem("Bearer");
  return (
    item !== null ? (
        <Home />
      ) : (
        <Navigate to="/" />
      )
  )
}

export default LoginRoute
