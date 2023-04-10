import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const useAuth = () => { 
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      var token = sessionStorage.getItem(window.$nombre_session);
      var url = window.$url_api + "/acceso/validar";

      if(!token) setIsAuth(false);

      try {
        const res = await axios.post(url, {"token" : token})
        console.log(res);    

        if(res.data.estado == 200 && res.data.token.tipo == "Administrador") {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }     
      }
      catch(e) {
        console.log(e);
        setIsAuth(false);
      }

   };
   fetchData();
 }, []);      

  return isAuth;
};

const ProtegerRutasAdmin = () => {
  const isAuth = useAuth();

  if (isAuth === null)
    return null;

  return isAuth ? <Outlet /> : <Navigate to="/ingreso" />;
};

export default ProtegerRutasAdmin;