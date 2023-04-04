import React, { useEffect, useState } from 'react'
import { ModalElevador } from './ModalElevador'
import { TraeElevadores } from '../../../../helpers/ApiAsignacion'

const Elevadores = ({ data, closeElevadores }) => {
  const [elevadores, setElevadores] = useState([])

  useEffect(() => {
    TraeElevadores().then(res => setElevadores(res.data))
  }, [data])

  const EstadoServicio = {
    "1": {
      "nombre": "Pendiente",
      "color": "bg-yellow-500/80"
    },
    "2": {
      "nombre": "En proceso",
      "color": "bg-red-600"
    },
    "3": {
      "nombre": "En pausa",
      "color": "bg-purple-700"
    },
  }

  const idsElevadores = elevadores.map((elevador) => elevador.elevador.id);

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
                        <div key={res.id} className={`flex flex-col ${EstadoServicio[res.estado]?.color} p-4 gap-y-2 text-start min-w-[10rem] rounded-md min-h-[10rem]`}>
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
                            <span onClick={() => console.log(res.estado)} className='font-bold'>E. del servicio:</span>
                            {EstadoServicio[res.estado]?.nombre}
                          </p>  
                        </div>
                      ))
                  ) 
                }
                </div>
              <ModalElevador data={data} dataElevador={ele.elevador} closeElevadores={closeElevadores} idsElevadores={idsElevadores}/>
            </div>
          ))
        )}
      </section>
    </div>
  )
}

export default Elevadores

