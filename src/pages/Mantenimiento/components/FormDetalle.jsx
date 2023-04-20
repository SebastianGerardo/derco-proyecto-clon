import React, { useContext, useEffect, useState } from "react";
import { Toast } from "../../../components/Alertas/SweetAlex";
import Timer from "../../../components/Cronometro/Timer";
import { InputBasic, InputReadOnly } from "../../../components/InputForms/InputBasic";
import { UserContext } from "../../../context/ContextDerco";
import { editServicio } from "../../../helpers/ApiAnfitrion";
import { TraeDetalle } from "../../../helpers/ApiMantenimiento";

const FormDetalle = ({ data, setIsOpen }) => {
    const [detalle, setDetalle] = useState([])
    
    const enviarDatos = (e) =>{
        setIsOpen(false)
    }

    console.log(detalle)

    const estados = {
        "1": "Pendiente",
        "2": "En proceso",
        "3": "En pausa",
    }

    useEffect(() => {
        TraeDetalle(data.id).then((resp) => {
            setDetalle(resp.data)
        })
    }, [])

    return (
        <form action="" className="space-y-2" onSubmit={enviarDatos}>
            {/* INPUTS DEL FORM - INICIO */}
            <section className="flex flex-col gap-y-6">
                <div className="w-full lg:grid lg:grid-cols-4 lg:gap-x-4">

                        <InputReadOnly labelName={" Nro OT:"} pHolder={""} data={data.servicio.ot} />

                        <InputReadOnly labelName={"Asesor"} pHolder={""} data={`${data.elevador.tecnico.nombres.split(" ", 1)} ${data.elevador.tecnico.apellidos.split(" ", 1)}`} />

                        <InputReadOnly labelName={"Placa:"} pHolder={""} data={data.servicio.placa} />

                        <InputReadOnly labelName={"Fecha / Hora de inicio:"} pHolder={""} data={""} />
                        
                        <InputReadOnly labelName={"Estado de Manteniminento:"} pHolder={""} data={estados[data.estado]} />
                        
                        <InputReadOnly labelName={"Fecha / Hora de termino:"} pHolder={""} data={""} />

                </div>

                <div className="text-center border-2 rounded-md border-gray-300 p-2 max-h-[14rem] h-56 overflow-auto">
                    <table className="min-w-[52rem] max-h-[14rem]">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Estado de trabajo</th>
                                <th>Tiempos</th>
                                <th>Motivos de pausa</th>
                                <th>Comentarios Adicionales</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                detalle.length > 0 && detalle.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index+1}</td>
                                        <td>{item.estado}</td>
                                        <td>{item.tiempo}</td>
                                        <td>{item.motivo}</td>
                                        <td>{item.comentario}</td>
                                    </tr>
                                ))
                            }
                            {/* <tr>
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
                            </tr> */}
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
                            Cerrar
                        </button>
                    </div>
                </section>
            </div>
        </form>
    );
};

export default FormDetalle;
