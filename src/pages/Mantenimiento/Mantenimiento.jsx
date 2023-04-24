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
  }, [actualizarEstado, actualizar]);

  return (
    <>
      <div className="p-6">
        <TableMantenimiento elevadores={elevadores} data={infoMantenimiento} />
      </div>
    </>
  );
};
