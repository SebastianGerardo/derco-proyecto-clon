import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/ContextDerco";
import "../../index.css";

export const BarraMenu = () => {
  const { UsuarioLogin } = useContext(UserContext);
  const permisos = UsuarioLogin?.usuario?.tipo?.permisos;
  const permisosUrl = permisos?.[0].modulo.url;

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [style, setStyle] = useState(false)

  function toggleMenu() {
    if (isMenuOpen) {
      setStyle(false)
      setTimeout(() => {
        setIsMenuOpen(false);
      }, 100);
    } else {
      setStyle(true)
      setIsMenuOpen(true);
    }
  }
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
            className="mx-auto h-16 max-h-[4rem] object-cover hidden sg"
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
                          // onClick={toggleMenu}
                          key={per.id}
                          className="flex flex-col text-white font-medium text-lg"
                          to={per.modulo.url}
                          state={{ logged: true }}
                          style={({ isActive }) =>
                            isActive ? { color: "#3e3e3e" } : undefined
                          }
                        >
                          {({ isActive, isPending }) => (
                            <>
                              <div className="flex items-center gap-6 font-medium text-lg py-3">
                                <i onClick={() => {console.log(isActive)}} className="fa-solid fa-address-card"></i>
                                <div className="flex items-center gap-1">
                                  {per.modulo.nombre}
                                  <svg onClick={toggleMenu} className={`z-999 transition-all ease-in-out duration-150 ${style ? "-rotate-0 mt-1 " : "-rotate-180 mt-1 "} `} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995" stroke={`${isActive ? "#292D32" : "#FFF"}`} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                              </div>
                              <div className={`transition-all ease-in-out duration-150 ${style ? "-translate-y-0 opacity-100" : "-translate-y-24 opacity-0"}`}>
                                {isMenuOpen && <Submenu />}
                              </div>
                            </>
                          )}
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
    <ul className="relative list-disc left-10 w-40 text-lg text-white font-medium rounded-lg ">
      <li>
        <NavLink
          state={{ logged: true }}
          style={({ isActive }) =>
            isActive ? { backgroundColor: "#3e3e3e", color: "#fff" } : undefined
          }
          to="asignacion/servicios"
          className="block px-4 py-2 text-white"
        >
          Servicio
        </NavLink>
      </li>
      <li>
        <NavLink
          state={{ logged: true }}
          style={({ isActive }) =>
            isActive ? { backgroundColor: "#3e3e3e", color: "#fff" } : undefined
          }
          to="asignacion/elevadores"
          className="block px-4 py-2 text-white"
        >
          Elevadores
        </NavLink>
      </li>
    </ul>
  );
}