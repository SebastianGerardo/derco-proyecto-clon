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

    const opciones = ["Opción 1", "Opción 2", "Opción 3", "Opción 4"];

    const [seleccionadas, setSeleccionadas] = useState([]);

    function agregarOpcionSeleccionada(e) {
        const opcion = e.target.value;
        if (!seleccionadas.includes(opcion)) {
            setSeleccionadas([...seleccionadas, opcion]);
        }
    }

    function eliminarOpcionSeleccionada(opcion) {
        setSeleccionadas(seleccionadas.filter((o) => o !== opcion));
    }

    return (
        <form action="" className="flex flex-col lg:grid grid-cols-2 gap-3">
            {/* INPUTS DEL FORM - INICIO */}

            {/* LADO IZQUIERDO */}
            <section className="w-full lg:grid lg:grid-cols-2 md:grid gap-2">
                <section>
                    <InputBasic labelName={"Nombres & Apellidos"} pHolder={"ingresa el nombre"} data={data.nombre} />

                    <InputBasic labelName={"Email:"} pHolder={"Aa1"} data={""} />
                    
                    {/* Marca */}
                    <div className="w-full">
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

                    <InputBasic labelName={"Kilometraje Real:"} pHolder={"5000"} data={""} />

                </section>
                <section>
                    <InputBasic labelName={"Teléfono / Celular:"} pHolder={"Aa1"} data={""} />

                    <InputBasic labelName={"Placa:"} pHolder={"ABC123"} data={data.placa} />

                    <InputBasic labelName={"Modelo:"} pHolder={"Aa1"} data={""} />
                    
                    <InputBasic labelName={"Servicio solicitado:"} pHolder={"Mantenimiento express..."} data={""} />
                </section>

                <section className="flex lg:flex-row flex-col justify-between col-start-1 col-end-3">
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
            <section className="w-full">
                
                {/* NUMERO OT */}
                <section className="lg:grid lg:grid-cols-2 md:grid md:grid-cols-2 gap-2 lg:gap-2 md:gap2">

                    <div className="w-full">
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

                    <div className="w-full">
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

                    <section className="flex flex-col relative">
                        <div className="w-full row-start-1 row-end-2">
                            <label htmlFor="" className="text-gray-400">
                                    Adicionales:
                            </label>
                            <select className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none" onChange={agregarOpcionSeleccionada}>
                                <option value="">Seleccione una opción</option>
                                {opciones.map((opcion) => (
                                <option key={opcion} value={opcion}>
                                    {opcion}
                                </option>
                                ))}
                            </select>
                        </div>
                    </section>
                    
                    <div className="flex flex-col overflow-y-auto h-32">
                        {seleccionadas.map((opcion) => (
                         <div className="flex text-left ml-4" key={opcion}>
                            <div className="w-4 h-4 cursor-pointer" onClick={() => eliminarOpcionSeleccionada(opcion)}> X </div>
                            <span>{opcion}</span>
                         </div>
                        ))}
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
        <div className="w-full">
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
