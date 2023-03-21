import React, {useState} from "react";

const FormServicio = ({ data, setIsOpen }) => {
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
        <form action="" className="space-y-2">

            {/* INPUTS DEL FORM - INICIO */}
        <div className="w-full lg:grid lg:grid-cols-3 lg:gap-x-4">

            {/* LADO DERECHO */}
        <section className="w-full lg:w-full md:w-full ">

            <InputBasic labelName={"OT"} pHolder={"ingresa el nombre"} data={"12121212"} />

            <InputBasic labelName={"Nombre & Apellido"} pHolder={"ingresa el nombre"} data={data.nombre} />

            <InputBasic labelName={"Marca"} pHolder={"Citroen"} data={""} />

            <InputBasic labelName={"Kilometraje:"} pHolder={"5000"} data={""} />

            <InputBasic labelName={"Asesor:"} pHolder={"Marcos Reyes"} data={""} />

            <section className="lg:w-full w-full">
                    <label htmlFor="" className="text-gray-400">
                        Comentarios del cliente:
                    </label>
                    <br />
                    <textarea
                        type="text"
                        placeholder="Detalles..."
                        className="resize-none min-h-[6rem] w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
                    />
            </section>

        </section>

                    {/* LADO IZQUIERDO */}
        <section className="w-full lg:w-full md:w-full">

            <InputBasic labelName={'Tipo de Servicio:'} pHolder={'Mantenimiento Flexible'} data={""} />

            <InputBasic labelName={"Placa:"} pHolder={"ABC123"} data={data.placa} />

            <InputBasic labelName={"Modelo:"} pHolder={"C4"} data={""} />

            <InputBasic labelName={"Hora estimada de entrega:"} pHolder={"13/03/2023 02:25:PM"} data={""} />

            <div className="w-full">
                <label htmlFor="" className="text-gray-400">
                    Técnico Mecánico:
                </label>
                <br />
                <select
                    name=""
                    id=""
                    className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
                >
                    <option value="">Elige:</option>
                    <option value="">Guillermo Sifuentes</option>
                    <option value="">Martin Rios</option>
                </select>
            </div>
            <InputBasic labelName={"Elevador"} pHolder={"1"} data={""} />
        </section>

            <section className="lg:grid">
                <div>
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
                                
                    <div className="flex flex-col overflow-y-auto w-[90%] mx-auto h-32">
                        {seleccionadas.map((opcion) => (
                        <div className="flex items-center text-left" key={opcion}>
                            <div
                            className="mt-1 rounded-sm relative w-4 h-4 mr-1 text-gray-500 hover:text-white hover:bg-red-500 hover:border-red-500 cursor-pointer border border-gray-400 border-solid flex items-center justify-center" 
                            onClick={() => eliminarOpcionSeleccionada(opcion)}
                            >
                                <h1 className="font-bold ">
                                    x   
                                </h1>
                            </div>
                            <span>{opcion}</span>
                        </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center w-full">
                    <section className="flex lg:flex-row flex-row justify-center lg:items-end items-center md:flex-row">
                        <div className="flex justify-center w-full mt-1">
                        <button
                            type="button"
                            className="flex items-center gap-2 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                            <i className="fa-solid fa-floppy-disk"></i>
                            Guardar
                        </button>
                        </div>
                    </section>
                </div>
            </section>
        </div>

            

        </form>
    );
};

export default FormServicio;


// INPUTS PREESTABLECIDOS:

export const InputBasic = ({ pHolder, data, labelName }) => {
    return (
        <div className="w-full">
            <label htmlFor="" className="text-gray-400">
                {labelName}
            </label>
            <br />
            <input
                value={data}
                disabled
                type="text"
                placeholder={pHolder}
                className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
            />
        </div>
    )
}
