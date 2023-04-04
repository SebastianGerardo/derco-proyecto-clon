import { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/ContextDerco";
import "../../index.css";

export const BarraMenu = () => {
  const { UsuarioLogin } = useContext(UserContext);
  const permisos = UsuarioLogin?.usuario?.tipo?.permisos;
  const permisosUrl = permisos?.[0].modulo.url;

  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate(permisosUrl, {
        state: {
          logged: true,
        },
      });
    }
  }, [location]);

  return (
    <div className="h-screen overflow-auto lg:overflow-hidden relative flex flex-col justify-center z-999">
      <div className="lg:block hidden w-full h-16 absolute top-0">
        <img
          src="https://app.elipse.ai/hs-fs/hubfs/Derco%20Center%20Logo%20Blanco.png?width=1920&name=Derco%20Center%20Logo%20Blanco.png"
          alt="Derco Center"
          className="mx-auto min-w-full min-h-full object-cover hidden sg"
        />
      </div>
      <section className="h-[40rem] min-h-[40rem] w-full flex flex-col justify-center">
        <div className="space-y-2 px-6 flex flex-col justify-center lg:h-full sticky top-0">
          {permisos !== undefined &&
            permisos.map((per) => {
              if (per.modulo.visible === "1") {
                if (per.modulo.nombre === "Asignación") {
                  return (
                    <NavLink
                      key={per.id}
                      className="flex items-center gap-6 text-white font-medium text-lg py-3"
                      to={per.modulo.url}
                      state={{ logged: true }}
                      style={({ isActive }) =>
                        isActive ? { color: "#3e3e3e" } : undefined
                      }
                    >
                      <i className="fa-solid fa-address-card"></i>
                      {per.modulo.nombre}
                    </NavLink>
                  );
                } else {
                  return (
                    <NavLink
                      key={per.id}
                      className="flex items-center gap-6 text-white font-medium text-lg py-3"
                      to={per.modulo.url}
                      state={{ logged: true }}
                      style={({ isActive }) =>
                        isActive ? { color: "#3e3e3e" } : undefined
                      }
                    >
                      <i className="fa-solid fa-address-card"></i>
                      {per.modulo.nombre}
                    </NavLink>
                  );
                }
              }
              return null;
            })}
        </div>
      </section>
    </div>
  );
};

// AUN FALTA IMPLEMENTAR EL SUBMENU

function Submenu() {
  return (
    <ul className="absolute right-0 w-40 py-2 mt-2 bg-white border rounded-lg shadow-xl">
      <li>
        <NavLink
          to="dashboard/asignacion/servicios"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
        >
          Seguimiento de Servicio
        </NavLink>
      </li>
      <li>
        <NavLink
          to="dashboard/asignacion/elevadores"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
        >
          Seguimiento de Elevadores
        </NavLink>
      </li>
    </ul>
  );
}