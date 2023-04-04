import { useEffect, useState } from "react";
import { DescripcionSede } from "../../components/informacion/DescripcionSede";
import { traeAlmacen } from "../../helpers/ApiAlmacen";
import { TableAlmacen } from "./components/TableAlmacen";

export const Almacen = () => {
  const [infoAlmacen, setInfoAlmacen] = useState([])

  useEffect(()=>{
    const interval = setInterval(() => {
      traeAlmacen().then(res => setInfoAlmacen(res.data))
    }, 1000);
    return () => clearInterval(interval);
  },[])

  return (
    <>
      <div className="p-6">
        <TableAlmacen data={infoAlmacen} />
      </div>
    </>
  );
};
