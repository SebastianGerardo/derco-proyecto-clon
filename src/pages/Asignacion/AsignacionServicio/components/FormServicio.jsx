import React, { useState } from "react";
import { NuevaUbicacion } from "../../../../helpers/ApiAsignacion";
import { Toast } from "../../../../components/Alertas/SweetAlex";

const FormServicio = ({ data, setIsOpen }) => {
    //const ordenServicios = data.ordenServicios.split(",");
    // console.log(ordenServicios);
    // let newOrden = ordenServicios.filter((item) => item !== data.ubicacion);
    
    const filtrados = data.ordenServicios.filter(item => item.terminado === 1);
      
    const [ubicacion, setUbicacion] = useState({
        ubicacion: "",
    });

  [ { nombre: 'Secado', terminado: 1 }, { nombre: 'Control de Calidad', terminado: 1 } ]

    const changeUbicacion = (e) => {
        setUbicacion({
            ...ubicacion,
            [e.target.name]: e.target.value,
        });
    };

    const nuevaUbicacion = (e) => {
        e.preventDefault();
        if (ubicacion.ubicacion === "") {
            Toast.fire({
                icon: "error",
                title: "Debe selecionar una Ubicacion",
            });
            return;
        } else {
            NuevaUbicacion(ubicacion, data.datosAsignadosId).then((res) => {
                if (res.statusCode === 200) {
                    Toast.fire({
                        icon: "success",
                        title: "Ubicacion cambiada correctamente",
                    });
                } else {
                    Toast.fire({
                        icon: "error",
                        title: "No se actualizo la ubicacion",
                    });
                }
            });
            setIsOpen(false);
        }

    }

    return (
        <form action="" onSubmit={nuevaUbicacion} className="space-y-2">
            {/* INPUTS DEL FORM - INICIO */}
            <div className="w-full lg:grid lg:grid-cols-2 lg:gap-x-4">
            
                <section className="w-full lg:w-full md:w-full ">

                    <InputBasic labelName={"OT"} pHolder={""} data={data.ot} />

                    <InputBasic labelName={"Nombre y Apellido"} pHolder={""} data={data.nombres} />

                    <InputBasic labelName={"Ubicación Actual"} pHolder={""} data={data.ubicacion} />

                </section>

                {/* LADO DERECHO */}
                <section className="w-full lg:w-full md:w-full">

                    <InputBasic labelName={'Tipo de Servicio:'} pHolder={''} data={JSON.parse(data.tipoServicio)?.nombre} />

                    <InputBasic labelName={"Placa:"} pHolder={""} data={data.placa} />
                    
                    <InputBasic labelName={"Nueva Ubicacion:"} pHolder={""} data={filtrados[1]?.nombre} />

                    {/* <div className="w-full">
                        <label htmlFor="" className="text-gray-400">
                            Nueva Ubicacion:
                        </label>
                        <br />
                        <select
                            name="ubicacion"
                            onChange={changeUbicacion}
                            className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
                        >
                            <option value="" disabled>Elegir</option>
                            {
                                data.ordenServicios.map((res) => (
                                    <option value={res.nombre}>{res.nombre}</option>
                                ))
                            }
                        </select>
                    </div> */}

                </section>
            </div>
            {/* LADO IZQUIERDO */}

            <div className="flex flex-col items-center justify-center w-full">

                <section className="flex lg:flex-row flex-row justify-center lg:items-end items-center md:flex-row">
                    <div className="flex justify-center w-full mt-1">
                        <button
                            type="submit"
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