import { ModalAnfitrion } from "./components/ModalAnfitrion";
import { TableAnfitrion } from "./components/TlableAnfitrion";

export const Anfitrion = () => {
  return (
    <>
      <div className="p-10">
        <div className="full flex justify-between items-center">
          <p className="font-black text-xl">Módulo de Anfitrion</p>
          <ModalAnfitrion tipo="crear" />
        </div>
        {/*TABLA*/}
        <TableAnfitrion />
      </div>
    </>
  );
};
