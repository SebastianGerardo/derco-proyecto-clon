import { useState } from "react";
import { ContentModal } from "./ContentModal";
export const ButtonModal = ({tipo, data}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {
        tipo === "crear" ? (
          <button className="flex items-center gap-3 bg-blue-400 p-3 rounded-md text-white font-medium  border-[#60A5FA] border-2 border-solid transition-all ease-in duration-200 shadow-[.3rem_.3rem_1rem_#ccc,_-.3rem_-.3rem_1rem_#fff] hover:shadow-[.3rem_.3rem_1rem_#fff,_-.3rem_-.3rem_1rem_#ccc] active:shadow-[inset_.1rem_.1rem_1rem_#60A5FA,_inset_-.1rem_-.1rem_1rem_#6faaf2]" onClick={() => setIsOpen(true)}>
            <i className="fa-solid fa-car-side"></i>Agregar Cliente
          </button>
        ) : (<button onClick={() => setIsOpen(true)}><img src="/img/edit.gif" alt="" width={25} /></button>)
      }
      <ContentModal isOpen={isOpen} setIsOpen={setIsOpen} data={data} />
    </>
  );
};
