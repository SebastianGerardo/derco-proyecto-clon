import { useEffect, useState } from "react";
import { TableControlCalidad } from "./components/TableControlCalidad";

export const ControlCalidad = () => {
  const [infoControlCalidad, setInfoControlCalidad] = useState([])

  // useEffect(()=>{
  //   const interval = setInterval(() => {
  //     traeAlmacen().then(res => setInfoControlCalidad(res.data))
  //   }, 1000);
  //   return () => clearInterval(interval);
  // },[])

  return (
    <>
      <div className="p-6">
        <TableControlCalidad data={infoControlCalidad} />
      </div>
    </>
  );
};
