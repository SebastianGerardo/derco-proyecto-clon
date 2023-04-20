import React, { useEffect, useState } from 'react'
import ProgressBar from '../../../../components/Radial Progresivo/ProgressBar'
import { CantCitas } from '../../../../helpers/ApiAnfitrion'

const InformacionTecnico = () => {
  const [cantCitas,setCantCitas] = useState([])
  const [completedTasks, setCompletedTasks] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      CantCitas().then(res => {
        if(res.statusCode === 200){
          setCantCitas(res.data.asignacion)
        }
      })
    }, 1000);
    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    if (cantCitas?.otElevadores ) {
      setCompletedTasks(cantCitas?.otElevadores);
    }
  }, [cantCitas]);
  
  const totalTasks = cantCitas?.otCreadas;
  const progress = (completedTasks / totalTasks) * 100;

  return (
    <div className='flex flex-col gap-4 sm:flex-col gp:flex-col lg:flex-row justify-between w-full'>
      <div className="flex gap-4 items-center justify-center bg-gray-100 shadow-md rounded-sm py-3 px-5 mb-5">
            <section className='flex flex-col md:flex-row lg:flex-row gap-3'>
                <div className='px-5 py-2 bg-yellow-400 min-w-[10rem] text-center text-white rounded-md flex flex-col'>
                    <p className='font-semibold'>Citas Creadas</p>
                    <span className='font-bold text-3xl'>{cantCitas?.citasProgramadas ? cantCitas?.citasProgramadas : 0 }</span>
                </div>
                <div className='px-5 py-2 bg-purple-700 min-w-[10rem] text-center text-white rounded-md flex flex-col'>
                    <p className='font-semibold'>OT Creadas</p>
                    <span className='font-bold text-3xl'>{cantCitas?.otCreadas ? cantCitas?.otCreadas : 0 }</span>
                </div>
                <div className='px-5 py-2 bg-green-500 min-w-[10rem] text-center text-white rounded-md flex flex-col'>
                    <p className='font-semibold'>OT en Elevadores</p>
                    <span className='font-bold text-3xl'>{cantCitas?.otElevadores ? cantCitas?.otElevadores : 0 }</span>
                </div>
                <div className='px-5 py-2 bg-yellow-400 min-w-[10rem] text-center text-white rounded-md flex flex-col'>
                    <p className='font-semibold'>OT Pendientes</p>
                    <span className='font-bold text-3xl'>{cantCitas?.otPendiente ? cantCitas?.otPendiente : 0 }</span>
                </div>
            </section>
      </div>
      <div className="flex justify-center items-center bg-gray-100 min-w-[12rem] shadow-md rounded-sm py-3 px-5 mb-5">
        <section className='grid gap-y-2 place-items-center'>
              <section className='grid place-items-center'>
                  <div>
                    <p className='font-bold text-center'>Avance:</p>
                  </div>
                  <div className={`w-[80px] h-[80px] mt-1`}>
                      <ProgressBar value={progress ? progress : 0} text={progress === Infinity || NaN ? 0 : (progress ? parseInt(progress) : 0)} />
                  </div>
                </section>
        </section>
      </div>
    </div>
  )
}

export default InformacionTecnico
