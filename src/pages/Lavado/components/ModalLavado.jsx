
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { BotonTimer } from '../../../components/Boton/BotonForms';
import FormLavado from './FormLavado';
export const ModalLavado = ({ tipo, data }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      {/* <BotonTimer tipo={tipo} setIsOpen={setIsOpen} /> */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>console.log("Usted no puede cerrar esta ventana")}>
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
                    <p className='text-center text-xl font-medium '>Lavado</p>
                    {/* <button onClick={(e) => {e.preventDefault() ; setIsOpen(false)}} className="absolute top-0 right-0 mr-4 text-white text-3xl">x</button> */}
                </div>
                   

                  <div className='w-full block'>
                    <FormLavado data={data} setIsOpen={setIsOpen}/>
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
