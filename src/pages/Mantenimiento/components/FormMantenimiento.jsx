import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Toast } from "../../../components/Alertas/SweetAlex";
import Timer from "../../../components/Cronometro/Timer";
import TimerControls from "../../../components/Cronometro/TimerControls";
import { ModalMantenimientoPausa } from "./ModalMantenimientoPausa";
import { InicarMan, TerminarMan, TerminarPausarMan } from "../../../helpers/ApiMantenimiento";
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
}) => {
  const [datosMantenimiento, setDatosMantenimiento] = useState({
    serviciosAsignado: data.id,
    tipo: "mantenimiento",
    motivo: "",
    comentario: "",
    tiempo: "",
    estado: ""
  });

  const captura = (e) => {
    setDatosMantenimiento({
      ...datosMantenimiento,
      [e.target.name]: e.target.value,
    });
  };

  const enviarDatos = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const [hasStarted, setHasStarted] = useState(false);
  const [isPausedOpen, setIsPausedOpen] = useState(false);
  const handleStart = () => {
    setDatosMantenimiento(previe => ({
      ...previe,
      tiempo: new Date(),
      estado: "Iniciar"
    }))
    setIsRunning(true);
    setHasStarted(true);
  };

  const handlePause = () => {
    setDatosMantenimiento(previe => ({
      ...previe,
      tiempo: new Date(),
      estado: "Pausar"
    }))
    setIsRunning(false);
    setIsPausedOpen(true);
  };


  const handleReset = () => {
    setDatosMantenimiento(previe => ({
      ...previe,
      tiempo: new Date(),
      estado: "Finalizar"
    }))
    setIsRunning(false);
    setHasStarted(false);
    setReset(!reset);
  };

  useEffect(() => {
    if (datosMantenimiento.estado === "Iniciar") {
      InicarMan(datosMantenimiento).then(res =>
        console.log(res)
      )
    } else if (datosMantenimiento.estado === "Finalizar") {
      TerminarMan(datosMantenimiento).then(res =>
        console.log(res)
      )
    }

  }, [datosMantenimiento])

  return (
    <section className="space-y-2" >
      <div className="flex justify-around py-4 bg-[#D9D9D9] flex-wrap gap-2">
        <h2 className="font-bold">
          OT: <span>{data.servicio.ot}</span>
        </h2>
        <h2 className="font-bold">
          PLACA: <span>{data.servicio.placa}</span>
        </h2>
        <h2 className="font-bold">
          ASESOR: <span>{data.elevador?.tecnico?.nombres}</span>
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

