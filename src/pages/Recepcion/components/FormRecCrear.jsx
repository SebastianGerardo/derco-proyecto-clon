import { useContext, useState } from "react";
import { opcionesRecp } from "../../../helpers/EstadosGlobal";
import { editServicio } from "../../../helpers/ApiAnfitrion";
import { Toast } from "../../../components/Alertas/SweetAlex";
import { InputBasic, InputBasicNumber } from "../../../components/InputForms/InputBasic";
import { UserContext } from "../../../context/ContextDerco";

export const FormRecCrear = ({ data, setIsOpen }) => {

    const { estadoData, setEstadoData } = useContext(UserContext);
    
    function agregarOpcionSeleccionada(e) {
        const opcion = e.target.value;
        if (!dataRegistro.adicionales.includes(opcion)) {
            setDataRegistro({
                ...dataRegistro,
                adicionales: [...dataRegistro.adicionales, opcion],
            });
  
        }
    }

    function eliminarOpcionSeleccionada(opcion) {
        setDataRegistro({
            ...dataRegistro,
            adicionales: dataRegistro.adicionales.filter((item) => item !== opcion),
        });

    }
    const [fechaInicioRecepcion, setFechaInicioRecepcion] = useState("")
    
    const [dataRegistro, setDataRegistro] = useState({
        adicionales: [],
        asistencia: data.asistencia,
        comentario: data.comentario,
        correo: data.correo,
        detalleServicio: data.detalleServicio,
        estado: '3',
        fechaRegistro: data.fechaRegistro,
        horaEstimadaEntrega: data.horaEstimadaEntrega,
        id: data.id,
        marca: data.marca,
        modelo: data.modelo,
        nombres: data.nombres,
        ot: data.ot,
        placa: data.placa,
        telefono: data.telefono,
        tipoServicio: data.tipoServicio,
        vehiculoKilometraje: data.vehiculoKilometraje,
        estadoPicking: "0",
        servicioSolicitado: data.servicioSolicitado,
        fechaInicioRecepcion: new Date()
    })

    const registrarUnidad = (e) => {
        e.preventDefault()

        const valores = {
            ...dataRegistro,
            adicionales: JSON.stringify(dataRegistro.adicionales)
        }
        editServicio(valores, dataRegistro.id).then((res) => {
            if (res.statusCode === 200) {
                Toast.fire({
                    icon: "success",
                    title: "OT registrada exitosamente!",
                });
                setIsOpen(false);
                setEstadoData(!estadoData)
            } else {
                Toast.fire({
                    icon: "error",
                    title: "No se registró correctamente el OT",
                });
            }
        });
    }

    const captura = (e) => {
        setDataRegistro({
            ...dataRegistro,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <form action="" className="flex flex-col lg:grid grid-cols-2 gap-3" onSubmit={registrarUnidad}>
            <section className="w-full lg:grid lg:grid-cols-2 md:grid gap-2">
                <section>
                    <InputBasic labelName={"Nombres & Apellidos"} pHolder={"Ingresa el nombre"} data={dataRegistro.nombres} onChange={captura} name={"nombres"} />
                    <InputBasic labelName={"Email:"} pHolder={"example@gmail.com"} data={dataRegistro.correo} onChange={captura} name={"correo"} />
                    <InputBasic labelName={"Marca :"} pHolder={"Suzuki"} data={dataRegistro.marca} onChange={captura} name={"marca"} />
                    <InputBasicNumber labelName={"Kilometraje Real:"} pHolder={"5000"} data={dataRegistro.vehiculoKilometraje} onChange={captura} name={"vehiculoKilometraje"} />
                </section>
                <section>
                    <InputBasicNumber labelName={"Teléfono / Celular:"} pHolder={"923106889"} data={dataRegistro.telefono} onChange={captura} name={"telefono"} />
                    <InputBasic labelName={"Placa:"} pHolder={"ABC123"} data={dataRegistro.placa} onChange={captura} name={"placa"} />
                    <InputBasic labelName={"Modelo:"} pHolder={"Celerio"} data={dataRegistro.modelo} onChange={captura} name={"modelo"} />
                    <InputBasic labelName={"Servicio Solicitado:"} pHolder={"Lavado Rapido"} data={dataRegistro.servicioSolicitado} onChange={captura} name={"servicioSolicitado"} />
                </section>

                <section className="flex lg:flex-row flex-col justify-between col-start-1 col-end-3">
                    <div className="lg:w-full w-full">
                        <label htmlFor="" className="text-gray-400">
                            Detalles del Servicio Solicitado:
                        </label>
                        <br />
                        <textarea
                            value={dataRegistro.detalleServicio || ""}
                            name="detalleServicio"
                            onChange={captura}
                            type="text"
                            placeholder="Detalles..."
                            className="resize-none w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
                        />
                    </div>
                </section>
            </section>

            {/* LADO DERECHO */}
            <section className="w-full">

                <section className="lg:grid lg:grid-cols-2 md:grid md:grid-cols-2 gap-2 lg:gap-2 md:gap2">
                    <InputBasicNumber labelName={"Nro OT:"} pHolder={"12261743"} data={dataRegistro.ot} onChange={captura} name={"ot"} />
                    <div className="w-full">
                        <label htmlFor="" className="text-gray-400">
                            Tipo Servicio
                        </label>
                        <br />
                        <select
                            value={dataRegistro.tipoServicio || ""}
                            name="tipoServicio"
                            onChange={captura}
                            id=""
                            className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
                        >
                            <option value="">Elegir:</option>
                            <option value="2">Mantención Flexible</option>
                        </select>
                    </div>
                </section>

                <section className="grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-x-3">
                    <div className="w-full row-start-1 row-end-2">
                        <label htmlFor="" className="text-gray-400">
                            Hora Estimada de entrega:
                        </label>
                        <br />
                        <select
                            value={dataRegistro.horaEstimadaEntrega || ""}
                            onChange={captura}
                            name="horaEstimadaEntrega"
                            id=""
                            className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
                        >
                            <option value="">Elegir:</option>
                            <option value="2:15">2:15</option>
                            <option value="2:30">2:30</option>
                            <option value="2:45">2:45</option>
                            <option value="3:00">3:00</option>
                            <option value="3:15">3:15</option>
                        </select>
                    </div>
                    <div className="flex flex-col relative">
                        <label htmlFor="adicionales" className="text-gray-400">Adicionales:</label>
                        <select id="adicionales" className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none" onChange={agregarOpcionSeleccionada}>
                            <option value="">Seleccione una opción</option>
                            {opcionesRecp.map((opcion) => (
                            <option key={opcion} value={opcion}>
                                {opcion}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col overflow-y-auto w-full mx-auto h-[7.5rem] mt-2 border border-gray-300 rounded-md">
                        {dataRegistro.adicionales.length > 0 &&
                        dataRegistro.adicionales.map((opcion) => (
                            <div className="flex items-center text-left px-3 py-2 border-b border-gray-300" key={opcion}>
                            <div className="rounded-full relative w-4 h-4 mr-2 text-gray-500 hover:text-white hover:bg-red-500 hover:border-red-500 cursor-pointer border border-gray-400 border-solid flex items-center justify-center transition-colors duration-300" onClick={() => eliminarOpcionSeleccionada(opcion)}>
                                <h1 className="font-bold text-sm">x</h1>
                            </div>
                            <span className="text-gray-700">{opcion}</span>
                            </div>
                        ))}
                        {dataRegistro.adicionales.length === 0 &&
                        <div className="flex text-center items-center justify-center w-full h-full text-gray-400">No se ha seleccionado ningún adicional</div>
                        }
                    </div>

                    <div className="lg:w-full w-full row-start-2 row-end-3">
                        <label htmlFor="" className="text-gray-400">
                            Comentarios del cliente:
                        </label>
                        <br />
                        <textarea
                            value={dataRegistro.comentario || ""}
                            name="comentario"
                            onChange={captura}
                            type="text"
                            placeholder="Comentarios del cliente"
                            className="resize-none w-full border border-gray-300 h-24 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
                        />
                    </div>
                </section>

                <section className="flex lg:flex-row flex-row justify-center lg:items-end items-center md:flex-row">
                    <div className="flex justify-center w-full mt-10">
                        <button
                            type="submit"
                            className="flex items-center gap-2  justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
