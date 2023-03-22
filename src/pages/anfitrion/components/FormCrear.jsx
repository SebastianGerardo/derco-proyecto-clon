import { useContext, useEffect, useState } from "react";
import { Toast } from "../../../components/Alertas/SweetAlex";
import { UserContext } from "../../../context/ContextDerco";
import { crearServicio } from "../../../helpers/ApiAnfitrion";
import { Asesores } from "../../../helpers/ApiUsuarios";

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
    asesor: "",
    estado: ""
  });
  const handleInputChange = (e) => {
    setDatosRegistro({
      ...datosRegistro,
      [e.target.name]: e.target.value,
    });
  };
  /*CAMBIAR EL ERROR*/
  const crearRistro = (e) => {
    let datosFormateados = []
    datosFormateados.push(datosRegistro)
    e.preventDefault();
    crearServicio(datosFormateados).then((res) => {
      if (res.statusCode === 200) {
        Toast.fire({
          icon: "success",
          title: "Usuario Creado Exitosamente",
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
    <form
      action=""
      className="flex justify-between flex-wrap space-y-2 p-5 w-full"
      onSubmit={crearRistro}
    >
      <div className="lg:w-full flex flex-col lg:flex-row items-start lg:items-center w-full">
            <label htmlFor="" className="inline-block min-w-[12rem] text-gray-400">
              Buscar datos de la unidad:
            </label>
          <div className="w-full flex p-2 items-center gap-3 border-2 rounded-md border-gray-400 focus-within:border-red-500 focus-within:text-black">
            <img src="/img/search.gif" alt="" width={30} />
            <input
              type="text"
              className="outline-none w-full"
              // value={placa}
              // onChange={(e) => capturarPlaca(e)}
              placeholder="Buscar por placa"
            />
          </div>
        </div>

      <div className="w-full lg:grid lg:grid-cols-3 lg:gap-3">
        <section>
          <div className="w-full">
            <label htmlFor="" className="text-gray-400">
              Nombre {`&`} Apellido:
            </label>
            <br />
            <input
              type="text"
              name="nombres"
              onChange={handleInputChange}
              placeholder="Juan Perez"
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
              value="10-03-2023 10:09AM"
              className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
            />
          </div>

        </section>
        
        <section>
          <div className="w-full">
            <label htmlFor="" className="text-gray-400">
              Placa:
            </label>
            <br />
            <input
              type="text"
              name="placa"
              onChange={handleInputChange}
              placeholder="ABC123"
              className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
            />
          </div>

          <div className="w-full">
            <label htmlFor="" className="text-gray-400">
              Asignar Asesor:
            </label>
            <br />
            <select
              name="asesor"
              onChange={handleInputChange}
              className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
            >
              <option value="" disabled>Elegir:</option>
              {asesores.length > 0 &&
                asesores.map((ase) => (
                  <option value={parseInt(ase.id)} key={ase.id}>
                    {ase.nombres}
                  </option>
                ))}
            </select>
          </div>
        </section>

        <section>
          <div className="w-full">
            <label htmlFor="" className="text-gray-400">
              Kilometraje Real:
            </label>
            <br />
            <input
              name="vehiculoKilometraje"
              type="text"
              onChange={handleInputChange}
              placeholder="5000"
              className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
            />
          </div>

          <div className="w-full">
            <label htmlFor="" className="text-gray-400">
              Estado:
            </label>
            <br />
            <select
              name="estado"
              onChange={handleInputChange}
              className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
            >
              <option value="">Elegir:</option>
              <option value="0">No Asignado</option>
              <option value="1">Pendiente</option>
              <option value="2">Asignado</option>
            </select>
          </div>          
        </section>
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
  );
};
