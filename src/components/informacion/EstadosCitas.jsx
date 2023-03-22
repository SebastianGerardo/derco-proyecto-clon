import { useEffect, useState } from "react";
import { CantCitas } from "../../helpers/ApiAnfitrion";

export const EstadosCitas = () => {
  const [cantCitas, setCantCitas] = useState([])
  const [bandera, setBandera] = useState(false)
  useEffect(() => {
    CantCitas().then(res => {
      if(res.statusCode === 200){
        setCantCitas(res.data) 
        setBandera(!bandera)
      } 
    })
  }, [bandera])
  console.log(cantCitas)
  return (
    <div className="flex w-full flex-wrap items-center justify-start lg:justify-between">
      <div className="mt-5">
        <div className="flex flex-col gap-[1px] mt-[1px] lg:flex-row lg:w-full">
          <div className="py-1 px-3 text-black flex items-center gap-2 lg:block lg:gap-0 lg:text-white lg:bg-blue-500 rounded-md">
            <div className="w-5 h-5 bg-blue-400 rounded-md lg:hidden"></div>
            <p className="text-base text-center">
              <span className="hidden lg:inline">Citas</span> Cargadas
            </p>
            <p className="text-base text-center font-semibold">
                {cantCitas.total}
            </p>
          </div>
          <div className="py-1 px-3 text-black flex items-center gap-2 lg:block lg:gap-0 lg:text-white lg:bg-green-500 rounded-md">
            <div className="w-5 h-5 bg-green-400 rounded-md lg:hidden"></div>
            <p className="text-base text-center">
              <span className="hidden lg:inline">Citas</span> Programadas
            </p>
            <p className="text-base text-center">{cantCitas.programados}</p>
          </div>
          <div className="py-1 px-3 text-black flex items-center gap-2 lg:block lg:gap-0 lg:text-white lg:bg-yellow-500 rounded-md">
            <div className="w-5 h-5 bg-yellow-400 rounded-md lg:hidden"></div>
            <p className="text-base text-center">
              <span className="hidden lg:inline">Citas</span> Pendientes
            </p>
            <p className="text-base text-center">{cantCitas.pendientes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
