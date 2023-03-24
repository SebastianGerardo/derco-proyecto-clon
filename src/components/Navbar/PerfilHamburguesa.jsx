import { Menu, Transition } from '@headlessui/react'
import { Fragment, useContext } from 'react'
import { UserContext } from "../../context/ContextDerco";
import { useNavigate } from "react-router-dom";
import { CerrarSesionUsu } from "../../helpers/ApiUsuarios";

export default function PerfilHamburguesa() {
  const { UsuarioLogin } = useContext(UserContext);

  const navigate = useNavigate();

  const CerrarSesion = () =>{
    CerrarSesionUsu().then((res)=>{
        res.statusCode === 200 && navigate("/login", {replace:true})
    })
  }

  return (
    <div className=" top-16 w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button>
                <label
                  className="flex p-3 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 gap-3 items-center hover:bg-slate-500 cursor-pointer"
                >
                  <div className="grid place-items-center place-content-center h-9 w-9 rounded-full text-center leading-4 bg-red-100 font-bold text-xl">
                    <p className=" w-4 h-4 flex pb-[.15rem] items-center justify-center">
                     {UsuarioLogin?.usuario?.nombres?.charAt(0)}
                    </p>
                  </div>

                  <div className="hidden lg:block">
                    <h2 className="font-medium">{UsuarioLogin?.usuario?.nombres?.split(' ', 1)} {UsuarioLogin?.usuario?.apellidos?.split(' ', 1)}</h2>
                    <p className="text-start p-0 m-0">{UsuarioLogin?.usuario?.tipo?.nombre}</p>
                  </div>
                </label>
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
              <Menu.Item>
                {({ active }) => (
                <a
                    href="#"
                    className={`${
                              active ? 'transition-all duration-150 hover:bg-gray-500 hover:text-white' : 'transition-all duration-150 text-gray-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <i className="fa-solid fa-gear fx-1 mr-2"></i>Cambiar
                    Contraseña
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                <button
                    onClick={() => CerrarSesion()}
                    href="#"
                    className={`${
                        active ? 'transition-all duration-150 hover:bg-gray-500 hover:text-white' : 'transition-all duration-150 text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <i className="fa-solid fa-right-from-bracket fa-1x mr-2"></i>
                    Cerrar Sesion
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}