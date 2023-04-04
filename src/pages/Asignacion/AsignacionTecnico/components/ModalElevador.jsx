
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { BotonFroms } from '../../../../components/Boton/BotonForms';
import Elevadores from './Elevadores';
import FormMecanico from './FormMecanico';
export const ModalElevador = ({ dataElevador, data, closeElevadores, idsElevadores }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className='flex justify-center items-center cursor-pointer px-5 bg-blue-700 font-extrabold text-2xl text-white min-w-[10rem] rounded-md' onClick={() => setIsOpen(true)}>
        <button className='pb-1'>
              +
        </button>
      </div>
          
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className={`w-full max-w-2xl transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all`}>
                  
                <div className='bg-[#C00000] text-white py-2 w-full'>
                    <p className='text-center text-xl font-medium '>Asignación de Elevador y Servicio</p>
                    <button onClick={(e) => {e.preventDefault() ; setIsOpen(false)}} className="absolute top-0 right-0 mr-4 text-white text-3xl">x</button>
                </div>
                   
                  <div className='p-5 w-full block'>
                    <FormMecanico data={data} dataElevador={dataElevador} setIsOpen={setIsOpen} closeElevadores={closeElevadores} idsElevadores={idsElevadores}/>
                  </div>
                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
