import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VerificarSesion } from "../helpers/ApiUsuarios";

export const UserContext = createContext();

export const ContextDerco = ({ children }) => {
  const navigate = useNavigate();
  const [UsuarioLogin, setUsuarioLogin] = useState([]);
  useEffect(() => {
    VerificarSesion().then((res) => {
      if (res.statusCode === 200) {
        navigate("/dashboard", { replace: true });
        setUsuarioLogin(res.data);
      } else {
        navigate("/login", { replace: true });
      }
    });
  }, []);
  console.log(UsuarioLogin);
  return (
    <UserContext.Provider value={{ UsuarioLogin, setUsuarioLogin }}>
      {children}
    </UserContext.Provider>
  );
};
