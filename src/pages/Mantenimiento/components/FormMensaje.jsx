import React, { useContext, useEffect, useState } from "react";
import { Toast } from "../../../components/Alertas/SweetAlex";
import { InputReadOnly } from "../../../components/InputForms/InputBasic";
import { UserContext } from "../../../context/ContextDerco";
import { editServicio } from "../../../helpers/ApiAnfitrion";
import {
  DestinatariosMensaje,
  Mensajes,
} from "../../../helpers/ApiMantenimiento";
import { socket } from "../../../helpers/socketConextion";

const FormMensaje = ({ data, setIsOpen }) => {
  //AQUI SE MANDA EL MENSAJE EN EL CHAT

  const { UsuarioLogin, socketState } = useContext(UserContext);
  const [destinatario, setDestinatario] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    DestinatariosMensaje().then((res) => setDestinatario(res.data));
  }, []);

  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data);
    });
    console.log("UseEffect del socket");
  }, [flag]);

  useEffect;

  // console.log(data.elevador.nombre)

  const [datosAlmacen, setDatosAlamacen] = useState({
    estadoPicking: data.comentarioAlmacen,
    comentarioAlmacen: data.comentarioAlmacen,
    estado: "4",
  });

  const captura = (e) => {
    setDatosAlamacen({
      ...datosAlmacen,
      [e.target.name]: e.target.value,
    });
  };

  const almacen = (e) => {
    e.preventDefault();
    socket.emit("message", {
      de: 1,
      para: 25,
      mensaje: "Hola Amiguitos",
    });
    setFlag(!flag);
    // const mensaje = e.target.comentarioAlmacen.value;
    // const para = e.target.estadoPicking.value;
    // let enviar = {
    //   de: UsuarioLogin?.usuario.id,
    //   para,
    //   mensaje,
    // };
    // Mensajes(enviar).then((res) => {
    //   if (res.statusCode === 200) {
    //     Toast.fire({
    //       icon: "success",
    //       title: "Mensaje enviado correctamente",
    //     });
    //   } else {
    //     Toast.fire({
    //       icon: "error",
    //       title: "Error al enviar mensaje",
    //     });
    //   }
    // });
    // socketState.emit("enviar_mensaje", 25 , {de: 1, para: 25, mensaje:"hOPLA MAMI"} )
    //setIsOpen(false)
  };

  return (
    <form action="" className="space-y-2" onSubmit={almacen}>
      <div className="flex justify-around flex-wrap gap-2 py-4 bg-[#D9D9D9] font-bold">
        <h2>
          OT: <span className="font-normal">{data?.servicio?.ot}</span>
        </h2>
        <h2>
          PLACA: <span className="font-normal">{data?.servicio?.placa}</span>
        </h2>
        <h2>
          TECNICO:{" "}
          <span className="font-normal">{`${data?.elevador?.tecnico.nombres.split(
            " ",
            1
          )} ${data?.elevador?.tecnico.apellidos.split(" ", 1)}`}</span>
        </h2>
        <h2>
          ELEVADOR:{" "}
          <span className="font-normal">{data?.elevador?.nombre}</span>
        </h2>
      </div>
      {/* INPUTS DEL FORM - INICIO */}
      <section className="p-5">
        <div className="w-full lg:grid lg:grid-cols-2 lg:gap-y-12">
          <div className="w-full">
            <label htmlFor="" className="text-gray-400">
              Destinatario:
            </label>
            <br />
            <select
              name="estadoPicking"
              onChange={captura}
              className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
            >
              <option value="">Elige:</option>
              {destinatario.length > 0 &&
                destinatario.map((des) => (
                  <option key={des.id} value={des.id}>
                    {des.nombres}
                  </option>
                ))}
            </select>
          </div>
          <section className="lg:w-full w-full col-start-1 col-end-3">
            <label htmlFor="" className="text-gray-400">
              Mensaje:
            </label>
            <br />
            <textarea
              type="text"
              name="comentarioAlmacen"
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
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 35 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.07927 17.7872C-0.466682 18.6691 -0.323032 21.0206 1.32553 21.7042L10.9227 25.7032V32.7647C10.9227 34.002 11.9214 35 13.1596 35C13.8231 35 14.4524 34.7061 14.8765 34.1934L19.1176 29.1143L27.593 32.6416C28.8859 33.1817 30.3839 32.334 30.596 30.9532L34.9739 2.51587C35.1039 1.68873 34.7413 0.854747 34.0504 0.383071C33.3595 -0.0886051 32.4566 -0.12962 31.7247 0.287369L1.07927 17.7872ZM4.64316 19.5304L28.0034 6.19357L12.9817 22.9688L13.0638 23.0372L4.64316 19.5304ZM27.5656 29.0801L16.1694 24.3292L30.8149 7.9709L27.5656 29.0801Z"
                    fill="#1E3A8A"
                  />
                </svg>
                Enviar
              </button>
            </div>
          </section>
        </div>
      </section>
    </form>
  );
};

export default FormMensaje;
