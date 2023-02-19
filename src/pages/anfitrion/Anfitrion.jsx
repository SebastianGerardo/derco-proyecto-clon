import ModalClient from "../../components/ModalClient/ModalClient";
import { TableAnfitrion } from "./components/TableAnfitrion";
import { useState } from 'react'
import ClientModal from "../../components/ModalClient/components/ClientModal";


export const Anfitrion = () => {
  const [open, setOpen ] = useState(false)

  const handleModal = (openModal) => {
    // Esta función sirve para cambiar el estado del modal
    setOpen(openModal)
  }

  return (
    <>
      <div className="p-10">
        <div className="full flex justify-between items-center">
            <p className="font-black text-xl mb-8">Modulo de Anfitrion</p>
            <button onClick={() => setOpen(true)} className="flex items-center gap-3 bg-blue-400 p-3 rounded-md text-white font-medium"><i className="fa-solid fa-car-side"></i>Agregar Cliente</button>
            
            {/* MODAL CLIENTE*/}

            <ModalClient open={open} handleModal={handleModal} modalContent={<ClientModal handleModal={handleModal}/>} />
            
        </div>
        <div>            
            <input class="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Buscar Placa"/>
        </div>
        <TableAnfitrion />
      </div>
    </>
  );
};
