import { useEffect} from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/ContextDerco";
import '../../index.css'

export const BarraMenu = () => {
  
  const location = useLocation()
  const navigate = useNavigate()

  const { UsuarioLogin } = useContext(UserContext);
  const permisos = UsuarioLogin?.usuario?.tipo?.permisos;
  const permisosUrl = permisos?.[0].modulo.url


  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate(permisosUrl, {
        state: {
          logged: true
        }
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
            permisos.map((per) => (
              per.modulo.visible === "1" && (
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
              )
            ))}
        </div>
      </section>
    </div>
  );
};
