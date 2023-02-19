import { ButtonModal } from "../../components/modal/ButtonModal";
import { TableAnfitrion } from "./components/TableAnfitrion";

export const Anfitrion = () => {
  return (
    <>
      <div className="p-10">
        <div className="full flex justify-between items-center">
          <p className="font-black text-xl">Modulo de Anfitrion</p>
          {/* Boton Modal */}
          <ButtonModal tipo="crear" />
        </div>
        {/*TABLA*/}
        <TableAnfitrion />
      </div>
    </>
  );
};
