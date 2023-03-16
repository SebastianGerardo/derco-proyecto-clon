
import { useEffect } from "react";
import { traeRecepcion } from "../../helpers/ApiRecepcion";
import { TableRecepcion } from "./components/TableRecepcion";

export const Recepcion = () => {

  useEffect(()=>{
    traeRecepcion().then(res=>console.log(res))
  },[])

  return (
    <>
      <div className="p-6">
        <div className="full flex justify-between items-center">
          <p className="font-black text-xl">Modulo de Recepcion</p>
    
        </div>
        <TableRecepcion />
      </div>
    </>
  );
};
