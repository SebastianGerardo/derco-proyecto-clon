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
  });
  const handleInputChange = (e) => {
    setDatosRegistro({
      ...datosRegistro,
      [e.target.name]: e.target.value,
    });
  };

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
      className="flex justify-between flex-wrap space-y-2"
      onSubmit={crearRistro}
    >
      <h1 className="font-black w-full text-lg ">Registrar Unidad</h1>
      <div className="lg:w-[45%] w-full">
        <label htmlFor="" className="text-gray-400">
          Nombres:
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
      <div className="lg:w-[45%] w-full">
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
      <div className="lg:w-[45%] md:w-[45%] w-full">
        <label htmlFor="" className="text-gray-400">
          Asignar Asesor:
        </label>
        <br />
        <select
          name="asesor"
          onChange={handleInputChange}
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
      <div className="lg:w-[45%] w-full">
        <label htmlFor="" className="text-gray-400">
          Kilometraje Actual:
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
