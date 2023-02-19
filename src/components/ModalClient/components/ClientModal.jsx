import React from "react";
import { AddButton, CancelButton } from "../ButtonModalClientTypes";
import { ClientForm } from "./ClientForm";


const ClientModal = ({ handleModal }) => {

  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-2 md:gap-6">
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form action="#" method="POST">
            <div className="overflow-hidden shadow sm:rounded-md">

              {/* CONTENIDO FORMULARIO */}

                <ClientForm/>

              {/* BOTONES PARA CERRAR O AGREGAR */}

              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <AddButton handleModal={handleModal}/>
                <CancelButton handleModal={handleModal}/>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientModal;
