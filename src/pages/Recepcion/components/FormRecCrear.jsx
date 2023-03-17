import React from "react";
import { useEffect, useState } from "react";
import { Switch } from '@headlessui/react'

const FormRecCrear = ({ data, setIsOpen }) => {
    const [fecha, setFecha] = useState("");
      const [estado, setEstado] = useState("")

    const [enabled, setEnabled] = useState(false)
    const [hora, setHora] = useState(false)
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
    }, [hora === true]);

    return (
        <form action="" className="flex justify-between flex-wrap space-y-2">
            {/* INPUTS DEL FORM - INICIO */}

            {/* LADO IZQUIERDO */}
            <section className="w-full lg:w-[49%] md:w-[49%] ">
                <section className="flex lg:flex-row flex-col md:flex-row justify-between">

                    <InputBasic labelName={"Nombres & Apellidos"} pHolder={"ingresa el nombre"} data={data.nombre} />

                    <InputBasic labelName={"Teléfono / Celular:"} pHolder={"Aa1"} data={""} />

                </section>

                <section className="flex lg:flex-row flex-col md:flex-row justify-between">
                    <div className="lg:w-[45%] md:w-[45%] w-full">
                        <label htmlFor="" className="text-gray-400">
                            Email:
                        </label>
                        <br />
                        <input
                            type="text"
                            placeholder="Aa1"
                            className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
                        />
                    </div>

                    <InputBasic labelName={"Placa:"} pHolder={"ABC123"} data={data.placa} />
                    
                </section>

                <section className="flex lg:flex-row flex-col md:flex-row justify-between">

                    <div className="lg:w-[45%] md:w-[45%] w-full">
                        <label htmlFor="" className="text-gray-400">
                            Marca:
                        </label>
                        <br />
                        <select
                            disabled={!enabled}
                            name=""
                            id=""
                            className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
                        >
                            <option value="">Elige:</option>
                            <option value="">Si</option>
                            <option value="">No</option>
                        </select>
                    </div>

                    <InputBasic labelName={"Modelo:"} pHolder={"Aa1"} data={""} />

                </section>

                <section className="flex lg:flex-row flex-col md:flex-row justify-between">
                    <InputBasic labelName={"Kilometraje Real:"} pHolder={"5000"} data={""} />

                    <InputBasic labelName={"Servicio solicitado:"} pHolder={"Mantenimiento express..."} data={""} />
                </section>

                <section className="flex lg:flex-row flex-col justify-between">
                    <div className="lg:w-full w-full">
                        <label htmlFor="" className="text-gray-400">
                            Detalles del servicio:
                        </label>
                        <br />
                        <textarea
                            disabled={!enabled}
                            type="text"
                            placeholder="Detalles..."
                            className="resize-none w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
                        />
                    </div>
                </section>

            </section>

            {/* LADO DERECHO */}
            <section className="w-full lg:w-[49%] md:w-[49%]">
                <section className="flex lg:flex-row md:flex-row flex-col justify-between">
                    <div className="lg:w-[45%] md:w-[45%] w-full">
                        <label htmlFor="" className="text-gray-400">
                            Nro OT:
                        </label>
                        <br />
                        <input
                            type="text"
                            placeholder="ABC123"
                            className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
                        />
                    </div>

                    <div className="lg:w-[45%] md:w-[45%] w-full">
                        <label htmlFor="" className="text-gray-400">
                            Tipo Servicio
                        </label>
                        <br />
                        <select
                            name=""
                            id=""
                            className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
                        >
                            <option value="">Elegir:</option>
                            <option value="">Mantención Flexible</option>
                        </select>
                    </div>

                    

                </section>

                <section className="grid grid-cols-2 gap-x-3">

                    <div className="w-full row-start-1 row-end-2">
                        <label htmlFor="" className="text-gray-400">
                            Hora Estimada de entrega:
                        </label>
                        <br />
                        <select
                            name=""
                            id=""
                            className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
                        >
                            <option value="">Elegir:</option>
                            <option value="">2:15</option>
                            <option value="">2:30</option>
                            <option value="">2:45</option>
                            <option value="">3:00</option>
                            <option value="">3:15</option>
                        </select>
                    </div>

                    <div className="w-full row-start-3 row-end-[-1]">
                        <label htmlFor="" className="text-gray-400">
                            Adicionales
                        </label>
                        <br />
                        <div className="flex flex-col justify-start">
                            <label className="p-1 flex items-center ">
                            <input
                                className="w-5 h-5 appearance-none border rounded-md transition-all duration-200 ease-out checked:bg-green-500"
                                type="checkbox"
                                checked={estado === "Pendiente"}
                                onChange={() => setEstado(estado === "Pendiente" ? false : "Pendiente")}
                            />
                            <span className="ml-1">Pendiente</span>
                            </label>
                            <label className="p-1 flex items-center ">
                            <input
                                className="w-5 h-5 appearance-none border rounded-md transition-all duration-200 ease-out checked:bg-green-500"
                                type="checkbox"
                                checked={estado === "Listo"}
                                onChange={() => setEstado(estado === "Listo" ? false : "Listo")}
                            />
                            <span className="ml-1">Listo</span>
                            </label>
                        </div>
                    </div>

                    <div className="lg:w-full w-full row-start-2 row-end-3">
                        <label htmlFor="" className="text-gray-400">
                            Comentarios del cliente:
                        </label>
                        <br />
                        <textarea
                            type="text"
                            placeholder="Comentarios del cliente"
                            className="resize-none w-full border border-gray-300 h-24 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
                        />
                    </div>

                </section>

                <section className="flex lg:flex-row flex-row justify-center lg:items-end items-center md:flex-row">
                    <div className="flex justify-center w-full mt-10">
                    <button
                        type="button"
                        className="flex items-center gap-2  justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={() => setHora(true)}
                    >
                        <i className="fa-solid fa-floppy-disk"></i>
                        Guardar
                    </button>
                    </div>
                </section>
            </section>
        </form>
    );
};

export default FormRecCrear;


// INPUTS PREESTABLECIDOS:

export const InputBasic = ({ pHolder, data, labelName }) => {
    const [enabled, setEnabled] = useState(false)

    return (
        <div className="lg:w-[45%] md:w-[45%] w-full">
            <label htmlFor="" className="text-gray-400">
                {labelName}
            </label>
            <br />
            <input
                value={data}
                disabled={!enabled}
                type="text"
                placeholder={pHolder}
                className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
            />
        </div>
    )
}


// COSAS POR MEJORAR:

    //FALTA REUTILIZAR MÁS CÓDIGO, A ESPERA DE LA DATA...

{/* <div className="ml-3 mt-[1.9rem] md:mt-[3rem] flex items-center">

<Switch
    checked={enabled}
    onChange={setEnabled}
    className={`${enabled ? 'bg-green-500' : 'bg-red-500'}
relative inline-flex h-6 w-[3rem] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
>
    <span className="sr-only">Use setting</span>
    <span
        aria-hidden="true"
        className={`${enabled ? 'translate-x-6' : 'translate-x-0'}
    pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
    />
</Switch>
<label htmlFor="" className="ml-1 text-gray-400 min-w-[4.5rem]">
    {enabled ? "Salida" : "Sin Salida"}
</label>
</div> */}