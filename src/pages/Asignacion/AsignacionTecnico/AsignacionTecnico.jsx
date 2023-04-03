import { useEffect, useState } from "react";
import { TraeAsignacion } from "../../../helpers/ApiAsignacion";
import InformacionTecnico from "./components/InformacionTecnico";
import { TableMecanico } from "./components/TableMecanico";

export const AsignacionTecnico = () => {
  const [dataAsignacion, setDataAsignacion] = useState([])
  useEffect(() => {
    const interval = setInterval(() => {
      TraeAsignacion().then(res => setDataAsignacion(res.data))
    }, 1000);
    return () => clearInterval(interval);
  }, [])

  console.log(dataAsignacion)
  return (
    <>
      <div className="grow shadow-md rounded-sm py-3 px-5 w-full">
        <InformacionTecnico />
        <TableMecanico dataAsignacion={dataAsignacion} />
      </div>
    </>
  );
};
