
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import FormResetPassword from './FormResetPassword';
export const Modal = ({ isOpen, closeModal }) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                    <p className='text-center text-xl font-medium '>Cambiar Contraseña</p>
                    <button onClick={closeModal} className="absolute top-0 right-0 mr-4 text-white text-3xl">x</button>
                </div>
                   

                  <div className='p-5 w-full block'>
                    <FormResetPassword closeModal={closeModal}/>
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
