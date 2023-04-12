import React, { useContext, useState } from "react";
import { Toast } from "../../../components/Alertas/SweetAlex";
import Timer from "../../../components/Cronometro/Timer";
import { editServicio } from "../../../helpers/ApiAnfitrion";

const FormControlCalidad = ({ data, setIsOpen }) => {
    const [datosAlmacen, setDatosAlamacen] = useState({
        comentarioAlmacen: "",
    })

    const captura = (e) => {
        setDatosAlamacen({
            ...datosAlmacen,
            [e.target.name]: e.target.value,
        });
    }
    const enviarDatos = (e) =>{
        e.preventDefault()
        // editServicio(datosAlmacen, data.id).then(res => {
        //     if (res.statusCode === 200) {
        //       Toast.fire({
        //         icon: "success",
        //         title: "Dato guardado correctamente",
        //       });
        //       setEstadoData(!estadoData)
        //       setIsOpen(false)
        //     } else {
        //       Toast.fire({
        //         icon: "error",
        //         title: "Ocurrir un error al guardar dato",
        //       });
        //     }
        //   })
        setIsOpen(false)
    }

    return (
        <form action="" className="space-y-2" onSubmit={enviarDatos}>
            <div className="flex justify-around py-4 bg-[#D9D9D9] flex-wrap gap-2">
                <h2 className="font-bold">
                    OT: <span>{data.ot}</span>
                </h2>
                <h2 className="font-bold">
                    PLACA: <span>{data.placa}</span>    
                </h2>
                <h2 className="font-bold">
                    ASESOR: <span>{data.asesor}</span>
                </h2>
            </div>
            <div className="flex flex-col gap-6 p-5">
                <Timer />
                <div className="w-full lg:grid lg:grid-cols-2 lg:gap-x-4">
                    <section className="lg:w-full w-full col-start-1 col-end-3">
                        <label htmlFor="" className="text-gray-400">
                            Comentarios Adicionales:
                        </label>
                        <br />
                        <textarea
                            type="text"
                            name= "comentarioAlmacen"
                            value={datosAlmacen.comentarioAlmacen}
                            onChange={captura}
                            placeholder="Detalles..."
                            className="resize-none min-h-[6rem] w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
                        />
                    </section>
                </div>
                <div className="flex flex-col mt-4 items-center justify-center w-full">

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
            </div>
            {/* INPUTS DEL FORM - INICIO */}
        </form>
    );
};

export default FormControlCalidad;
