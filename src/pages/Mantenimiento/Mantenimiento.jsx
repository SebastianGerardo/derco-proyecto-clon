import { useEffect, useState } from "react";
import { DescripcionSede } from "../../components/informacion/DescripcionSede";
import { TableMantenimiento } from "./components/TableMantenimiento";

export const Mantenimiento = () => {
  const [infoMantenimiento, setInfoMantenimiento] = useState([])

  // ESTO SE IMPLEMENTARA LUEGO

  // useEffect(()=>{
  //   const interval = setInterval(() => {
  //     traeMantenimiento().then(res => setInfoMantenimiento(res.data))
  //   }, 1000);
  //   return () => clearInterval(interval);
  // },[])

  return (
    <>
      <div className="p-6">
        <TableMantenimiento data={infoMantenimiento} />
      </div>
    </>
  );
};
