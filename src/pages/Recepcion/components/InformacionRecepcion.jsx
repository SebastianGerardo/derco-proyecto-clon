import React from 'react'
import { DescripcionSede } from '../../../components/informacion/DescripcionSede'
import ProgressBar from '../../../components/Radial Progresivo/ProgressBar'

const InformacionRecepcion = () => {
  return (
    <div className='flex justify-between w-full'>
      <div className="flex gap-4 items-center bg-gray-100 shadow-md rounded-sm py-3 px-5 mb-5">
            <table className='flex gap-3'>
                <td className='px-5 py-2 bg-yellow-400 min-w-[10rem] text-center text-white rounded-md flex flex-col'>
                    <p className='font-semibold'>Citas Asignadas</p>
                    <span className='font-bold text-3xl'>10</span>
                </td>
                <td className='px-5 py-2 bg-purple-700 min-w-[10rem] text-center text-white rounded-md flex flex-col'>
                    <p className='font-semibold'>OT Creadas</p>
                    <span className='font-bold text-3xl'>5</span>
                </td>
                <td className='px-5 py-2 bg-green-500 min-w-[10rem] text-center text-white rounded-md flex flex-col'>
                    <p className='font-semibold'>OT Asignadas</p>
                    <span className='font-bold text-3xl'>5</span>
                </td>
            </table>
            <section className='grid place-items-center'>
              <div>
                <p className='font-bold text-center'>Avance:</p>
              </div>
              <div className={`w-[80px] h-[80px] mt-1`}>
                  <ProgressBar value={50} text={50} />
              </div>
            </section>
      </div>
      <div className="flex bg-gray-100 min-w-[15rem] shadow-md rounded-sm py-3 px-5 mb-5">
        <section className='grid place-items-center'>
          <div>
            <p className='font-bold text-start text-base'>Unidades listas para la entrega:</p>
          </div>
          <table className='flex gap-3'>
                <td className='px-5 py-2 bg-green-500 min-w-[10rem] text-center text-white rounded-md flex flex-col'>
                    <p>Unidades Listas</p>
                    <span className='font-bold text-3xl'>3</span>
                </td>
          </table>
        </section>
      </div>
    </div>
  )
}

export default InformacionRecepcion
