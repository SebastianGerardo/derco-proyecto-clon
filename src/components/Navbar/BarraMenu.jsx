import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/ContextDerco";

export const BarraMenu = () => {
  /**Agregando Roles */
  const { UsuarioLogin } = useContext(UserContext);
  const permisos = UsuarioLogin?.usuario?.tipo.permisos;
  return (
    <div className="h-full overflow-hidden relative flex flex-col justify-center z-999">
      <div className="lg:block hidden w-full h-16 absolute top-0">
        <img
          src="https://app.elipse.ai/hs-fs/hubfs/Derco%20Center%20Logo%20Blanco.png?width=1920&name=Derco%20Center%20Logo%20Blanco.png"
          alt="Derco Center"
          className="mx-auto min-w-full min-h-full object-cover"
        />
      </div>
      <div className="space-y-2 px-6 flex flex-col justify-center h-full ">
        {permisos !== undefined &&
          permisos.map((per) => (
            <NavLink key={per.id}
              className="flex items-center gap-6 text-white font-medium text-lg py-3"
              to={per.modulo.url}
              state={{ logged: true }}
              style={({ isActive }) =>
                isActive ? { color: "#3e3e3e" } : undefined
              }
            >
              <i className="fa-solid fa-address-card"></i>{per.modulo.nombre}
            </NavLink>
          ))}
      </div>
    </div>
  );
};
