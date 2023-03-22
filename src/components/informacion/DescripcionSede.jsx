import React from 'react'
import {useLocation} from 'react-router-dom'

export const DescripcionSede = () => {
  const location = useLocation();

  const modules = {
    "/dashboard/anfitrion": "Abordaje",
    "/dashboard/recepcion": "Recepción",
    "/dashboard/almacen": "Almacén",
    "/dashboard/asignacion": "Asignación",
    "/dashboard/asignacion/servicio": "Asignación",
  }
  return (
    <div className="grid grid-cols-2 lg:flex lg:flex-row gap-4 lg:gap-16 flex-wrap w-full text-center">
      <div className='lg:hidden'>
        <p className="font-bold">
          Módulo: 
        </p>
        <span className='font-normal'>{modules[location.pathname]}</span>
      </div>
      <div className='lg:flex lg:gap-1'>
        <p className="font-bold">
          Taller: 
        </p>
        <span className="font-normal">Surco</span>
      </div>
      <div className='lg:flex lg:gap-1'>
        <p className="font-bold">
          Anfitrion: 
        </p>
        <span className="font-normal">Luis Flores</span>
      </div>
      <div className='lg:flex lg:gap-1'>
        <p className="font-bold">
          Fecha / Hora:{" "}
        </p>
        <span className="font-normal">13-03-2023 10:39AM</span>
      </div>
    </div>
  )
}

