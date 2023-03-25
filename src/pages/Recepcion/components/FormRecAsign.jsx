import { useContext, useEffect, useState } from "react";
import { Toast } from "../../../components/Alertas/SweetAlex";
import { UserContext } from "../../../context/ContextDerco";
import { editServicio } from "../../../helpers/ApiAnfitrion";
import { Asesores } from "../../../helpers/ApiUsuarios";


const FormRecAsign = ({ data, setIsOpen }) => {
  const { estadoData, setEstadoData } = useContext(UserContext);
  const [asesores, setAsesores] = useState([]);
  useEffect(() => {
    Asesores().then((use) => setAsesores(use.data));
  }, [])

  const reasignar = (e) => {
    e.preventDefault()
    let asesorRea = {
      asesor: {
        id: e.target.asesor.value
      }
    }
    console.log(data)
    editServicio(asesorRea, data.id).then(res => {
      if (res.statusCode === 200) {
        console.log(res)
        Toast.fire({
          icon: "success",
          title: "Servicio asignado correctamente",
        });
        setEstadoData(!estadoData)
        setIsOpen(false)
      } else {
        Toast.fire({
          icon: "error",
          title: "Ocurrir un error al asignar servicio",
        });
      }
    })
  }


  return (
    <form action="" className="flex justify-between flex-wrap space-y-2" onSubmit={reasignar}>
      <section className="w-full lg:w-full md:w-full">
        <section className="flex lg:flex-row flex-col md:flex-row justify-between">
          <div className="lg:w-[45%] md:w-[45%] w-full">
            <label htmlFor="" className="text-gray-400">
              Nombre {`&`} Apellido:
            </label>
            <br />
            <input
              type="text"
              placeholder="Aa1"
              className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
              value={data.nombres}
              disabled
            />
          </div>
          <div className="lg:w-[45%] md:w-[45%] w-full">
            <label htmlFor="" className="text-gray-400">
              Placa:
            </label>
            <br />
            <input
              type="text"
              placeholder="ABC123"
              className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
              disabled
              value={data.placa}
            />
          </div>
        </section>

        <section className="flex lg:flex-row flex-col md:flex-row justify-between">
          <div className="lg:w-[45%] md:w-[45%] w-full">
            <label htmlFor="" className="text-gray-400">
              Kilometraje Real:
            </label>
            <br />
            <input
              type="text"
              placeholder="5000"
              className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
              disabled
              value={data.vehiculoKilometraje}
            />
          </div>
          <div className="lg:w-[45%] md:w-[45%] w-full">
            <label htmlFor="" className="text-gray-400">
              Asignar Asesor:
            </label>
            <br />
            <select
              name="asesor"
              className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
            >
              <option >Elegir:</option>
              {
                asesores.length > 0 && (
                  asesores.map((ase) => (
                    <option value={parseInt(ase.id)} key={ase.id}>
                      {ase.nombres}
                    </option>
                  ))
                )
              }
            </select>
          </div>
        </section>
      </section>
      <div className="flex justify-center w-full mt-10">
        <button
          type="submit"
          className="flex items-center gap-2 mt-3 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <i className="fa-solid fa-floppy-disk"></i>
          Guardar
        </button>
      </div>
    </form>
  );
};

export default FormRecAsign;
