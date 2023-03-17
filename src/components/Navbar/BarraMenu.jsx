import { NavLink } from "react-router-dom";

export const BarraMenu = () => {
    return (
        <div className="h-full overflow-hidden relative flex flex-col justify-center z-999">
            <div className="lg:block hidden w-full h-16 absolute top-0">
                <img
                    src="https://app.elipse.ai/hs-fs/hubfs/Derco%20Center%20Logo%20Blanco.png?width=1920&name=Derco%20Center%20Logo%20Blanco.png"
                    alt="Desarrollo Global"
                    className="mx-auto min-w-full min-h-full object-cover"
                />
            </div>
            <div className="space-y-2 px-6 flex flex-col justify-center h-full ">
            <NavLink className="flex items-center gap-6 text-white font-medium text-lg py-3" to={"/dashboard/abordaje"} state={{logged: true}} style={({ isActive }) => isActive ? {color: '#3e3e3e'} : undefined}><i className="fa-solid fa-address-card"></i>Abordaje</NavLink>
                <NavLink className="flex items-center gap-6 text-white font-medium text-lg py-3" to={"/dashboard/recepcion"} state={{logged: true}} style={({ isActive }) => isActive ? {color: '#3e3e3e'} : undefined}><i className="fa-solid fa-signal"></i>Recepcion</NavLink>
                <NavLink className="flex items-center gap-6 text-white font-medium text-lg py-3" to={"/dashboard/almacen"} state={{logged: true}} style={({ isActive }) => isActive ? {color: '#3e3e3e'} : undefined}><i className="fa-solid fa-briefcase"></i>Almacen</NavLink>
                <NavLink className="flex items-center gap-6 text-white font-medium text-lg py-3" to={"/dashboard/servicio"} state={{logged: true}} style={({ isActive }) => isActive ? {color: '#3e3e3e'} : undefined}><i className="fa-solid fa-briefcase"></i>Servicio</NavLink>
                <NavLink className="flex items-center gap-6 text-white font-medium text-lg py-3" to={"/dashboard/lavado"} state={{logged: true}} style={({ isActive }) => isActive ? {color: '#3e3e3e'} : undefined}><i className="fa-solid fa-briefcase"></i>Lavado</NavLink>
                <NavLink className="flex items-center gap-6 text-white font-medium text-lg py-3" to={"/dashboard/secado"} state={{logged: true}} style={({ isActive }) => isActive ? {color: '#3e3e3e'} : undefined}><i className="fa-solid fa-briefcase"></i>Secado</NavLink>
                <NavLink className="flex items-center gap-6 text-white font-medium text-lg py-3" to={"/dashboard/entrega"} state={{logged: true}} style={({ isActive }) => isActive ? {color: '#3e3e3e'} : undefined}><i className="fa-solid fa-briefcase"></i>Entrega</NavLink>
            </div>
        </div>
    );
};


