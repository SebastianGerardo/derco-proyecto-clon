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
        setUsuarioLogin(res.data);
        let socket = io("https://api-derco-production.up.railway.app")
        setSocketSttate(socket)
        console.log("HOLA COMO ESTAS", UsuarioLogin)
        socket.on("joinedRoom", res => console.log("WEBAS", res))
      } else {
        navigate("/login", { replace: true });
      }
    });
  }, []);


  useEffect(() => {
    if (UsuarioLogin !== []) {
      let socket = io("https://api-derco-production.up.railway.app")
      setSocketSttate(socket)
      console.log("HOLA COMO ESTAS", UsuarioLogin)
      socket.on("joinedRoom", res => console.log("WEBAS", res))
      socket.emit("joinRoom", { id: UsuarioLogin.usuario?.id, room: UsuarioLogin.usuario?.centro?.codigo })
    }
  }, [UsuarioLogin])








  return (
    <UserContext.Provider value={{ UsuarioLogin, setUsuarioLogin, estadoData, setEstadoData, modules, socketState }}>
      {children}
    </UserContext.Provider>
  );
};
