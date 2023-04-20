import { useEffect, useState } from "react";
import { DescripcionSede } from "../../components/informacion/DescripcionSede";
import { TableMantenimiento } from "./components/TableMantenimiento";
import { TraeMantenimiento } from "../../helpers/ApiMantenimiento";

export const Mantenimiento = () => {
  const [infoMantenimiento, setInfoMantenimiento] = useState([])

  // ESTO SE IMPLEMENTARA LUEGO

   useEffect(()=>{
     const interval = setInterval(() => {
      TraeMantenimiento().then(res => setInfoMantenimiento(res.data))
     }, 1000);
     return () => clearInterval(interval);
   },[])


  // ADVERTENCIA AL CERRAR LA VENTANA
  useEffect(() => {
    window.addEventListener('beforeunload', handlebeforeunload);

    return () => {
      window.removeEventListener('beforeunload', handlebeforeunload);
    }
  }, [])

  const handlebeforeunload = (e) => {
    e.preventDefault();
    e.returnValue = '';
  }
  console.log(infoMantenimiento)
  return (
    <>
      <div className="p-6">
        <TableMantenimiento data={infoMantenimiento} />
      </div>
    </>
  );
};
