import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/ContextDerco";
import { BarraMenu } from "./BarraMenu";

export const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate()

  const { UsuarioLogin } = useContext(UserContext);
  const permisos = UsuarioLogin?.usuario?.tipo?.permisos;
  const modulos = permisos?.length <= 3 ? false : true;
  const permisosUrl = permisos?.[0].modulo.url

  const [lastLocation, setLastLocation] = useState(null);

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      if (lastLocation) {
        navigate(lastLocation, {
          state: {
            logged: true
          }
        });
      } else {
        navigate(permisosUrl, {
          state: {
            logged: true
          }
        });
      }
    } else {
      setLastLocation(location.pathname);
    }
  }, [location]);

  return (
    <>
      {
        modulos 
          &&
        (
        <div className={`space-y-2 shadow-lg bg-redDerco hidden lg:block xl:block h-screen transition-all w-16 hover:w-60`} >
          <BarraMenu/>
        </div>
        )
      }
    </>
    
  );
};
