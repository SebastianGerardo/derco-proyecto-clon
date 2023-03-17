import { BotonFroms } from "../../components/Boton/BotonForms";
import { DescripcionSede } from "../../components/informacion/DescripcionSede";
import { TableAlmacen } from "./components/TableAlmacen";

export const Almacen = () => {
  return (
    <>
      <div className="p-6">
        <div className="full flex justify-between items-center">
          <div className="flex justify-between items-center bg-gray-100 shadow-md rounded-sm py-3 px-5 mb-5    w-full">
            <DescripcionSede/>
          </div>  
        </div>
        <TableAlmacen />
      </div>
    </>
  );
};
