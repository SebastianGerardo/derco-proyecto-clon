import { Outlet, NavLink } from "react-router-dom";
import React from 'react'

const Asignacion = () => {
  return (
    <div className="mt-2 grow flex flex-col">
      <div className="flex gap-2">
        <NavLink
        //Esta ruta solo es de prueba, al tener el usuario con rol de admin esta deberá ser cambiada a su correspondiente ruta
        to='/dashboard/asignacion' 
        state={{ logged: true }}
        className={({ isActive, isPending }) =>
             isPending ? "" : isActive ? "p-1 w-[16rem] text-center bg-black text-white rounded-t-md" : "p-1 w-[16rem] text-center bg-gray-100 text-white rounded-t-md"
            }
        end
        >
            Asignacion de Tecnico Mecanico
        </NavLink>
        <NavLink
        to='/dashboard/asignacion/servicios'
        state={{ logged: true }}
        className={({ isActive, isPending }) =>
             isPending ? "" : isActive ? "p-1 w-[16rem] text-center bg-black text-white rounded-t-md" : "p-1 w-[16rem] text-center bg-gray-400 text-white rounded-t-md"
            }
        >
            Asignacion de Servicio
        </NavLink>
      </div>

      <section className="grow flex flex-col">
          <Outlet />
      </section>
    </div>
  )
}

export default Asignacion