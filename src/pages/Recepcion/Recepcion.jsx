
import { useEffect, useState } from "react";
import { traeRecepcion } from "../../helpers/ApiRecepcion";
import { TableRecepcion } from "./components/TableRecepcion";
import { DescripcionSede } from "../../components/informacion/DescripcionSede";

export const Recepcion = () => {
  const [dataRecepcion, setDataRecepcion] = useState([])
  useEffect(()=>{
    traeRecepcion().then(res=>setDataRecepcion(res.data))
  },[])

  return (
    <>
      <div className="p-6">
        <div className="full flex justify-between items-center">

          <div className="flex justify-between items-center bg-gray-100 shadow-md rounded-sm py-3 px-5 mb-5    w-full">
            <DescripcionSede/>
          </div>

        </div>
        <TableRecepcion  dataRecepcion={dataRecepcion} />
      </div>
    </>
  );
};
