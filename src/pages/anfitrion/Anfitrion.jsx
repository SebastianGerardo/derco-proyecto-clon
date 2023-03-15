import { InformacionSede } from "../../components/informacion/InformacionSede";

import { TableAnfitrion } from "./components/TableAnfitrion";

export const Anfitrion = () => {
  return (
    <>
      <div className="p-8">
        <p className="font-bold text-3xl">
          Módulo | <span className="font-normal">Abordaje</span>
        </p>
        <InformacionSede />

        {/*TABLA*/}
        <TableAnfitrion />
      </div>
    </>
  );
};
