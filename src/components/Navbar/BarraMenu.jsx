import { Link } from "react-router-dom";

export const BarraMenu = () => {
    return (
        <div className="w-full">
            <div className="p-5">
                <img
                    src="https://app.elipse.ai/hs-fs/hubfs/Derco%20Center%20Logo%20Blanco.png?width=1920&name=Derco%20Center%20Logo%20Blanco.png"
                    alt="Desarrollo Global"
                    className="mx-auto "
                />
            </div>
            <div className="mb-5 space-y-2 px-6">
                <Link className="flex items-center gap-5 text-white font-medium text-lg mt-5" to={"/dashboard/anfitrion"}><i className="fa-solid fa-briefcase"></i>Anfitrion</Link>
            </div>
        </div>
    );
};
