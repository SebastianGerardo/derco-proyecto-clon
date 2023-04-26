import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Toast } from "../../../components/Alertas/SweetAlex";
import TimerControls from "../../../components/Cronometro/TimerControls";
import { ModalMantenimientoPausa } from "./ModalMantenimientoPausa";
import { InicarMan, TerminarMan, TerminarPausarMan, TraeDetalle } from "../../../helpers/ApiMantenimiento";
import Swal from "sweetalert2";
import { UserContext } from "../../../context/ContextDerco";
import { useOutletContext } from "react-router-dom";
import {Jelly} from '@uiball/loaders' 

const FormMantenimiento = ({
  data,
  setIsOpen,
  setBloqueo,
}) => {

  const [datosMantenimiento, setDatosMantenimiento] = useState({
    serviciosAsignado: data.id,
    tipo: "mantenimiento",
    motivo: "",
    comentario: "",
    tiempo: "",
    estado: "",
  });
  const { socketState, UsuarioLogin } = useContext(UserContext);
  const [handleInit, handleStop, handleFinish, formatTime, setIsRunning, isRunning, hasStarted, time, setTime] = useOutletContext()
  const [detalleUsuario, setDetalleUsuario] = useState([])
  const [isPausedOpen, setIsPausedOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const filtroDetalle = detalleUsuario != [] ? detalleUsuario[detalleUsuario?.length - 1] : null

  useEffect(() => {
    TraeDetalle(data.id).then((resp) => {
      setDetalleUsuario(resp.data)
    })
  }, [])

  useEffect(() => {
    if (!hasStarted) {
      const tiempoTranscurrido =  parseInt(filtroDetalle?.tiempo_transcurrido) || 0;
      setTime(tiempoTranscurrido)
    }
  }, [filtroDetalle])


  const handleStart = () => {
    localStorage.setItem("time", time)
    localStorage.setItem("id", data.id)
    if (time > 0) {
      localStorage.setItem("estado", "Reanudado")
      setDatosMantenimiento(previe => ({
        ...previe,
        tiempo: new Date(),
        estado: "Reanudo",
        tiempo_transcurrido: time
      }))
      handleInit()
      Toast.fire({
        icon: "success",
        title: "Se reanudó correctamente el temporizador",
      });
    } else {
      console.log("Mantenimiento iniciado")
      localStorage.setItem("estado", "Iniciado")
      setDatosMantenimiento(previe => ({
        ...previe,
        tiempo: new Date(),
        estado: "Iniciar",
        tiempo_transcurrido: time
      }))
      handleInit()

      Toast.fire({
        icon: "success",
        title: "El temporizador se ha iniciado correctamente",
      });
    }
    setIsOpen(false)
  };

  const handlePause = () => {
    setIsPausedOpen(true);
  };


  const handleReset = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se podrá revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Terminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("time")
        localStorage.removeItem("id")
        localStorage.removeItem("estado")
        setDatosMantenimiento(previe => ({
          ...previe,
          tiempo: new Date(),
          estado: "Finalizar",
        }))

        handleFinish()

        setIsOpen(false)
        Toast.fire({
          icon: "success",
          title: "Se finalizó correctamente el temporizador",
        });
      }
    })
    
  };

  //ESTE USE EFFECT SE ENCARGA DE ACTUALIZAR LA DATA
  useEffect(() => {
    if (datosMantenimiento.estado === "Iniciar" || datosMantenimiento.estado === "Reanudo") {
      InicarMan(datosMantenimiento).then(res =>
        socketState.emit("notificacionToServer", { tipo: "1-5-6", room: UsuarioLogin.usuario?.centro?.codigo, notificacion: "Alert" })
      )
    } else if (datosMantenimiento.estado === "Finalizar") {
      TerminarMan(datosMantenimiento).then(res =>
        socketState.emit("notificacionToServer", { tipo: "1-5-6", room: UsuarioLogin.usuario?.centro?.codigo, notificacion: "Alert" })
      )
    }
    if (datosMantenimiento.estado === "Finalizar") {
      setBloqueo(true)
    }
  }, [datosMantenimiento])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoaded(false)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
      <section className="space-y-2 min-h-[16.5rem]" >
    {
      isLoaded && !hasStarted ? 
      <div className="w-full h-full flex justify-center items-center min-h-[16.5rem]">
        <Jelly />  
      </div>
      :
      <>
        <div className="flex justify-around py-4 bg-[#D9D9D9] flex-wrap gap-2">
          <h2 className="font-bold">
            OT: <span>{data?.servicio.ot}</span>
          </h2>
          <h2 className="font-bold">
            PLACA: <span>{data?.servicio.placa}</span>
          </h2>
          <h2 className="font-bold">
            ASESOR: <span>{data?.servicio.asesor.nombres.split(" ", 1)} {data?.servicio.asesor.apellidos.split(" ", 1)}</span>
          </h2>
        </div>
        <div className="flex justify-center items-center flex-col gap-6 p-5">
          <div className="font-bold text-4xl">{formatTime(time)}</div>
          <TimerControls
            isRunning={isRunning}
            handleStart={handleStart}
            handlePause={handlePause}
            handleReset={handleReset}
          />

          <Transition appear show={isPausedOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => setIsPausedOpen(false)}
            >
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel
                      className={`w-full max-w-2xl transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all`}
                    >
                      <div className="w-full block">
                        <ModalMantenimientoPausa
                          setIsOpen={setIsOpen}
                          data={data}
                          setIsPausedOpen={setIsPausedOpen}
                          handleStop={handleStop}
                          time={time}
                        />
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </>
    }
    </section>
  );
};

export default FormMantenimiento;

