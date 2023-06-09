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
      "color": "bg-[#EAB308CC]"
    },
    "2": {
      "nombre": "En proceso",
      "color": "bg-[#DC2626CC]"
    },
    "3": {
      "nombre": "En pausa",
      "color": "bg-[#9B5DA2CC]"
    },
    "4": {
      "nombre": "Finalizado",
      "color": "bg-[#4AC695CC]"
    },
  }

  const nombresElevadores = elevadores.map((elevador) => {
    return {
      elevadorId: elevador.elevador.id,
      nombre: elevador.elevador.nombre,
      tecnico: elevador.elevador.tecnico.nombres.split(" ", 1) + " " + elevador.elevador.tecnico.apellidos.split(" ", 1) 
    }
  });

  const traeEstado = (data) =>{
    let dataParseada = JSON.parse(data?.ordenServicios)
    const filtroUbicacion = dataParseada.filter(res=> res?.nombre === data.ubicacion)
    let resultado = filtroUbicacion.find(res=> res?.nombre === data.ubicacion)
    return resultado?.terminado
  }


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
                         className={`flex flex-col gap-1 p-4 m-0 mb-2 min-h-[50px]  rounded-md text-white font-bold ${EstadoServicio[traeEstado(res)]?.color}`}
                         >
                          <p>OT:<span className='ml-1 font-normal'>{res.servicio?.ot}</span></p>
                          <p>Técnico:<span className='ml-1 font-normal'>{ele.elevador.tecnico?.nombres} {ele.elevador.tecnico?.apellidos}</span></p>
                          <p>Hora E. de entrega:<span className='ml-1 font-normal'>{res.servicio?.horaEstimadaEntrega}</span></p>
                          <p>E. del servicio:<span className='ml-1 font-normal'>{EstadoServicio[traeEstado(res)]?.nombre}</span></p>
                        </div>
                      )))}
                  </div>
                </div>
              <ModalElevador data={data} dataElevador={ele.elevador} closeElevadores={closeElevadores} nombresElevadores={nombresElevadores}/>
            </div>
          ))
        )}
      </section>
  )
}

export default Elevadores

