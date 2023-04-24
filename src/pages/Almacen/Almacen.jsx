import { useContext, useEffect, useState } from "react";
import { DescripcionSede } from "../../components/informacion/DescripcionSede";
import { traeAlmacen } from "../../helpers/ApiAlmacen";
import { TableAlmacen } from "./components/TableAlmacen";
import { UserContext } from "../../context/ContextDerco";

export const Almacen = () => {
  const [infoAlmacen, setInfoAlmacen] = useState([])
  const { socketState } = useContext(UserContext);

  const [actualizar, setActualizar] = useState(false)

  useEffect(() => {
    console.log("M,e lance xd")
    traeAlmacen().then(res => setInfoAlmacen(res.data))
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
        <TableAlmacen data={infoAlmacen} />
      </div>
    </>
  );
};
