import { Switch } from "@headlessui/react";
import { useState } from "react";
export const FromAnfitrion = ({ data }) => {
  const [enabled, setEnabled] = useState(false);
  console.log(data);
  return (
    <>
      {data !== undefined ? (
        <div>
          <div className="flex justify-between items-center">
            <p className="font-black text-xl">Registrar ingreso de unidad</p>
            <div className="flex gap-3 items-center">
              <p>Editar Unidad:</p>
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${enabled ? "bg-blue-600" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  className={`${enabled ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
          </div>
          <form
            action=""
            className="flex pt-3 justify-between items-center flex-wrap space-y-2"
          >
            <div className="lg:w-[45%] w-full">
              <label htmlFor="" className="text-gray-400">
                Nombre:
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
            <div className="lg:w-[45%] w-full">
              <label htmlFor="" className="text-gray-400">
                Mantenimiento:
              </label>
              <br />
              <input
                type="text"
                value={data.servicio}
                disabled={!enabled}
                className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
              />
            </div>
            <div className="lg:w-[45%] w-full">
              <label htmlFor="" className="text-gray-400">
                Kilometraje Real:
              </label>
              <br />
              <input
                type="text"
                className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
              />
            </div>
            <div className="lg:w-[45%] w-full">
              <label htmlFor="" className="text-gray-400">
                Confirmacion de cita:
              </label>
              <br />
              <select name="" id="" className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none">
                <option value="">Elegir:</option>
                <option value="">Si</option>
                <option value="">No</option>
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
            <div className="lg:w-[45%] w-full">
              <label htmlFor="" className="text-gray-400">
                Asignar Asesor:
              </label>
              <br />
              <select name="" id="" className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none">
                <option value="">Elegir:</option>
                <option value="">Juan Martinez</option>
                <option value="">Elias Davila</option>
              </select>
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
      ) : (
        <>Wneas</>
      )}
    </>
  );
};
