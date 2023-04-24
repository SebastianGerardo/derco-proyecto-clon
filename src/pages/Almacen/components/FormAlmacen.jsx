import React, { useContext, useState } from "react";
import { Toast } from "../../../components/Alertas/SweetAlex";
import { InputReadOnly } from "../../../components/InputForms/InputBasic";
import { UserContext } from "../../../context/ContextDerco";
import { editServicio } from "../../../helpers/ApiAnfitrion";

const FormAlmacen = ({ data, setIsOpen }) => {

    const { estadoData, setEstadoData, UsuarioLogin, socketState } = useContext(UserContext);
    const [datosAlmacen, setDatosAlamacen] = useState({
        estadoPicking: "1",
        comentarioAlmacen: data.comentarioAlmacen,
        estado: "4"
    })

    const captura = (e) => {
        setDatosAlamacen({
            ...datosAlmacen,
            [e.target.name]: e.target.value,
        });
    }
    console.log(data)
    const almacen = (e) =>{
        e.preventDefault()
        editServicio(datosAlmacen, data.id).then(res => {
            if (res.statusCode === 200) {
              Toast.fire({
                icon: "success",
                title: "Picking realizado correctamente",
              });
              socketState.emit("notificacionToServer", { tipo: "1-5", room: UsuarioLogin.usuario?.centro?.codigo, notificacion: "Alert" })
              setEstadoData(!estadoData)
              setIsOpen(false)
            } else {
              Toast.fire({
                icon: "error",
                title: "Ha ocurrido un error al actualizar el picking",
              });
            }
          })
    }

    return (
        <form action="" className="space-y-2" onSubmit={almacen}>
            {/* INPUTS DEL FORM - INICIO */}
            <div className="w-full lg:grid lg:grid-cols-2 lg:gap-x-4">
                <section className="w-full lg:w-full md:w-full ">

                    <InputReadOnly labelName={"Nombres & Apellidos"} pHolder={"ingresa el nombre"} data={data.nombres} />

                    <InputReadOnly labelName={"Marca"} pHolder={"Citroen"} data={data.marca} />

                    <InputReadOnly labelName={"Kilometraje Real:"} pHolder={"5000"} data={data.vehiculoKilometraje} />

                </section>

                {/* LADO DERECHO */}
                <section className="w-full lg:w-full md:w-full">

                    <InputReadOnly labelName={'Tipo de Servicio:'} pHolder={'Mantenimiento Flexible'} data={data.tipoServicio?.nombre} />

                    <InputReadOnly labelName={"Modelo:"} pHolder={"C4"} data={data.modelo} />

                    <InputReadOnly labelName={"Placa:"} pHolder={"ABC123"} data={data.placa} />


                </section>
                <section className="lg:w-full w-full col-start-1 col-end-3">
                    <label htmlFor="" className="text-gray-400">
                        Comentario Almacen:
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
