
import { useContext, useEffect, useState } from "react";
import { traeRecepcion } from "../../helpers/ApiRecepcion";
import { TableRecepcion } from "./components/TableRecepcion";
import { DescripcionSede } from "../../components/informacion/DescripcionSede";
import { UserContext } from "../../context/ContextDerco";
import InformacionRecepcion from "./components/InformacionRecepcion";

export const Recepcion = () => {
  const [dataRecepcion, setDataRecepcion] = useState([])
  const { estadoData } = useContext(UserContext);
  useEffect(()=>{
    const interval = setInterval(() => {
      traeRecepcion().then(res=>setDataRecepcion(res.data))
    }, 1000);
    return () => clearInterval(interval);
  },[estadoData])

  return (
    <>
      <div className="p-6">
        <div className="full flex justify-between items-center">
          <InformacionRecepcion data={dataRecepcion}/>

        </div>
        <TableRecepcion  dataRecepcion={dataRecepcion} />
      </div>
    </>
  );
};
