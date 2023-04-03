import React from 'react'
import ProgressBar from '../../../../components/Radial Progresivo/ProgressBar'

const InformacionTecnico = () => {
  return (
    <div className='flex flex-col gap-4 sm:flex-col gp:flex-col lg:flex-row justify-between w-full'>
      <div className="flex gap-4 items-center justify-center bg-gray-100 shadow-md rounded-sm py-3 px-5 mb-5">
            <section className='flex flex-col md:flex-row lg:flex-row gap-3'>
                <div className='px-5 py-2 bg-yellow-400 min-w-[10rem] text-center text-white rounded-md flex flex-col'>
                    <p className='font-semibold'>Citas Creadas</p>
                    <span className='font-bold text-3xl'>20</span>
                </div>
                <div className='px-5 py-2 bg-purple-700 min-w-[10rem] text-center text-white rounded-md flex flex-col'>
                    <p className='font-semibold'>OT Creadas</p>
                    <span className='font-bold text-3xl'>15</span>
                </div>
                <div className='px-5 py-2 bg-green-500 min-w-[10rem] text-center text-white rounded-md flex flex-col'>
                    <p className='font-semibold'>OT en Elevadores</p>
                    <span className='font-bold text-3xl'>10</span>
                </div>
                <div className='px-5 py-2 bg-yellow-400 min-w-[10rem] text-center text-white rounded-md flex flex-col'>
                    <p className='font-semibold'>OT Pendientes</p>
                    <span className='font-bold text-3xl'>5</span>
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
                      <ProgressBar value={50} text={50} />
                  </div>
                </section>
        </section>
      </div>
    </div>
  )
}

export default InformacionTecnico
