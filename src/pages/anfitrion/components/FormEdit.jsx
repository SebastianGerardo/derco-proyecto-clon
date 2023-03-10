import { Switch } from "@headlessui/react";
import { useState } from "react";

export const FormEdit = ({data}) => {
  const [enabled, setEnabled] = useState(false);
  return (
    <div>
      <form
        action=""
        className="flex pt-3 justify-between items-center flex-wrap space-y-2"
      >
        <div className="lg:w-[45%] w-full">
          <label htmlFor="" className="text-gray-400">
            Nombres:
          </label>
          <br />
          <input
            type="text"
            value={data.nombre}
            disabled={!enabled}
            className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
          />
        </div>
        <div className="lg:w-[45%] w-full">
          <label htmlFor="" className="text-gray-400">
            Apellidos:
          </label>
          <br />
          <input
            type="text"
            value={data.apellido}
            disabled={!enabled}
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
            disabled={!enabled}
            value={data.placa}
            className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
          />
        </div>
        <div className="lg:w-[45%] md:w-[45%] w-full">
                    <label htmlFor="" className="text-gray-400">
                    Asignar Asesor:
                    </label>
                    <br />
                    <select
                    name=""
                    id=""
                    className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
                    >
                    <option value="">Elegir:</option>
                    <option value="">Juan Perez</option>
                    <option value="">Guillermo Sifuente</option>
                    </select>
                </div>
        
        <div className="lg:w-[45%] w-full">
          <label htmlFor="" className="text-gray-400">
            Kilometraje Actual:
          </label>
          <br />
          <input
            type="text"
            className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
          />
        </div>
        
        <div className="lg:w-[45%] md:w-[45%] w-full">
          <label htmlFor="" className="text-gray-400">
          Estado
          </label>
          <br />
          <select
          name=""
          id=""
          className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
          >
          <option value="">Elegir:</option>
          <option value="">Pendiente</option>
          <option value="">Asistió</option>
          <option value="">No asistió</option>
          </select>
        </div>

        <div className="lg:w-[45%] w-full">
          <label htmlFor="" className="text-gray-400">
            Fecha de ingreso:
          </label>
          <br />
          <input
            type="text"
            disabled={!enabled}
            value="17/02/2023 10:23 AM  "
            className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
          />
        </div>
        <div className="flex justify-center w-full items-center mt-10">
          <button
            type="button"
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
