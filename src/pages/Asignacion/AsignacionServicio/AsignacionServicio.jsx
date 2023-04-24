// import { BotonFroms } from "../../components/Boton/BotonForms";
import { DescripcionSede } from "../../../components/informacion/DescripcionSede";
import { TableServicio } from "./components/TableServicio";
import { TraeServicio } from "../../../helpers/ApiAsignacion";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/ContextDerco";

export const AsignacionServicio = () => {
  const [dataServicios, setDataServicios] = useState([])

  const { socketState } = useContext(UserContext);

  const [actualizar, setActualizar] = useState(false)

  useEffect(() => {
    TraeServicio().then(res => setDataServicios(res.data))
  }, [actualizar])

  useEffect(() => {
    if (socketState !== undefined && socketState !== "" && socketState !== null) {
      socketState.on("notificacionToClient", res => {
        res !== undefined && setActualizar(!actualizar)
      })
    }
  }, [actualizar])



  return (
    <div className="grow shadow-md rounded-sm py-3 px-5 w-full">
      <TableServicio dataServicios={dataServicios} />
    </div>
  );
};
