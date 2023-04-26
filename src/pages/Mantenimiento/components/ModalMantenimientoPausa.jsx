import { useContext, useState } from "react";
import { Toast } from "../../../components/Alertas/SweetAlex";
import { TerminarPausarMan } from "../../../helpers/ApiMantenimiento";
import { UserContext } from "../../../context/ContextDerco";

export const ModalMantenimientoPausa = ({ setIsOpen, setIsPausedOpen, data, setIsRunning }) => {
  const { socketState, UsuarioLogin } = useContext(UserContext);
 
  const [datosPausa, setDatosPausa] = useState({
    serviciosAsignado: data.id,
    tipo: "mantenimiento",
    motivo: "",
    comentario: "",
    tiempo: "",
    estado: ""
  })

  const captura = (e) => {
    setDatosPausa({
      ...datosPausa,
      [e.target.name]: e.target.value
    })
  }

  const enviarDatos = (e) => {
    e.preventDefault();
    Toast.fire({
      icon: "success",
      title: "Se guardó correctamente el motivo de pausa",
    });
    setIsRunning(false)
    TerminarPausarMan({
      serviciosAsignado: data.id,
      tipo: "mantenimiento",
      motivo: datosPausa.motivo,
      comentario: datosPausa.comentario,
      tiempo: new Date(),
      estado: "Pausar",
      tiempo_transcurrido: localStorage.getItem("time")
    }).then(res=>{
      if(res.statusCode === 200){
        socketState.emit("notificacionToServer", { tipo: "1-5-6", room: UsuarioLogin.usuario?.centro?.codigo, notificacion: "Alert" })
      }else{
        console.log("FALLE")
      }
    })
    localStorage.removeItem("time")
    localStorage.removeItem("id")
    localStorage.removeItem("estado")
    setIsPausedOpen(false);
    setIsOpen(false);
  };
  
  return (
    <form action="" className="space-y-2 p-5" onSubmit={enviarDatos}>
      <div className="w-full flex gap-8">
        <div className="w-full">
          <label htmlFor="" className="text-gray-400">
            Motivo de pausa:
          </label>
          <br />
          <select
            name="motivo"
            onChange={captura}
            size={4}
            required
            className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
          >
            <option value="FALTA DE REPUESTOS">FALTA DE REPUESTOS</option>
            <option value="TRABAJO POR DESARME">TRABAJO POR DESARME</option>
            <option value="UNIDAD PARA RECALL">UNIDAD PARA RECALL</option>
            <option value="PROBLEMAS CON EL ELEVADOR">PROBLEMAS CON EL ELEVADOR</option>
            <option value="PROBLEMAS CON UNIDAD PARA MANTENIMIENTO">PROBLEMAS CON UNIDAD PARA MANTENIMIENTO</option>
            <option value="UNIDAD PARA TEST">UNIDAD PARA TEST</option>
          </select>
        </div>
        <section className="lg:w-full w-full col-start-1 col-end-3">
          <label htmlFor="" className="text-gray-400">
            Comentarios Adicionales:
          </label>
          <br />
          <textarea
            type="text"
            name="comentario"
            value={datosPausa.comentario}
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
    </form>
  );
};