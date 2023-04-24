import React, { useContext, useMemo, useState } from "react";
import { Toast } from "../../../../components/Alertas/SweetAlex";
import { InputReadOnly } from "../../../../components/InputForms/InputBasic";
import { GuardarElevador } from "../../../../helpers/ApiAsignacion";
import { UserContext } from "../../../../context/ContextDerco";

const FormMecanico = ({ data, dataElevador, setIsOpen,closeElevadores, nombresElevadores }) => {

    const { socketState, UsuarioLogin } = useContext(UserContext);
    const adicionales = JSON.parse(data?.adicionales)
    const elevadores = nombresElevadores

    const opcionesServicios = ["Mantenimiento", "Lavado", "Secado", "Control de Calidad"];

    const [dataRegistro, setDataRegistro] = useState({
        servicios: [],
        elevadorId: dataElevador.id,
    });
    
    const [index, setIndex] = useState(parseInt(dataElevador.id) - 1)
    const [selectedElevadorId, setSelectedElevadorId] = useState(elevadores.length > 0 ? elevadores[0].elevadorId : null)
  
    const handleElevadorClick = (id, e) => {
      if (index + 1 !== id) {
        setIndex(id - 1)
        setSelectedElevadorId(id)
      }
      cambiarElevador(e)
    }
  
    const dataElevadorNombre = useMemo(() => {
      return elevadores[index]
    }, [index])

    const enviarElevador = (e) => {
        e.preventDefault()
        const enviar = {
            elevador: parseInt(dataRegistro.elevadorId),
            servicio: data.id,
            ordenServicios: JSON.stringify(dataRegistro.servicios),
        }
        GuardarElevador(enviar, data.id).then(res => 
            {
                if(res.statusCode == 200) {
                    socketState.emit("notificacionToServer", { tipo: "1-6", room: UsuarioLogin.usuario?.centro?.codigo, notificacion: "Alert" })
                    Toast.fire({
                      icon: "success",
                      title: "Se ha asignado el elevador correctamente",
                    });
                } else {
                    Toast.fire({
                      icon: "error",
                      title: "Ha habido un error al asignar el elevador",
                    });
                }
            })
        setIsOpen(false)
        closeElevadores(false)
    }

    function agregarOpcionSeleccionada(e) {
        const opcion = e.target.value;
        if (opcion && !dataRegistro.servicios.includes(opcion) && opcionesServicios.includes(opcion)) {
          setDataRegistro({
            ...dataRegistro,
            servicios: [...dataRegistro.servicios, opcion],
          }
          );
        }
      }

    function eliminarOpcionSeleccionada(opcion) {
        setDataRegistro({
            ...dataRegistro,
            servicios: dataRegistro.servicios.filter((servicio) => servicio !== opcion),
        });
      }

      function cambiarElevador(e) {
            setDataRegistro({
                ...dataRegistro,
                elevadorId: e.target.value
            })
      }

    return (
        <form action="" className="space-y-2" onSubmit={enviarElevador}>

            {/* INPUTS DEL FORM - INICIO */}
            <div className="w-full lg:grid lg:grid-cols-2 lg:gap-x-4">

                {/* LADO IZQUIERDO */}
                <section className="w-full lg:w-full md:w-full ">
       
                    <InputReadOnly labelName={"OT"} pHolder={"Ingresa la OT"} data={data.ot}/>

                    <InputReadOnly labelName={"Nombre & Apellido"} pHolder={"Ingresa el nombre"} data={data.nombres} />

                    <InputReadOnly labelName={"Asesor"} pHolder={"Citroen"} data={data.asesor?.nombres}/>

                </section>
                {/* LADO DERECHO */}
                <section className="w-full lg:w-full md:w-full">

                    <InputReadOnly labelName={'Tipo de servicio:'} pHolder={'Mantenimiento Flexible'} data={data.tipoServicio?.nombre}/>

                    <div className="flex flex-col relative">
                        <label htmlFor="adicionales" className="text-gray-400">Adicionales:</label>
                    </div>
                    <div className="flex flex-col overflow-y-auto w-full mx-auto h-[7.5rem] mt-2 border border-gray-300 rounded-md">
                        {
                            // adicionalSeleccionado > 0 &&
                            adicionales.map((opcion) => (
                                <div className="flex items-center text-left px-3 py-2 border-b border-gray-300" key={opcion}>
                                    <span className="text-gray-700">{opcion}</span>
                                </div>
                            ))}
                        {adicionales.length === 0 &&
                            <div className="flex text-center items-center justify-center w-full h-full text-gray-400">No se ha seleccionado ningún adicional</div>
                        }
                    </div>

                </section>
            </div>

            <section className="lg:w-full w-full">
                <label htmlFor="" className="text-gray-400">
                    Comentarios del cliente:
                </label>
                <br />
                <textarea
                    type="text"
                    placeholder="Detalles..."
                    value={data.comentario}
                    disabled
                    className="resize-none min-h-[6rem] w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
                />
            </section>

            {/* INPUTS DEL FORM - FIN */}
            <div className="w-full lg:grid lg:grid-cols-2 lg:gap-x-4">
                <section>
                    <div className="flex flex-col relative">
                        <label htmlFor="elevador" className="text-gray-400">Elevador:</label>
                        <select onChange={(e) => {handleElevadorClick(parseInt(e.target.value), e)}} id="elevador" className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none">
                            {elevadores.map((opcion) => (
                                <option key={opcion.elevadorId} selected={opcion.nombre === dataElevador.nombre} value={opcion.elevadorId} onClick={() => console.log(opcion)}>
                                    {opcion.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <InputReadOnly 
                    labelName={"Técnico Mecánico:"} 
                    data={`${dataElevadorNombre.tecnico}`} 
                    />
                </section>

                <section className="flex flex-col gap-y-2">

                    {/* SERVICIOS  */}
                    <div>
                        <div className="flex flex-col relative">
                            <label htmlFor="servicios" className="text-gray-400">Servicios:</label>
                            <select required name="servicios" className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none" onChange={agregarOpcionSeleccionada}>
                                <option value="">Seleccione los servicios</option>
                                {opcionesServicios.map((opcion) => (
                                    <option key={opcion} value={opcion}>
                                        {opcion}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col overflow-y-auto w-full mx-auto h-[7.5rem] mt-2 border border-gray-300 rounded-md">
                            {
                                dataRegistro.servicios.length > 0 &&
                                dataRegistro.servicios.map((opcion) => (
                                    <div className="flex items-center text-left px-3 py-2 border-b border-gray-300" key={opcion}>
                                        <div className="rounded-full relative w-4 h-4 mr-2 text-gray-500 hover:text-white hover:bg-red-500 hover:border-red-500 cursor-pointer border border-gray-400 border-solid flex items-center justify-center transition-colors duration-300" onClick={() => eliminarOpcionSeleccionada(opcion)}>
                                            <h1 className="font-bold text-sm">x</h1>
                                        </div>
                                        <span className="text-gray-700">{opcion}</span>
                                    </div>
                                ))}
                            {dataRegistro.servicios.length === 0 &&
                                <div className="flex text-center items-center justify-center w-full h-full text-gray-400">No se ha seleccionado ningún servicio</div>
                            }
                        </div>
                    </div>
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
                </section>
            </div>


        </form>
    );
};

export default FormMecanico;