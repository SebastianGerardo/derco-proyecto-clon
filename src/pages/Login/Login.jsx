import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/ContextDerco";
import { IniciarSesion } from "../../helpers/ApiUsuarios";
import Swal from "sweetalert2";
//colocar el context para validar usuario fake - lunes 9am
export const Login = () => {
  const navigate = useNavigate();
  const { setUsuarioLogin } = useContext(UserContext);
  const [datosUsuarios, setDatosUsuarios] = useState({
    correo: "",
    clave: "",
  });

  const handleInputChange = (event) => {
    // console.log(event.target.name)
    // console.log(event.target.value)
    setDatosUsuarios({
      ...datosUsuarios,
      [event.target.name]: event.target.value,
    });
  };

  const enviarDatos = (event) => {
    event.preventDefault();
    IniciarSesion(datosUsuarios).then((val) => {
      if (val.statusCode == 200) {
        console.log("Soy el usuaario", val)
        setUsuarioLogin(val.data);
        navigate("/dashboard", {
          state: {  
            logged: true
          }
        });
      } else {
        Swal.fire(
          "Algo salio mal....",
          "Usuario y/o contraseña Incorrecta ☹️",
          "error"
        );
      }
    });
  };

  return (
    <section className="bg-young-pattern bg-center bg-cover bg-no-repeat">
      {/* <div className="bg"></div>
            <div className="bg bg2"></div>
            <div className="bg bg3"></div> */}

      <div className="container mx-auto flex items-center align-center w-screen min-h-screen">
        <div className="bg-white rounded-xl w-11/12 sm:w-7/12 mx-auto drop-shadow-2x xl:w-[30%] lg:w-2/6 md:w-1/2 shadow-xl z-10">
          <div className="rounded-t-xl bg-redDerco mx-auto p-5">
            <img
              src="https://app.elipse.ai/hs-fs/hubfs/Derco%20Center%20Logo%20Blanco.png?width=1920&name=Derco%20Center%20Logo%20Blanco.png"
              alt="dERCO"
              className="w-36 mx-auto"
            />
          </div>
          <div className="rounded-b-xl py-10 px-5 ">
            <h2 className="text-center font-medium text-2xl text-gray-700">
              Iniciar Sesion
            </h2>
            <p className="text-center text-gray-500 w-full mx-auto mt-4">
              Ingrese su dirección de correo electrónico y contraseña para
              acceder al panel de administración.
            </p>

            <form action="" className="mt-5 inputLogin" onSubmit={enviarDatos}>


              <div className="relative">
                <input type="email" id="floating_outlined1" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleInputChange} name="correo" />
                <p className="mt-2 ml-2 invisible hidden peer-invalid:visible peer-invalid:block text-pink-600 text-sm ">
                  Por favor ingrese una dirección de correo válida.
                </p>
                <label htmlFor="floating_outlined1" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Correo Electronico</label>
              </div>

              <div className="relative mt-5">
                <input type="password" id="floating_outlined2" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleInputChange} name="clave" />
                <label htmlFor="floating_outlined2" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Contraseña</label>
              </div>

              <button
                className="bg-redDerco p-3 text-white font-bold mx-auto rounded-md mt-5 w-full text-lg"
                disabled={false}
              >
                Ingresar
              </button>
              <div className="w-full flex items-center justify-center mt-4">
                <a className="font-light text-redDerco">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
