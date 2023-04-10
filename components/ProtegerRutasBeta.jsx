import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ProtegerRutasBeta = () => {

  var isValid = null;
  var token = sessionStorage.getItem("react_session");

  if(token) {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      isValid = false;
    } else {
      isValid = true;
    }
  } else {
    isValid = false;
  }

  return isValid ? <Outlet /> : <Navigate to="/ingreso" />;
};

export default ProtegerRutasBeta;