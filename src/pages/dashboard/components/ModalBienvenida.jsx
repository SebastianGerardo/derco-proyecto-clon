import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import { UserContext } from "../../../context/ContextDerco";
export const ModalBienvenida = () => {
  let [isOpen, setIsOpen] = useState(true);
  const {UsuarioLogin} = useContext(UserContext)
  const { data } = UsuarioLogin
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
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
                <Dialog.Panel className="lg:w-[40%] xl:w-[40%] w-full transform overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl leading-6 text-gray-900 font-black text-center"
                  >
                    Bienvenido {data?.usuario?.nombres} {data?.usuario?.apellidos}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-lg text-gray-500 text-center">
                      Este es tu entorno de trabajo 😊
                    </p>
                    <img
                      src="https://automundo.pe/wp-content/uploads/2016/03/Dercocenter-Mall-del-Sur.jpg"
                      alt=""
                      className="mt-5 rounded-md"
                    />
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
