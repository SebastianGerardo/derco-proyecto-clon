export const InformacionSede = () => {
  return (
    <div className="bg-gray-100 shadow-md rounded-sm py-3 px-5 my-4">
      <div className="flex gap-16 flex-wrap">
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
            <div className="bg-black text-white w-[469.41px] pl-3">
              <p className="font-bold">Estado de citas</p>
            </div>
          </div>
          <div className="flex gap-[1px] mt-[1px]">
            <div className="py-1 px-3 text-white bg-blue-500">
              <p className="text-lg text-center">Citas Cargadas</p>
              <p className="text-lg text-center">38</p>
            </div>
            <div className="py-1 px-3 text-white bg-green-500">
              <p className="text-lg text-center">Citas Programadas</p>
              <p className="text-lg text-center">38</p>
            </div>
            <div className="py-1 px-3 text-white bg-yellow-500">
              <p className="text-lg text-center">Citas Pendientes</p>
              <p className="text-lg text-center">20</p>
            </div>
          </div>
        </div>
        <div>
            Avance
        </div>
      </div>
    </div>
  );
};
