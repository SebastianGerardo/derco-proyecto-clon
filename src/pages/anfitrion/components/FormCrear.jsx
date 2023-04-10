import { useContext, useEffect, useState } from "react";
import { Toast } from "../../../components/Alertas/SweetAlex";
import { UserContext } from "../../../context/ContextDerco";
import { crearServicio } from "../../../helpers/ApiAnfitrion";
import { Asesores } from "../../../helpers/ApiUsuarios";
import { FormtearFecha } from "../../../helpers/funcions";
import { BuscarPlaca } from "./BuscarPlaca";

export const FormCrear = ({ setIsOpen }) => {
  const { estadoData, setEstadoData } = useContext(UserContext);
  const [asesores, setAsesores] = useState([]);
  useEffect(() => {
    Asesores().then((use) => setAsesores(use.data));
  }, []);

  const [datosRegistro, setDatosRegistro] = useState({
    nombres: "",
    placa: "",
    vehiculoKilometraje: "",
    asesor: { id: "" },
    estado: "2",
    tipoCita: "S",
    fechaEntrada: new Date()
  });

  const handleInputChange = (e) => {
    setDatosRegistro({
      ...datosRegistro,
      [e.target.name]: e.target.value,
    });
  };

  const handleAsesorChange = (e) => {
    const { value } = e.target;
    setDatosRegistro({ ...datosRegistro, asesor: { id: value } });
  };
  /*CAMBIAR EL ERROR*/
  const crearRistro = (e) => {
    let datosFormateados = []
    e.preventDefault();
    datosFormateados.push(datosRegistro)
    crearServicio(datosFormateados).then((res) => {
      if (res.statusCode === 200) {
        Toast.fire({
          icon: "success",
          title: "Cliente Creado Exitosamente",
        });
        setIsOpen(false);
        setEstadoData(!estadoData);
      } else {
        Toast.fire({
          icon: "error",
          title: "No se creo el usuario correctamente",
        });
      }
    });
  };
  return (

    <>
      <BuscarPlaca  setDatosRegistro={setDatosRegistro}/>
      <form
        action=""
        className="flex justify-between flex-wrap space-y-2 p-5 pt-0 w-full"
        onSubmit={crearRistro}
      >

        <div className="w-full lg:grid lg:grid-cols-3 lg:gap-3">
            <div className="w-full">
              <label htmlFor="" className="text-gray-400">
                Nombre {`&`} Apellido:
              </label>
              <br />
              <input
                type="text"
                name="nombres"
                value={datosRegistro.nombres}
                onChange={handleInputChange}
                placeholder="Juan Perez"
                required
                className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
              />
            </div>

            <div className="w-full">
              <label htmlFor="" className="text-gray-400">
                Placa:
              </label>
              <br />
              <input
                type="text"
                name="placa"
                required 
                value={datosRegistro.placa}
                onChange={handleInputChange}
                placeholder="ABC123"
                className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
              />
            </div>

            <div className="w-full">
              <label htmlFor="" className="text-gray-400">
                Kilometraje Real:
              </label>
              <br />
              <input
                name="vehiculoKilometraje"
                type="text"
                required 
                pattern="[0-9]*"
                title="Este campo solo acepta NUMEROS"
                value={datosRegistro.vehiculoKilometraje}
                onChange={handleInputChange}
                placeholder="5000"
                className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
              />
            </div>

            <div className="w-full">
              <label htmlFor="" className="text-gray-400">
                Fecha / Hora:
              </label>
              <br />
              <input
                type="text"
                disabled
                // value={FormtearFecha(data.fechaRegistro)}
                value={`${FormtearFecha(new Date())}`}
                className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
              />
            </div>

            <div className="w-full">
              <label htmlFor="" className="text-gray-400">
                Asesor:
              </label>
              <br />
              <select
                name="asesor"
                onChange={handleAsesorChange}
                required 
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
    </>

  );
};
