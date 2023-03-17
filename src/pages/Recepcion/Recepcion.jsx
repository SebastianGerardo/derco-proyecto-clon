
import { useEffect, useState } from "react";
import { traeRecepcion } from "../../helpers/ApiRecepcion";
import { TableRecepcion } from "./components/TableRecepcion";

export const Recepcion = () => {
  const [dataRecepcion, setDataRecepcion] = useState([])
  useEffect(()=>{
    traeRecepcion().then(res=>setDataRecepcion(res.data))
  },[])

  return (
    <>
      <div className="p-6">
        <div className="full flex justify-between items-center">
          <p className="font-black text-xl">Modulo de Recepcion</p>
    
        </div>
        <TableRecepcion  dataRecepcion={dataRecepcion} />
      </div>
    </>
  );
};
