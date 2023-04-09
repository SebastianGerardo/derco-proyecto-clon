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
      <section className='flex justify-start h-full overflow-auto'>
        {elevadores.length > 0 && (
          elevadores.map((ele) => (
            <div key={ele.elevador.id} className='flex flex-col items-center'>
                  {/* NOMBRE DEL ELEVADOR */}
                <h2 className='p-5 bg-gray-500 text-white w-[250px] rounded-md text-center'>{ele.elevador.nombre}</h2>
                  {/* ELEVADORES */}
                <div className='m-2'>
                  <div className='p-[4px] w-[250px]'>
                  {ele.servicios?.length > 0 && (
                    ele.servicios.map((res)=>(
                        <div 
                         key={res.id} 
                         className={`flex flex-col gap-1 p-4 m-0 mb-2 min-h-[50px]  rounded-md text-white font-bold ${EstadoServicio[res.estado]?.color}`}
                         >
                          <p>OT:<span className='ml-1 font-normal'>{res.servicio?.ot}</span></p>
                          <p>Técnico:<span className='ml-1 font-normal'>{ele.elevador.tecnico?.nombres} {ele.elevador.tecnico?.apellidos}</span></p>
                          <p>Hora E. de entrega:<span className='ml-1 font-normal'>{res.servicio?.horaEstimadaEntrega}</span></p>
                          <p>E. del servicio:<span className='ml-1 font-normal'>{EstadoServicio[res.estado]?.nombre}</span></p>
                        </div>
                      )))}
                  </div>
                </div>
              <ModalElevador data={data} dataElevador={ele.elevador} closeElevadores={closeElevadores} idsElevadores={idsElevadores}/>
            </div>
          ))
        )}
      </section>
  )
}

export default Elevadores

