import { useContext } from "react";
import { UserContext } from "../../context/ContextDerco";
import { BarraMenu } from "./BarraMenu";

export const Menu = () => {
  /**Agregando Roles */
  const { UsuarioLogin } = useContext(UserContext);
  const permisos = UsuarioLogin?.usuario?.tipo?.permisos;
  const modulos = permisos?.length <= 3 ? "lg:hidden xl:hidden" : "lg:block xl:block"
  return (
    <div className={`space-y-2 shadow-lg bg-redDerco hidden ${modulos} h-screen transition-all w-16 hover:w-60`} >
      <BarraMenu permisos={permisos} modulos={modulos}/>
    </div>
  );
};
