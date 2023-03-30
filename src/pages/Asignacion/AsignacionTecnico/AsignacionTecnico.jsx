// import { BotonFroms } from "../../components/Boton/BotonForms";
import { DescripcionSede } from "../../../components/informacion/DescripcionSede";
import InformacionTecnico from "./components/InformacionTecnico";
import { TableMecanico } from "./components/TableMecanico";

export const AsignacionTecnico = () => {
  return (
    <>
          <div className="grow shadow-md rounded-sm py-3 px-5 w-full">
            <InformacionTecnico />
            <TableMecanico />
          </div>  
    </>
  );
};
