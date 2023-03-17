import React from "react";

const FormAlmacen = ({ data, setIsOpen }) => {
    return (
        <form action="" className="space-y-2">
            {/* INPUTS DEL FORM - INICIO */}
        <div className="w-full lg:grid lg:grid-cols-2 lg:gap-x-4">
        <section className="w-full lg:w-full md:w-full ">

            <InputBasic labelName={"OT"} pHolder={"ingresa el nombre"} data={data.nombre} />

            <InputBasic labelName={"Marca"} pHolder={"Citroen"} data={""} />

            <InputBasic labelName={"Kilometraje Real:"} pHolder={"5000"} data={""} />

            <div className="w-full">
                <label htmlFor="" className="text-gray-400">
                    Confirmacion de Picking:
                </label>
                <br />
                <select
                    name=""
                    id=""
                    className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
                >
                    <option value="">Elige:</option>
                    <option value="">Pendiente</option>
                    <option value="">Listo</option>
                </select>
            </div>

        </section>

            {/* LADO DERECHO */}
        <section className="w-full lg:w-full md:w-full">

            <InputBasic labelName={'Tipo de Servicio:'} pHolder={'Mantenimiento Flexible'} data={""} />

            <InputBasic labelName={"Placa:"} pHolder={"ABC123"} data={data.placa} />

            <InputBasic labelName={"Modelo:"} pHolder={"C4"} data={""} />

            <InputBasic labelName={"Fecha / Hora"} pHolder={"13/03/2023 02:25:PM"} data={""} />

        </section>
        <section className="lg:w-full w-full col-start-1 col-end-3">
                    <label htmlFor="" className="text-gray-400">
                        Detalles del servicio:
                    </label>
                    <br />
                    <textarea
                        type="text"
                        placeholder="Detalles..."
                        className="resize-none min-h-[6rem] w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
                    />
        </section>
        </div>
            {/* LADO IZQUIERDO */}
            
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
        </form>
    );
};

export default FormAlmacen;


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