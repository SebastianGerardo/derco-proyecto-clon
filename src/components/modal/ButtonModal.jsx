import { useState } from "react";
import { ContentModal } from "./ContentModal";
export const ButtonModal = ({tipo, data}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {
        tipo === "crear" ? (
          <button className="flex items-center gap-3 bg-blue-400 p-3 rounded-md text-white font-medium" onClick={() => setIsOpen(true)}>
            <i className="fa-solid fa-car-side"></i>Agregar Cliente
          </button>
        ) : (<button onClick={() => setIsOpen(true)}><i className="fa-solid fa-pen-to-square fa-2x text-gray-300"></i></button>)
      }
      <ContentModal isOpen={isOpen} setIsOpen={setIsOpen} data={data} />
    </>
  );
};
