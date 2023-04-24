
import { useContext, useEffect, useState } from "react";
import { traeRecepcion } from "../../helpers/ApiRecepcion";
import { TableRecepcion } from "./components/TableRecepcion";
import { DescripcionSede } from "../../components/informacion/DescripcionSede";
import { UserContext } from "../../context/ContextDerco";
import InformacionRecepcion from "./components/InformacionRecepcion";

export const Recepcion = () => {
  const [dataRecepcion, setDataRecepcion] = useState([])
  const { socketState } = useContext(UserContext);
  const [actualizar, setActualizar] = useState(false)

  useEffect(() => {
      traeRecepcion().then(res => setDataRecepcion(res.data))
  }, [actualizar])

  useEffect(() => {
    if (socketState !== undefined && socketState !== "" && socketState !== null) {
      socketState.on("notificacionToClient", res => {
        res !== undefined && setActualizar(!actualizar)
      })
    }
  }, [actualizar])

  


  return (
    <>
      <div className="p-6">
        <div className="full flex justify-between items-center">
          <InformacionRecepcion data={dataRecepcion} />

        </div>
        <TableRecepcion dataRecepcion={dataRecepcion} />
      </div>
    </>
  );
};
