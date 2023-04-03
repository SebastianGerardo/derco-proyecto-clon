import React, { useEffect, useState } from 'react'
import { ModalElevador } from './ModalElevador'
import { TraeElevadores } from '../../../../helpers/ApiAsignacion'

const Elevadores = ({ data}) => {
  const [elevadores, setElevadores] = useState([])
  useEffect(() => {
    TraeElevadores().then(res => setElevadores(res.data))
  }, [data])
  console.log(elevadores)
  return (
    <div>
      <table className='flex gap-4 text-center'>
        {elevadores.length > 0 && (
          elevadores.map((ele) => (
            <tr className='flex flex-col gap-5'>
              <th className='p-5 bg-gray-500 text-white min-w-[10rem] rounded-md'>{ele.elevador.nombre}</th>
              <td className='p-5 bg-red-600 text-white min-w-[10rem] rounded-md min-h-[10rem]'>{
                ele.servicios?.length > 0 && (
                  ele.servicios.map((res)=>(
                      <div>
                        <p>OT <span>{res.servicio?.ot}</span></p>
                        <p>TECNICO <span>{res.servicio?.ot}</span></p>
                        <p>HORA ESTIMADA DE ENTREGA <span>{res.servicio?.ot}</span></p>
                        <p>ESTADO DE SERVICIO <span>{res.servicio?.ot}</span></p>
                      </div>
                    ))
                ) 
              }
              </td>
              <td className='p-5 bg-purple-700 text-white min-w-[10rem] rounded-md min-h-[10rem]'>Columna 1</td>
              <td className='p-5 bg-yellow-500 text-white min-w-[10rem] rounded-md min-h-[10rem]'>Columna 1</td>
              <ModalElevador data={data} elevadores={elevadores.elevador?.id} />
            </tr>
          ))
        )}

      </table>
    </div>
  )
}

export default Elevadores
