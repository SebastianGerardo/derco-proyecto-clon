import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { DescripcionSede } from "../../components/informacion/DescripcionSede";
import { TableMantenimiento } from "./components/TableMantenimiento";
import { InicarMan, TerminarPausarMan, TraeMantenimiento } from "../../helpers/ApiMantenimiento";
import { UserContext } from "../../context/ContextDerco";
import { TraeElevadores } from "../../helpers/ApiAsignacion";

export const Mantenimiento = () => {
  const { socketState } = useContext(UserContext);


  const [infoMantenimiento, setInfoMantenimiento] = useState([])
  const [actualizarEstado, setActualizarEstado] = useState(false)
  const [elevadores, setElevadores] = useState([])
  const [actualizar, setActualizar] = useState(false)
  // ESTO SE IMPLEMENTARA LUEGO

  useEffect(() => {
    TraeMantenimiento().then(res => setInfoMantenimiento(res.data))
    TraeElevadores().then(res => { setElevadores(res.data), console.log(res.data) })
  }, [actualizar])

  useEffect(() => {
    if (socketState !== undefined && socketState !== "" && socketState !== null) {
      socketState.on("notificacionToClient", res => {
        res !== undefined && setActualizar(!actualizar)
      })
    }
  }, [actualizar])

  
  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     if (event.currentTarget.performance.navigation.type === 1) {
  //       event.preventDefault();
  //       // event.returnValue = '';
  //       localStorage.setItem("pagina", "Recargada")
  //     }
  //   }

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  // useEffect(() => {
  //   return () => {
  //     if (localStorage.getItem("pagina") === "Recargada" && (localStorage.getItem("estado") === "Iniciado" || localStorage.getItem("estado") === "Reanudado")) {
  //       TerminarPausarMan({
  //         serviciosAsignado: localStorage.getItem("id"),
  //         tipo: "mantenimiento",
  //         motivo: "Se reinició la página",
  //         comentario: "",
  //         tiempo: new Date(),
  //         estado: "Pausar",
  //         tiempo_transcurrido: localStorage.getItem("time")
  //       }).then(res => {
  //         console.log(res)
  //       })
  //       console.log("Se cerró la ventana")
  //       console.log("Se cargó la ventana")
  //     }

  //     if (!actualizarEstado) {
  //       setActualizarEstado(true)
  //       localStorage.removeItem("pagina")
  //       // localStorage.setItem("estado", "Pausado")
  //     }
  //   };
  // }, [actualizar]);

  return (
    <>
      <div className="p-6">
        <TableMantenimiento elevadores={elevadores} data={infoMantenimiento} />
      </div>
    </>
  );
};
