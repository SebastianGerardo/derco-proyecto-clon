import { useContext, useEffect, useState } from "react";
import { TraeAsignacion } from "../../../helpers/ApiAsignacion";
import InformacionTecnico from "./components/InformacionTecnico";
import { TableMecanico } from "./components/TableMecanico";
import { UserContext } from "../../../context/ContextDerco";

export const AsignacionTecnico = () => {
  const [dataAsignacion, setDataAsignacion] = useState([])
  const { socketState } = useContext(UserContext);
  const [actualizar, setActualizar] = useState(false)

  useEffect(() => {
    TraeAsignacion().then(res => setDataAsignacion(res.data))
  }, [actualizar])

  useEffect(() => {
    if (socketState !== undefined && socketState !== "" && socketState !== null) {
      socketState.on("notificacionToClient", res => {
        res !== undefined && setActualizar(!actualizar)
      })
    }
  }, [actualizar])



  console.log(dataAsignacion)
  return (
    <>
      <div className="grow shadow-md rounded-sm py-3 px-5 w-full">
        <InformacionTecnico />
        <TableMecanico dataAsignacion={dataAsignacion} />
      </div>
    </>
  );
};
