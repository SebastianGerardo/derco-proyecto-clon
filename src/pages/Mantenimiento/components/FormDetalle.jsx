import React, { useContext, useState } from "react";
import { Toast } from "../../../components/Alertas/SweetAlex";
import Timer from "../../../components/Cronometro/Timer";
import { InputBasic } from "../../../components/InputForms/InputBasic";
import { UserContext } from "../../../context/ContextDerco";
import { editServicio } from "../../../helpers/ApiAnfitrion";

const FormDetalle = ({ data, setIsOpen }) => {
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
            {/* INPUTS DEL FORM - INICIO */}
            <section className="flex flex-col gap-y-6">
                <div className="w-full lg:grid lg:grid-cols-4 lg:gap-x-4">

                        <InputBasic labelName={" Nro OT:"} pHolder={""} data={""} />

                        <InputBasic labelName={"Asesor"} pHolder={""} data={""} />

                        <InputBasic labelName={"Placa:"} pHolder={""} data={""} />

                        <InputBasic labelName={"Fecha / Hora de inicio:"} pHolder={""} data={""} />
                        
                        <InputBasic labelName={"Estado de Manteniminento:"} pHolder={""} data={""} />
                        
                        <InputBasic labelName={"Fecha / Hora de termino:"} pHolder={""} data={""} />

                </div>

                <div className="text-center border-2 rounded-md border-gray-300 p-2 max-h-[14rem] h-56 overflow-auto">
                    <table className="min-w-[52rem] max-h-[14rem]">
                        <thead>
                            <tr>
                                <th>OT</th>
                                <th>Estado de trabajo</th>
                                <th>Tiempos</th>
                                <th>Motivos de pausa</th>
                                <th>Comentarios Adicionales</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>Iniciar</td>
                                <td>10/10/23 10:34:00</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Pausar</td>
                                <td>10/10/23 10:34:00</td>
                                <td>Almuerzo</td>
                                <td>Almuerzo</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Reinicio</td>
                                <td>10/10/23 10:34:00</td>
                                <td>Inicia trabajo</td>
                                <td>Finaliza ok la unidad</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Finalizar</td>
                                <td>10/10/23 10:34:00</td>
                                <td>Inicia trabajo</td>
                                <td>Finaliza ok la unidad</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

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

export default FormDetalle;
