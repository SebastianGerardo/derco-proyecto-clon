// import { BotonFroms } from "../../components/Boton/BotonForms";
import { DescripcionSede } from "../../../components/informacion/DescripcionSede";
import { TableServicio } from "./components/TableServicio";
import { TraeServicio } from "../../../helpers/ApiAsignacion";
import { useEffect, useState } from "react";

export const AsignacionServicio = () => {
  const [dataServicios, setDataServicios] = useState([])
  useEffect(() => {
    const interval = setInterval(() => {
      TraeServicio().then(res => setDataServicios(res.data))
    }, 1000);
    return () => clearInterval(interval);
  }, [])
  console.log(dataServicios)
  return (
    <div className="grow shadow-md rounded-sm py-3 px-5 w-full">
      <TableServicio dataServicios={dataServicios} />
    </div>
  );
};
