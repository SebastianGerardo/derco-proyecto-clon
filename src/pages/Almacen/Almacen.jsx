import { useEffect, useState } from "react";
import { DescripcionSede } from "../../components/informacion/DescripcionSede";
import { traeAlmacen } from "../../helpers/ApiAlmacen";
import { TableAlmacen } from "./components/TableAlmacen";

export const Almacen = () => {
  const [infoAlmacen, setInfoAlmacen] = useState([])

  useEffect(()=>{
    const interval = setInterval(() => {
      traeAlmacen().then(res => setInfoAlmacen(res.data))
    }, 2000);
    return () => clearInterval(interval);
  },[])
  console.log(infoAlmacen)
  return (
    <>
      <div className="p-6">
        <div className="full flex justify-between items-center">
          <div className="flex justify-between items-center bg-gray-100 shadow-md rounded-sm py-3 px-5 mb-5    w-full">
            <DescripcionSede />
          </div>
        </div>
        <TableAlmacen data={infoAlmacen} />
      </div>
    </>
  );
};
