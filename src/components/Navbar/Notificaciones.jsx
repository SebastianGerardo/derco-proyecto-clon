import { Menu, Transition } from '@headlessui/react'
import { Fragment, useContext, useEffect, useState } from 'react'
import { UserContext } from "../../context/ContextDerco";
import { TraeMensajes } from '../../helpers/ApiMantenimiento';
// import { Modal } from '../ResetPassword/ModalResetPassword';

export default function Notificaciones() {
  // AQUI TIENEN QUE LLEGAR LOS MENSAJES
  const { UsuarioLogin, socketState } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [traeMensajes, setTraeMensaje] = useState(null)
  useEffect(() => {
    if (socketState !== undefined && socketState !== "" && socketState !== null) {
      socketState.on("chatToClient", res => (

        setTraeMensaje([res])
      )
      )
    }
  }, [UsuarioLogin, socketState])
  console.log(traeMensajes)

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsMenuOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className=" top-16  text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="relative rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-blue-800">
            <div className="absolute w-2 h-2 bg-blue-600 top-0 left-3/4 rounded-full"></div>
            <i className="fa-regular fa-bell"></i>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {/* AQUI SE PONEN LOS MENSAJES */}
              <Menu.Item>
                {({ active }) => (
                  <div
                    href="#"
                    // onClick={openModal}
                    className={`${active ? 'transition-all duration-150 hover:bg-gray-500 hover:text-white' : 'transition-all duration-150 text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {
                      traeMensajes !== null && (
                        traeMensajes.map((res) => (
                          <div>{res.message}</div>
                        ))
                      )
                    }

                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      {/* <Modal isOpen={isModalOpen} closeModal={closeModal} /> */}
    </div>
  )
}

