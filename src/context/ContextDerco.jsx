import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VerificarSesion } from "../helpers/ApiUsuarios";

export const UserContext = createContext();

export const ContextDerco = ({ children }) => {
  const navigate = useNavigate();
  const [estadoData, setEstadoData ] = useState(false)
  const [UsuarioLogin, setUsuarioLogin] = useState([]);
  const [modules, setModules] = useState({
    "/dashboard/anfitrion": "Abordaje",
    "/dashboard/recepcion": "Recepción",
    "/dashboard/almacen": "Almacén",
    "/dashboard/asignacion": "Asignación",
    "/dashboard/asignacion/servicios": "Asignación",
  })

  const [rolModule, setRolModule] = useState({
    "/dashboard/anfitrion": "Anfitrión",
    "/dashboard/recepcion": "Receptor",
    "/dashboard/almacen": " Almacenero",
    "/dashboard/asignacion": "Asignación",
    "/dashboard/asignacion/servicios": "Asignación",
  })
  useEffect(() => {
    VerificarSesion().then((res) => {
      if (res.statusCode === 200) {
        navigate("/dashboard", {
          replace: true,
          state: {
            logged: true,
          },
        });
        setUsuarioLogin(res.data);
      } else {
        navigate("/login", { replace: true });
      }
    });
  }, []);
  return (
    <UserContext.Provider value={{ UsuarioLogin, setUsuarioLogin, estadoData, setEstadoData, modules, rolModule}}>
      {children}
    </UserContext.Provider>
  );
};
