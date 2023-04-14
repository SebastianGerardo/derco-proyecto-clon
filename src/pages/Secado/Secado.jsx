import { useEffect, useState } from "react";
import { ModalSecado } from "./components/ModalSecado";
import { TableSecado } from "./components/TableSecado";

export const Secado = () => {
  const [infoSecado, setInfoSecado] = useState([])

  // useEffect(()=>{
  //   const interval = setInterval(() => {
  //     traeAlmacen().then(res => setInfoSecado(res.data))
  //   }, 1000);
  //   return () => clearInterval(interval);
  // },[])

  return (
    <>
      <div className="p-6">
        {/* <TableSecado data={infoSecado} /> */}
        <ModalSecado />
      </div>
    </>
  );
};
