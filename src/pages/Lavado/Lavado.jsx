import { useEffect, useState } from "react";
import { DescripcionSede } from "../../components/informacion/DescripcionSede";
import { TableLavado } from "./components/TableLavado";

export const Lavado = () => {
  const [infoLavado, setInfoLavado] = useState([])

  // ESTO SE IMPLEMENTARA LUEGO

  // useEffect(()=>{
  //   const interval = setInterval(() => {
  //     traeAlmacen().then(res => setInfoLavado(res.data))
  //   }, 1000);
  //   return () => clearInterval(interval);
  // },[])

  return (
    <>
      <div className="p-6">
        <TableLavado data={infoLavado} />
      </div>
    </>
  );
};
