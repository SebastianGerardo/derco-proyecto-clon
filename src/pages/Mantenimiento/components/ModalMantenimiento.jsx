
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { BotonFroms, BotonTimer } from '../../../components/Boton/BotonForms';
import FormMantenimiento from './FormMantenimiento';
export const ModalMantenimiento = ({ tipo, data }) => {
  const [bloqueo, setBloqueo] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState(0);

  const [isRunning, setIsRunning] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (time) => {
    const days = Math.floor(time / 86400)
      .toString()
      .padStart(2, "0");
    const hours = Math.floor((time % 86400) / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${days}:${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    setTime(0);
  }, [reset]);

  return (
    <>
      <BotonTimer tipo={tipo} setIsOpen={setIsOpen} bloqueo={bloqueo} />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

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
                <Dialog.Panel className={`w-full max-w-2xl transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all`}>
                  
                <div className='bg-[#C00000] text-white py-2 w-full'>
                    <p className='text-center text-xl font-medium '>Mantenimiento</p>
                    <button onClick={(e) => {e.preventDefault() ; setIsOpen(false)}} className="absolute top-0 right-0 mr-4 text-white text-3xl">x</button>
                </div>
                   

                  <div className='w-full block'>
                    <FormMantenimiento data={data} setIsOpen={setIsOpen} isRunning={isRunning} setIsRunning={setIsRunning} reset={reset} setReset={setReset} formatTime={formatTime} time={time} setBloqueo={setBloqueo}/>
                  </div>
                  
                  

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
