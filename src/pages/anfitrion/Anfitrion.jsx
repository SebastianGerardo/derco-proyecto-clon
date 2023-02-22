import { useContext } from "react";
import { ButtonModal } from "../../components/modal/ButtonModal";
import { UserContext } from "../../context/ContextDerco";
import { TableAnfitrion } from "./components/TableAnfitrion";

export const Anfitrion = () => {
  const {calModulos} = useContext(UserContext)
  return (
    <>
      <div className="p-6">
        <div className="full flex justify-between items-center">
          <p className="font-black text-xl">Modulo de Anfitrion</p>
        </div>
        {/*TABLA*/}
        <TableAnfitrion />
      </div>
    </>
  );
};
