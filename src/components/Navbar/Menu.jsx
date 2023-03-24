import { useContext } from "react";
import { UserContext } from "../../context/ContextDerco";
import { BarraMenu } from "./BarraMenu";

export const Menu = () => {
  const { UsuarioLogin } = useContext(UserContext);
  const permisos = UsuarioLogin?.usuario?.tipo?.permisos;
  const modulos = permisos?.length <= 3 ? false : true;
  
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
