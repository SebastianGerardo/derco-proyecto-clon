import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { DescripcionSede } from "../../components/informacion/DescripcionSede";
import { TableMantenimiento } from "./components/TableMantenimiento";
import { InicarMan, TerminarPausarMan, TraeMantenimiento } from "../../helpers/ApiMantenimiento";
import { UserContext } from "../../context/ContextDerco";
import { TraeElevadores } from "../../helpers/ApiAsignacion";

export const Mantenimiento = () => {
  const { UsuarioLogin, socketState } = useContext(UserContext);


  const [infoMantenimiento, setInfoMantenimiento] = useState([])
  const [actualizarEstado, setActualizarEstado] = useState(false)
  const [elevadores, setElevadores] = useState([])

  // ESTO SE IMPLEMENTARA LUEGO

  useEffect(() => {
    const interval = setInterval(() => {
      TraeMantenimiento().then(res => setInfoMantenimiento(res.data))
    }, 1000);
    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
      TraeElevadores().then(res => {setElevadores(res.data), console.log(res.data)})
  }, [])

  // ADVERTENCIA AL CERRAR LA VENTANA
  //useEffect(() => {
  //  window.addEventListener('beforeunload', handlebeforeunload);

  // return () => {
  //    window.removeEventListener('beforeunload', handlebeforeunload);
  // }
  //}, [])

  //const handlebeforeunload = (e) => {
  // e.preventDefault();
  // e.returnValue = '';
  //}

  useEffect(() => {
    return () => {
      if (localStorage.getItem("estado") != "Pausado" && localStorage.getItem("time") !== null) {
        TerminarPausarMan({
          serviciosAsignado: localStorage.getItem("id"),
          tipo: "mantenimiento",
          motivo: "Se reinició la página",
          comentario: "",
          tiempo: new Date(),
          estado: "Pausar",
        }).then(res => {
          console.log(res)
          if (res.message == 'No has iniciado sesión') {
            setActualizarEstado(!actualizarEstado)
          }
        })
        console.log("Se cerró la ventana")
        console.log("Se cargó la ventana")
      } 
      if (localStorage.getItem("estado") != null) {
        localStorage.setItem("estado", "Pausado")
      }
    };
  }, [actualizarEstado]);

  return (
    <>
      <div className="p-6">
        <TableMantenimiento elevadores={elevadores} data={infoMantenimiento} />
      </div>
    </>
  );
};
