export const InformacionSede = ({dataAnfitrion}) => {
  return (
    <div className="bg-gray-100 shadow-md rounded-sm py-3 px-5 mt-5">
      <div className="flex lg:gap-16 xl:gap-16 gap-3 flex-wrap">
        <div>
          <p className="font-bold">
            Taller: <span className="font-normal">Surco</span>
          </p>
        </div>
        <div>
          <p className="font-bold">
            Anfitrion: <span className="font-normal">Luis Flores</span>
          </p>
        </div>
        <div>
          <p className="font-bold">
            Fecha / Hora:{" "}
            <span className="font-normal">13-03-2023 10:39AM</span>
          </p>
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center">
        <div>
          <div className="flex mt-3">
            <div className="bg-black text-white lg:w-[481.31px] xl:w-[481.31px] pl-3 w-full">
              <p className="font-bold">Estado de citas</p>
            </div>
          </div>
          <div className="flex gap-[1px] mt-[1px] flex-wrap w-full">
            <div className="py-1 px-3 text-white bg-blue-500 w-full lg:w-auto xl:w-auto">
              <p className="text-lg text-center font-semibold">Citas Cargadas</p>
              <p className="text-lg text-center font-semibold">{dataAnfitrion.length}</p>
            </div>
            <div className="py-1 px-3 text-white bg-green-500 w-full lg:w-auto xl:w-auto">
              <p className="text-lg text-center font-semibold">Citas Programadas</p>
              <p className="text-lg text-center font-semibold">38</p>
            </div>
            <div className="py-1 px-3 text-white bg-yellow-500 w-full lg:w-auto xl:w-auto">
              <p className="text-lg text-center font-semibold">Citas Pendientes</p>
              <p className="text-lg text-center font-semibold">20</p>
            </div>
          </div>
        </div>
        <div>
            Avance
        </div>
        <div>
            <button>Cargar archivos</button>
        </div>
      </div>
    </div>
  );
};
