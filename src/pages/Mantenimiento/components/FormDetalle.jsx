import React, { useContext, useEffect, useState } from "react";
import { Toast } from "../../../components/Alertas/SweetAlex";
import Timer from "../../../components/Cronometro/Timer";
import { InputBasic, InputReadOnly } from "../../../components/InputForms/InputBasic";
import { UserContext } from "../../../context/ContextDerco";
import { editServicio } from "../../../helpers/ApiAnfitrion";
import { TraeDetalle } from "../../../helpers/ApiMantenimiento";
function formatDate(isoString) {
    const date = new Date(isoString);
    // restar 5 horas para obtener la hora en Perú (UTC-5)
    date.setHours(date.getHours() - 5);
    const options = {
        timeZone: 'America/Lima',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const formattedDate = new Intl.DateTimeFormat('es-PE', options).format(date);
    return formattedDate;
}

const FormDetalle = ({ data, setIsOpen }) => {
    const [detalle, setDetalle] = useState([])

    const enviarDatos = (e) => {
        setIsOpen(false)
    }

    const estados = {
        "1": "Pendiente",
        "2": "En proceso",
        "3": "En pausa",
    }

    useEffect(() => {
        TraeDetalle(data.id).then((resp) => {
            setDetalle(resp.data)
            setBloqueoCor(resp.data)
        })
    }, [])
    const traeFecha = (valor) => {
        const dato = detalle.find((res) => res.estado === valor)
        if(dato !== undefined){
            return formatDate(dato?.tiempo)
        } 
    }


    return (
        <form action="" className="space-y-2" onSubmit={enviarDatos}>
            {/* INPUTS DEL FORM - INICIO */}
            <section className="flex flex-col gap-y-6">
                <div className="w-full lg:grid lg:grid-cols-4 lg:gap-x-4">

                    <InputReadOnly labelName={" Nro OT:"} pHolder={""} data={data.servicio.ot} />

                    <InputReadOnly labelName={"Asesor"} pHolder={""} data={`${data.elevador.tecnico.nombres.split(" ", 1)} ${data.elevador.tecnico.apellidos.split(" ", 1)}`} />

                    <InputReadOnly labelName={"Placa:"} pHolder={""} data={data.servicio.placa} />

                    <InputReadOnly labelName={"Fecha / Hora de inicio:"} pHolder={""} data={traeFecha("Iniciar")} />

                    <InputReadOnly labelName={"Estado de Manteniminento:"} pHolder={""} data={estados[data.estado]} />

                    <InputReadOnly labelName={"Fecha / Hora de termino:"} pHolder={""} data={traeFecha("Finalizar")} />

                </div>

                <div className="text-center border-2 rounded-md border-gray-300 py-2 max-h-[14rem] h-56 overflow-auto">
                    <table className="min-w-[52rem] max-w-[52rem] max-h-[14rem]">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Estado de trabajo</th>
                                <th>Tiempos</th>
                                <th className="w-[2rem] max-w-[2rem]">Motivos de pausa</th>
                                <th>Comentarios Adicionales</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {
                                detalle.length > 0 && detalle.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.estado}</td>
                                        <td>{formatDate(item.tiempo)}</td>
                                        <td className="capitalize truncate w-[14rem] px-2 max-w-[14rem]">{item.motivo}</td>
                                        <td>{item.comentario}</td>
                                    </tr>
                                ))
                            }
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
