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
        setUsuarioLogin(val.data);
        localStorage.setItem("usuarioDerco", JSON.stringify(val));
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
                <input
                  type="email"
                  name="correo"
                  placeholder=" "
                  className="peer block p-4 w-full text-base appearance-none bg-transparent border-2 rounded-md focus:outline-none focus-within:border-blue-500"
                  onChange={handleInputChange}
                />
                <p className="mt-2 ml-2 invisible hidden peer-invalid:visible peer-invalid:block text-pink-600 text-sm ">
                  Por favor ingrese una dirección de correo válida.
                </p>
                <label className="absolute top-0 text-base bg-white p-4 -z-1 duration-300 origin-0 text-gray-400">
                  Correo
                </label>
              </div>

              <div className=" relative ">
                <input
                  type="password"
                  name="clave"
                  placeholder=" "
                  className="block p-4 w-full text-base appearance-none bg-transparent border-2 mt-5 rounded-md focus:outline-none focus-within:border-blue-500 "
                  onChange={handleInputChange}
                />
                <label className="absolute top-0 text-base bg-white p-4 -z-1 duration-300 origin-0 text-gray-400">
                  Contraseña
                </label>
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
