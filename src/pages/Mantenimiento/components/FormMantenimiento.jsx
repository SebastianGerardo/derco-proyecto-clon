import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Toast } from "../../../components/Alertas/SweetAlex";
import Timer from "../../../components/Cronometro/Timer";
import TimerControls from "../../../components/Cronometro/TimerControls";
import { ModalMantenimientoPausa } from "./ModalMantenimientoPausa";
import { InicarMan, TerminarMan, TerminarPausarMan, TraeDetalle } from "../../../helpers/ApiMantenimiento";
import Swal from "sweetalert2";
import { UserContext } from "../../../context/ContextDerco";
// import Timer from "../../../components/Cronometro/Timer";
// import TimerControls from "../../../components/Cronometro/TimerControls";

const FormMantenimiento = ({
  data,
  setIsOpen,
  isRunning,
  setIsRunning,
  reset,
  setReset,
  formatTime,
  time,
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
  const captura = (e) => {
    setDatosMantenimiento({
      ...datosMantenimiento,
      [e.target.name]: e.target.value,
    });
  };

  const [hasStarted, setHasStarted] = useState(false);
  const [isPausedOpen, setIsPausedOpen] = useState(false);

  const handleStart = () => {
    localStorage.setItem("time", time)
    localStorage.setItem("id", data.id)
    if (time > 0) {
      localStorage.setItem("estado", "Reanudado")
      setDatosMantenimiento(previe => ({
        ...previe,
        tiempo: new Date(),
        estado: "Reanudo",
      }))
      setIsRunning(true);
      setHasStarted(true);
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
      }))
      setIsRunning(true);
      setHasStarted(true);
      Toast.fire({
        icon: "success",
        title: "El temporizador se ha iniciado correctamente",
      });
    }
    setIsOpen(false)
  };


  const handlePause = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se podrá revertir",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Pausar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem("time", time)
        localStorage.setItem("id", data.id)
        localStorage.setItem("estado", "Pausado")
        setDatosMantenimiento(previe => ({
          ...previe,
          tiempo: new Date(),
          estado: "Pausar",
        }))
        setIsRunning(false);
        setIsPausedOpen(true);
      }
    })
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
        setIsRunning(false);
        setHasStarted(false);
        setIsOpen(false)
        setReset(!reset);
        Toast.fire({
          icon: "success",
          title: "Se finalizó correctamente el temporizador",
        });
      }
    })
    
  };


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

  return (
    <section className="space-y-2" >
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
            onClose={() => console.log("cerrar")}
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
                        setIsPausedOpen={setIsPausedOpen}
                        captura={captura}
                        datosMantenimiento={datosMantenimiento}
                        setDatosMantenimiento={setDatosMantenimiento}
                      />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </section>
  );
};

export default FormMantenimiento;

