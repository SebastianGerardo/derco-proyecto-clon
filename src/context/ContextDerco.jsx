import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VerificarSesion } from "../helpers/ApiUsuarios";
import { io } from 'socket.io-client';
export const UserContext = createContext();

export const ContextDerco = ({ children }) => {


  const navigate = useNavigate();
  const [estadoData, setEstadoData] = useState(false)
  const [UsuarioLogin, setUsuarioLogin] = useState([]);
  const [modules, setModules] = useState({
    "/dashboard/anfitrion": "Abordaje",
    "/dashboard/recepcion": "Recepción",
    "/dashboard/almacen": "Almacén",
    "/dashboard/asignacion": "Asignación",
    "/dashboard/asignacion/servicios": "Asignación",
    "/dashboard/asignacion/elevadores": "Asignación",
    "/dashboard/mantenimiento": "Mantenimiento",
    "/dashboard/lavado": "Lavado",
    "/dashboard/secado": " Secado",
    "/dashboard/entrega": "Control de Calidad",
  })
  const [socketState, setSocketSttate] = useState()
  useEffect(() => {
    VerificarSesion().then((res) => {
      if (res.statusCode === 200) {
        navigate("/dashboard", {
          replace: true,
          state: {
            logged: true,
          },
        });

        let socket = io("https://api-derco-production.up.railway.app");
        setSocketSttate(socket)
        console.log("SOY FELIZ",res.data.usuario)
        socket.emit('conectar', res.data.usuario)
        console.log("dsdsdsd",res.data.usuario)
        setUsuarioLogin(res.data);
      } else {
        navigate("/login", { replace: true });
      }
    });

  }, []);

  console.log("Soiy el usuario",UsuarioLogin)




  return (
    <UserContext.Provider value={{ UsuarioLogin, setUsuarioLogin, estadoData, setEstadoData, modules, socketState }}>
      {children}
    </UserContext.Provider>
  );
};
