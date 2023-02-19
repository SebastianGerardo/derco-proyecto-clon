import { BarraMenu } from "./BarraMenu"

export const Navbar = () => {
    return (
        <div className="bg-white w-full shadow-md">
            <div className="mx-auto container px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex justify-between gap-4 ">
                        <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <img className="block h-12 w-auto lg:hidden" src="https://nuevapagina.s3.amazonaws.com/DG-Logotipo2-Blanco.png" alt="Desarrollo Global" />
                                <img className="hidden h-9 w-auto lg:block" src="https://nuevapagina.s3.amazonaws.com/DG-Logotipo_Blanco.png" alt="Desarrollo Global" />
                            </div>
                        </div>


                        <div className="flex items-center sm:hidden md:!flex lg:!hidden xl:!hidden">
                            {/*Hmabrugesa */}
                            <input type="checkbox" id="hamburguesa2" className="peer" hidden />
                            <label htmlFor="hamburguesa2" className="flex flex-col justify-center rounded-md p-2 bg-gray-400 text-white hover:bg-blue-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <div className="h-0.5 w-4 bg-white transition"></div>
                                <div className="h-0.5 w-5 bg-white transition mt-1"></div>
                                <div className="h-0.5 w-4 bg-white transition mt-1"></div>
                            </label>
                            <div className="bg-redDerco shadow-lg absolute top-full translate-x-[-150%] transition peer-checked:translate-x-[-34%] w-64 z-z-100">
                                <BarraMenu />
                            </div>
                        </div>

                    </div>



                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                        {/*vcer notificaciones*/}
                        <button type="button" className="relative rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-blue-800">
                            <div className="absolute w-2 h-2 bg-blue-600 top-0 left-3/4 rounded-full"></div>
                            <i className="fa-regular fa-bell"></i>
                        </button>

                        {/* PERFIL HAMBRUGYESA */}

                        <div className="relative ml-3">
                            <div>
                                <input type="checkbox" className="peer" id="hamburger" hidden />
                                <label htmlFor="hamburger" className="flex p-3 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 gap-3 items-center hover:bg-slate-500 cursor-pointer">
                                    <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                    <div className="hidden lg:block">
                                        <h2 className="font-medium">Juan Perez</h2>
                                        <p className="p-0 m-0">Admin</p>
                                    </div>
                                </label>
                                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden peer-checked:block" >
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">Cambiar Contraseña</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">Cerrar Sesion</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}