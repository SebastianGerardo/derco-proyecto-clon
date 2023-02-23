import { useNavigate } from "react-router-dom"

//colocar el context para validar usuario fake - lunes 9am 
export const Login = () => {
    const navigate = useNavigate();
    const irDashboard = () =>{
        navigate("/dashboard")
    }
    return (
        <section>
            <div className="bg"></div>
<div className="bg bg2"></div>
<div className="bg bg3"></div>
            <div className="container mx-auto flex items-center align-center w-screen h-screen">
                <div className="w-11/12 mx-auto drop-shadow-2x xl:w-[30%] lg:w-1/4 md:w-1/2 shadow-xl bg-white">
                    <div className=" bg-redDerco mx-auto p-5">
                        <img src="https://app.elipse.ai/hs-fs/hubfs/Derco%20Center%20Logo%20Blanco.png?width=1920&name=Derco%20Center%20Logo%20Blanco.png" alt="dERCO" className="w-36 mx-auto" />
                    </div>
                    <div className="py-10 px-5 ">
                        <h2 className="text-center font-medium text-2xl text-gray-700">Iniciar Sesion</h2>
                        <p className="text-center text-gray-500 w-full mx-auto mt-4">Ingrese su dirección de correo electrónico y contraseña para acceder al panel de administración.</p>
                        <form action="" className="mt-5 z-0 inputLogin">


                            <div className=" relative border-2 focus-within:border-blue-500 rounded-md">
                                <input type="email" name="email" placeholder=" " className="block p-4 w-full text-base appearance-none focus:outline-none bg-transparent" />
                                <label  className="z-1 absolute top-0 text-base bg-white p-4 duration-300 origin-0 text-gray-400">Correo</label>
                            </div>

                            <div className=" relative border-2 focus-within:border-blue-500 mt-5 rounded-md">
                                <input type="password" name="email" placeholder=" " className="block p-4 w-full text-base appearance-none focus:outline-none bg-transparent" />
                                <label  className="z-1 absolute top-0 text-base bg-white p-4 duration-300 origin-0 text-gray-400">Contraseña</label>
                            </div>

                            <button onClick={irDashboard} className="bg-redDerco p-3 text-white font-bold mx-auto rounded-md mt-5 w-full text-lg">Ingresar</button>
                            <div className="w-full flex items-center justify-center mt-4">
                                <a className="font-light text-redDerco">¿Olvidaste tu contraseña?</a>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </section>

    )
}