import React from "react";
import { useEffect, useState } from "react";
import { Switch } from '@headlessui/react'

const FormRecAsign = () => {
  const [fecha, setFecha] = useState("");
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    let date = new Date();
    const dateFinal = date.toLocaleDateString("en-US");
    setFecha(
      dateFinal +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds()
    );
  }, []);

  return (
    <form action="" className="flex justify-between flex-wrap space-y-2 ">
        {/* INPUTS DEL FORM  */}

            {/* LADO IZQUIERDO */}
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

            </section>


        </section>
        
        {/* BOTONES */}

        <div className="flex justify-center w-full mt-10">

            <button
            type="button"
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
