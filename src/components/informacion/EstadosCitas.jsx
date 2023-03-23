export const EstadosCitas = ({cantCitas}) => {
  return (
    <div className="flex w-full flex-wrap items-center justify-center lg:justify-between">
      <div className="mt-5">

        <div className="flex flex-col gap-[1px] mt-[1px] lg:flex-row lg:w-full">
          <div className="py-1 px-3 text-black flex items-center gap-2 lg:flex lg:gap-1 rounded-md">
            <div className="w-5 h-5 bg-blue-400 rounded-md"></div>
            <p className="text-base text-center">
              <span className="hidden lg:inline">Citas</span> Cargadas:
            </p>
            <p className="text-base text-center font-semibold">
                {cantCitas.total === undefined ? 0 : cantCitas.total}
            </p>
          </div>
          <div className="py-1 px-3 text-black flex items-center gap-2 lg:gap-2 rounded-md">
            <div className="w-5 h-5 bg-green-400 rounded-md"></div>
            <p className="text-base text-center">
              <span className="hidden lg:inline">Citas</span> Programadas:
            </p>
            <p className="text-base text-center font-semibold">
              {cantCitas.programados === undefined ? 0 : cantCitas.programados}
            </p>
          </div>
          <div className="py-1 px-3 text-black flex items-center gap-2 lg:gap-2 rounded-md">
            <div className="w-5 h-5 bg-yellow-400 rounded-md"></div>
            <p className="text-base text-center">
              <span onClick={() => console.log(null == false)} className="hidden lg:inline">Citas</span> Pendientes:
            </p>
            <p className="text-base text-center font-semibold">
              {cantCitas.pendientes === undefined ? 0 : cantCitas.pendientes}
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};
