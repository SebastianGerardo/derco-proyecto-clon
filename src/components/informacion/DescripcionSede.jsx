import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { UserContext } from '../../context/ContextDerco';


export const DescripcionSede = () => {
  const [date, setDate] = useState(new Date());

  const { UsuarioLogin, modules } = useContext(UserContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const location = useLocation();
  
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
        <span className="font-normal">
          {UsuarioLogin?.usuario?.centro?.distrito}
        </span>
      </div>
      <div className='lg:flex lg:gap-1'>
        <p className="font-bold">
          Anfitrion:
        </p>
        <span className="font-normal">{UsuarioLogin?.usuario?.nombres} {UsuarioLogin?.usuario?.apellidos}</span>
      </div>
      <div className='lg:flex lg:gap-1'>
        <p className="font-bold">
          Fecha y Hora:  
        </p>
        <span className="font-normal">{date.toLocaleString()}</span>
      </div>
    </div>
  )
}

