import React from "react";
import { useEffect, useState } from "react";
import { Switch } from '@headlessui/react'

const FormRecEdit = ({data}) => {
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
    <form action="" className="flex justify-between flex-wrap space-y-2">
        {/* TITULO DEL FORMULARIO */}
        <h1 className="font-black w-full text-lg opacity-55">Registrar Usuario</h1>

        {/* INPUTS DEL FORM - INICIO */}

            {/* LADO IZQUIERDO */}
        <section className="w-full lg:w-[49%] md:w-[49%] ">
            <section className="flex lg:flex-row flex-col md:flex-row justify-between">

                <InputBasic labelName={"Nombres:"} pHolder={"ingresa el nombre"} data={data.nombre}/>

                <InputBasic labelName={"Apellidos:"} pHolder={"Aa1"} data={""}/>
                
            </section>

            <section className="flex lg:flex-row flex-col md:flex-row justify-between">
                <InputBasic labelName={"Email:"} pHolder={"Aa1"} data={""}/>

                <InputBasic labelName={"Teléfono:"} pHolder={"923.."} data={""}/>
            </section>

            <section className="flex lg:flex-row flex-col md:flex-row justify-between">
                
                <div className="lg:w-[45%] md:w-[45%] w-full">
                    <label htmlFor="" className="text-gray-400">
                        Marca:
                    </label>
                    <br />
                    <select
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
                <InputBasic labelName={"Placa:"} pHolder={"ABC123"} data={data.placa} />
                
                <InputBasic labelName={"Kilometraje Real:"} pHolder={"5000"} data={""}/>
            </section>    

            <div className="lg:w-full w-full">
                <label htmlFor="" className="text-gray-400">
                Servicio Solicitado::
                </label>
                <br />
                <select
                name=""
                id=""
                className=" w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
                >
                <option value="">Elegir:</option>
                <option value="">Mantenimiento</option>
                <option value="">Lavado</option>
                </select>
            </div>


            <section className="flex lg:flex-row flex-col justify-between">
                <div className="lg:w-full w-full">
                    <label htmlFor="" className="text-gray-400">
                    Detalles:
                    </label>
                    <br />
                    <textarea
                    type="text"
                    placeholder="Detalles del servicio"
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
                    Hora de Entrega:
                    </label>
                    <br />
                    <input
                    type="text"
                    placeholder="5000"
                    className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
                    />
                </div>
            </section>

            <section className="flex lg:flex-row md:flex-row flex-col justify-between">
                <div className="lg:w-[45%] md:w-[45%] w-full">
                    <label htmlFor="" className="text-gray-400">
                    Tipo Servicio:
                    </label>
                    <br />
                    <select
                    name=""
                    id=""
                    className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
                    >
                    <option value="">Elegir:</option>
                    <option value="">Si</option>
                    <option value="">No</option>
                    </select>
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

            <section className="flex lg:flex-row flex-col justify-between">
                <div className="lg:w-full w-full">
                    <label htmlFor="" className="text-gray-400">
                    Comentarios:
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
                <div className="lg:w-[45%] md:w-[45%] w-[45%]">
                                <label htmlFor="" className="text-gray-400">
                                Hora de Registro:
                                </label>
                                <br />
                                <input
                                type="text"
                                placeholder="5000"
                                value={fecha}
                                disabled
                                className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
                                />
                </div>

                <div className="ml-3 mt-[1.9rem] md:mt-[3rem] flex items-center">
                    
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
                </div>
            </section>
        </section>

        {/* INPUTS DEL FORM - FIN */}

        {/* BOTONES */}

        <div className="flex justify-center w-full mt-10">

            <button
            type="button"
            className="flex items-center gap-2  justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
            <i className="fa-solid fa-floppy-disk"></i>
            Guardar
            </button>

            

        </div>

    </form>
  );
};

export default FormRecEdit;


// INPUTS PREESTABLECIDOS:

export const InputBasic = ({pHolder, data, labelName}) => {
  const [enabled, setEnabled] = useState(false)
  
  return(
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