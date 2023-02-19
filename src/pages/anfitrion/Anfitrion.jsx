import { TableAnfitrion } from "./components/TableAnfitrion";

export const Anfitrion = () => {
  return (
    <>
      <div className="p-10">
        <div className="full flex justify-between items-center">
             <p className="font-black text-xl mb-8">Modulo de Anfitrion</p>
            <button className="flex items-center gap-3 bg-blue-400 p-3 rounded-md text-white font-medium"><i className="fa-solid fa-car-side"></i>Agregar Cliente</button>
        </div>
        <div>
            <input type="text" placeholder="Buscar por placa" />
        </div>
        <TableAnfitrion />
      </div>
    </>
  );
};
