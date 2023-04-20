import React, { useEffect, useState } from 'react'
import ProgressBar from '../../../components/Radial Progresivo/ProgressBar'
import { CantCitas } from '../../../helpers/ApiAnfitrion'

const InformacionRecepcion = () => {
  const [cantCitas, setCantCitas] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      CantCitas().then(res => {
        if(res.statusCode === 200){
          setCantCitas(res.data.recepcion)
        }
      })
    }, 1000);
    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    if (cantCitas?.otCreadas ) {
      setCompletedTasks(cantCitas?.otCreadas);
    }
  }, [cantCitas]);
  
  const totalTasks = cantCitas?.citasAsignadas;
  const [completedTasks, setCompletedTasks] = useState(0);
  const progress = (completedTasks / totalTasks) * 100;

  return (
    <div className='flex flex-col gap-4 sm:flex-col gp:flex-col lg:flex-row justify-between w-full'>
      <div className="flex gap-4 items-center justify-center bg-gray-100 shadow-md rounded-sm py-3 px-5 mb-5">
            <section className='flex flex-col md:flex-row lg:flex-row gap-3'>
                <div className='min-h-[76px] px-5 py-2 bg-yellow-400 min-w-[10rem] text-center text-white rounded-md flex flex-col'>
                    <p className='font-semibold'>Citas Asignadas</p>
                    <span className='font-bold text-3xl'>{cantCitas ? cantCitas?.citasAsignadas : 0 }</span>
                </div>
                <div className='min-h-[76px] px-5 py-2 bg-purple-700/80 min-w-[10rem] text-center text-white rounded-md flex flex-col'>
                    <p className='font-semibold'>OT Creadas</p>
                    <span className='font-bold text-3xl'>{cantCitas ? cantCitas?.otCreadas : 0 }</span>
                </div>
                <div className='min-h-[76px] px-5 py-2 bg-green-500 min-w-[10rem] text-center text-white rounded-md flex flex-col'>
                    <p className='font-semibold'>OT Pendientes</p>
                    <span className='font-bold text-3xl'>{cantCitas ? cantCitas?.otPendiente : 0 }</span>
                </div>
            </section>
            <section className='grid place-items-center'>
              <div>
                <p className='font-bold text-center'>Avance:</p>
              </div>
              <div className={`w-[80px] h-[80px] mt-1`}>
                  <ProgressBar value={progress ? progress : 0} text={progress === Infinity || NaN ? 0 : (progress ? parseInt(progress) : 0)} />
              </div>
            </section>
      </div>
      <div className="flex justify-center items-center bg-gray-100 min-w-[15rem] shadow-md rounded-sm py-3 px-5 mb-5">
        <section className='grid gap-y-2 place-items-center'>
          <div>
            <p className='font-bold text-start text-base'>Unidades listas para entrega:</p>
          </div>
          <section className='flex gap-3'>
                <div className='px-5 py-2 bg-green-500 min-w-[10rem] text-center text-white rounded-md flex flex-col'>
                    <p>Unidades Listas</p>
                    <span className='font-bold text-3xl'>{cantCitas.serviciosParaSalida}</span>
                </div>
          </section>
        </section>
      </div>
    </div>
  )
}

export default InformacionRecepcion
