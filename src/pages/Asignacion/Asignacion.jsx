import { Outlet, NavLink } from "react-router-dom";
import React from 'react'

const Asignacion = () => {
  return (
    <div className="mt-2">
      <div className="flex gap-2">
        <NavLink
        to='/dashboard/recepcion'
        className={({ isActive, isPending }) =>
             isPending ? "" : isActive ? "p-1 w-[16rem] text-center bg-black text-white rounded-md" : "p-1 w-[16rem] text-center bg-gray-100 text-white rounded-md"
            }
        >
            Asignacion de Tecnico Mecanico
        </NavLink>
        <NavLink
        to='/dashboard/asignacion/servicio'
        className={({ isActive, isPending }) =>
             isPending ? "" : isActive ? "p-1 w-[16rem] text-center bg-black text-white rounded-md" : "p-1 w-[16rem] text-center bg-gray-400 text-white rounded-md"
            }
        >
            Asignacion de Servicio
        </NavLink>
      </div>

      <section>
          <Outlet />
      </section>
    </div>
  )
}

export default Asignacion