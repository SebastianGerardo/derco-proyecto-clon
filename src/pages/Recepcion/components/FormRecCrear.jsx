import { useState } from "react";
import { opcionesRecp } from "../../../helpers/EstadosGlobal";
import { editServicio } from "../../../helpers/ApiAnfitrion";
import { Toast } from "../../../components/Alertas/SweetAlex";
import { InputBasic } from "../../../components/InputForms/InputBasic";

export const FormRecCrear = ({ data, setIsOpen }) => {
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

    const [dataRegistro, setDataRegistro] = useState({
        adicionales: [],
        asesor: data.asesor,
        asistencia: data.asistencia,
        comentario: data.comentario,
        correo: data.correo,
        detalleServicio: data.detalleServicio,
        estado: data.estado,
        fechaCita: data.fechaCita,
        fechaEntrada: data.fechaEntrada,
        fechaRegistro: data.fechaRegistro,
        horaEstimadaEntrega: data.horaEstimadaEntrega,
        id: data.id,
        marca: data.marca,
        modelo: data.modelo,
        nombres: data.nombres,
        ot: data.ot,
        placa: data.placa,
        telefono: data.telefono,
        tipoCita: data.tipoCita,
        tipoServicio: data.tipoServicio,
        vehiculoKilometraje: data.vehiculoKilometraje,
    })
    
    const registrarUnidad = (e) => {
        let datosFormateados = []
        e.preventDefault()
        /**CAC LOS MANDAS */
        datosFormateados.push(dataRegistro)
        editServicio(datosFormateados, dataRegistro.id).then((res) => {
          if (res.statusCode === 200) {
            Toast.fire({
              icon: "success",
              title: "OT registrada exitosamente!",
            });
            setIsOpen(false);
          } else {
            Toast.fire({
              icon: "error",
              title: "No se registró correctamente el OT",
            });
            console.log("error", res)
            console.log("dataError", datosFormateados)
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
        {/* INPUTS DEL FORM - INICIO */}

        {/* LADO IZQUIERDO */}
        <section className="w-full lg:grid lg:grid-cols-2 md:grid gap-2">
            <section>
                <InputBasic labelName={"Nombres & Apellidos"} pHolder={"ingresa el nombre"} data={dataRegistro.nombres} onChange={captura} name={"nombres"} />

                <InputBasic labelName={"Email:"} pHolder={"Aa1"} data={dataRegistro.correo} onChange={captura} name={"correo"}/>

                {/* Marca */}
                <InputBasic labelName={"Marca :"} pHolder={"SAPITO"} data={dataRegistro.marca} onChange={captura} name={"marca"} />

                <InputBasic labelName={"Kilometraje Real:"} pHolder={"5000"} data={dataRegistro.vehiculoKilometraje} onChange={captura} name={"vehiculoKilometraje"} />

            </section>
            <section>
                <InputBasic labelName={"Teléfono / Celular:"} pHolder={"Aa1"} data={dataRegistro.telefono} onChange={captura} name={"telefono"} />

                <InputBasic labelName={"Placa:"} pHolder={"ABC123"} data={dataRegistro.placa} onChange={captura} name={"placa"} />

                <InputBasic labelName={"Modelo:"} pHolder={"Aa1"} data={dataRegistro.modelo} onChange={captura} name={"modelo"} />

                <InputBasic labelName={"Servicio solicitado:"} pHolder={"Mantenimiento express..."} data={dataRegistro.tipoCita} onChange={captura} name={"tipoCita"}/>
            </section>

            <section className="flex lg:flex-row flex-col justify-between col-start-1 col-end-3">
                <div className="lg:w-full w-full">
                    <label htmlFor="" className="text-gray-400">
                        Detalles del servicio:
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

            {/* NUMERO OT */}
            <section className="lg:grid lg:grid-cols-2 md:grid md:grid-cols-2 gap-2 lg:gap-2 md:gap2">

                <InputBasic labelName={"Nro OT:"} pHolder={"12261743"} data={dataRegistro.ot} onChange={captura} name={"ot"} />

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
                        <option value="Mantencion Flexible">Mantención Flexible</option>
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

                <section className="flex flex-col relative">
                    <div className="w-full row-start-1 row-end-2">
                        <label htmlFor="" className="text-gray-400">
                            Adicionales:
                        </label>
                        <select className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none" onChange={agregarOpcionSeleccionada} name="adicionales">
                            <option value="">Seleccione una opción</option>
                            {opcionesRecp.map((opcion) => (
                                <option key={opcion} value={opcion}>
                                    {opcion}
                                </option>
                            ))}
                        </select>
                    </div>
                </section>

                <div className="flex gap-1 flex-wrap">
                    {dataRegistro.adicionales.map((opcion) => (
                        <div className="flex bg-red-500 h-6 rounded-full px-2 gap-1 items-center mt-2 text-white" key={opcion}>
                            <div>{opcion}</div>
                            <div className="cursor-pointer" onClick={() => eliminarOpcionSeleccionada(opcion)}> X </div>
                        </div>
                    ))}
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
