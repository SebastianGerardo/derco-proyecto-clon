import { useContext, useEffect, useState } from "react";
import { Toast } from "../../../components/Alertas/SweetAlex";
import { UserContext } from "../../../context/ContextDerco";
import { editServicio } from "../../../helpers/ApiAnfitrion";
import { Asesores } from "../../../helpers/ApiUsuarios";
import { FormtearFecha } from "../../../helpers/funcions";

export const FormEdit = ({ data, setIsOpen }) => {
  const { estadoData, setEstadoData, socketState, UsuarioLogin } = useContext(UserContext);
  const [enabled, setEnabled] = useState(false);
  const [asesores, setAsesores] = useState([]);
  useEffect(() => {
    Asesores().then((use) => setAsesores(use.data));
  }, []);


  const [datosEdita, setEditar] = useState({
    vehiculoKilometraje: data.vehiculoKilometraje
  })


  const handleInputChange = (e) => {
    setEditar({
      [e.target.name]: e.target.value,
    });
  };

  const editarRegistro = (e) => {
    e.preventDefault()
    let datos = {
      vehiculoKilometraje: datosEdita.vehiculoKilometraje,
      estado: "2",
      asistencia: "2",
      asesor: {
        id: e.target.asesor.value
      },
      fechaEntrada: new Date()
    }
    if (datos.vehiculoKilometraje !== "") {
      editServicio(datos, data.id).then(res => {
        if (res.statusCode === 200) {
          Toast.fire({
            icon: "success",
            title: "Asesor asignado correctamente",
          });
          socketState.emit("notificacionToServer", { tipo: "1-2-3", room: UsuarioLogin.usuario?.centro?.codigo, notificacion: "Alert" })
          setEstadoData(!estadoData)
          setIsOpen(false)
        } else {
          Toast.fire({
            icon: "error",
            title: "Ha ocurrido un error al asignar el servicio",
          });
        }
      })
    }else{
      Toast.fire({
        icon: "error",
        title: "Revisa bien los campos",
      });
    }

  }


  return (
    <div>
      <form
        action=""
        onSubmit={editarRegistro}
        className="flex pt-3 justify-between items-center flex-wrap space-y-2 p-5"
      >
        <div className="lg:w-[30%] w-full">
          <label htmlFor="" className="text-gray-400">
            Nombre {`&`} Apellido:
          </label>
          <br />
          <input
            type="text"
            value={data.nombres}
            disabled={!enabled}
            className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
          />
        </div>
        <div className="lg:w-[30%] w-full">
          <label htmlFor="" className="text-gray-400">
            Placa:
          </label>
          <br />
          <input
            type="text"
            disabled={!enabled}
            value={data.placa}
            className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
          />
        </div>

        <div className="lg:w-[30%] w-full">
          <label htmlFor="" className="text-gray-400">
            Kilometraje Real:
          </label>
          <br />
          <input
            type="text"
            onChange={handleInputChange}
            value={datosEdita.vehiculoKilometraje}
            name="vehiculoKilometraje"
            className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
          />
        </div>

        <div className="lg:w-[30%] w-full">
          <label htmlFor="" className="text-gray-400">
            Fecha / Hora:
          </label>
          <br />
          <input
            type="text"
            disabled={!enabled}
            value={FormtearFecha(data.fechaRegistro)}
            className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
          />
        </div>

        <div className="lg:w-[30%] md:w-[30%] w-full">
          <label htmlFor="" className="text-gray-400">
            Asesor:
          </label>
          <br />
          <select
            id="asesor"
            className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
          >
            <option value="">Elegir:</option>
            {asesores.length > 0 &&
              asesores.map((ase) => (
                <option value={parseInt(ase.id)} key={ase.id}>
                  {ase.nombres}
                </option>
              ))}
          </select>
        </div>

        <div className="lg:w-[30%] md:w-[30%] w-full">
          
        </div>


        <div className="flex justify-center w-full items-center mt-10">
          <button
            type="submit"
            className="flex items-center gap-2 mt-5 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <i className="fa-solid fa-floppy-disk"></i>
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};
