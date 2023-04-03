import React, { useEffect, useState } from 'react'
import { ModalElevador } from './ModalElevador'
import { TraeElevadores } from '../../../../helpers/ApiAsignacion'

const Elevadores = ({ data, closeElevadores }) => {
  const [elevadores, setElevadores] = useState([])
  
  useEffect(() => {
    TraeElevadores().then(res => setElevadores(res.data))
  }, [data])

  const colorEstado = {
    "Pendiente": "bg-yellow-600",
    "En proceso": "bg-red-600",
    "En pausa": "bg-purple-600",
  }

  return (
    <div>
      <section className='flex gap-4 text-center'>
        {elevadores.length > 0 && (
          elevadores.map((ele) => (
            <div key={ele.elevador.id} className='flex flex-col gap-3'>
                  {/* NOMBRE DEL ELEVADOR */}
                <div className='p-5 bg-gray-500 text-white min-w-[10rem] rounded-md'>{ele.elevador.nombre}</div>
                  {/* ELEVADORES */}
                <div className='flex flex-col gap-y-4  text-white '>{
                    // CONTENIDO DE LOS ELEVADORES
                  ele.servicios?.length > 0 && (
                    ele.servicios.map((res)=>(
                        <div onClick={() => console.log(res)} key={res.id} className={`flex flex-col ${'bg-red-600'} p-4 gap-y-2 text-start min-w-[10rem] rounded-md min-h-[10rem]`}>
                          <p className='flex gap-x-1 font-normal'>
                            <span className='font-bold'>Ot:</span> 
                            {res.servicio?.ot}
                          </p>
                          <p className='flex gap-x-1 font-normal'>
                            <span className='font-bold'>Tecnico:</span>
                            {ele.elevador.tecnico?.nombres} {ele.elevador.tecnico?.apellidos}
                          </p>
                          <p className='font-bold'>
                            Hora E. de entrega:
                            <span className='ml-1 font-normal'>{res.servicio?.horaEstimadaEntrega}</span>
                          </p>
                          <p className='flex gap-x-1 font-normal'>
                            <span className='font-bold'>E. del servicio:</span>
                            {JSON.parse(res.ordenServicios)[0]}
                          </p>  
                        </div>
                      ))
                  ) 
                }
                </div>
              {/* <td className='p-5 bg-purple-700 text-white min-w-[10rem] rounded-md min-h-[10rem]'>Columna 1</td> */}
              {/* <td className='p-5 bg-yellow-500 text-white min-w-[10rem] rounded-md min-h-[10rem]' onClick={() => console.log(ele)}>Columna 1</td> */}
              <ModalElevador data={data} dataElevadores={ele.elevador} closeElevadores={closeElevadores}/>
            </div>
          ))
        )}
      </section>
    </div>
  )
}

export default Elevadores
