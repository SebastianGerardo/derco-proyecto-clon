import React from 'react'
import { ModalElevador } from './ModalElevador'

const Elevadores = () => {
  return (
    <div>
      <table className='flex gap-4 text-center'>
        <tr className='flex flex-col gap-5'>
            <th className='p-5 bg-gray-500 text-white min-w-[10rem] rounded-md'>Elevador 1</th>
            <td className='p-5 bg-red-600 text-white min-w-[10rem] rounded-md min-h-[10rem]'>Columna 1</td>
            <td className='p-5 bg-purple-700 text-white min-w-[10rem] rounded-md min-h-[10rem]'>Columna 1</td>
            <td className='p-5 bg-yellow-500 text-white min-w-[10rem] rounded-md min-h-[10rem]'>Columna 1</td>
            <ModalElevador />
        </tr>
        <tr className='flex flex-col gap-5'>
            <th className='p-5 bg-gray-500 text-white min-w-[10rem] rounded-md'>Elevador 2</th>
            <td className='p-5 bg-yellow-500 text-white min-w-[10rem] rounded-md min-h-[10rem]'>Columna 1</td>
            <ModalElevador />
        </tr>
        <tr className='flex flex-col gap-5'>
            <th className='p-5 bg-gray-500 text-white min-w-[10rem] rounded-md'>Elevador 3</th>
            <td className='p-5 bg-red-600 text-white min-w-[10rem] rounded-md min-h-[10rem]'>Columna 1</td>
            <ModalElevador />
        </tr>
        <tr className='flex flex-col gap-5'>
            <th className='p-5 bg-gray-500 text-white min-w-[10rem] rounded-md'>Elevador 4</th>
            <td className='p-5 bg-red-600 text-white min-w-[10rem] rounded-md min-h-[10rem]'>Columna 1</td>
            <td className='p-5 bg-yellow-500 text-white min-w-[10rem] rounded-md min-h-[10rem]'>Columna 1</td>
            <ModalElevador />
        </tr>
      </table>
    </div>
  )
}

export default Elevadores
