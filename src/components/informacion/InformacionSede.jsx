import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useState } from "react";

export const InformacionSede = ({dataAnfitrion}) => {

  const totalTasks = 38;
  const [completedTasks, setCompletedTasks] = useState(18);

  const progress = (completedTasks / totalTasks) * 100;

  function handleTaskComplete() {
    setCompletedTasks(completedTasks + 1);
  }

  return (
    <div className="flex justify-between items-center bg-gray-100 shadow-md rounded-sm py-3 px-5 mt-5">
      <div>
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
        <div className="flex w-full flex-wrap items-center justify-between">
          <div>
            <div className="flex mt-3">
              <div className="bg-black text-white w-[469.41px] pl-3">
                <p className="font-bold">Estado de citas</p>
              </div>
            </div>
            <div className="flex gap-[1px] mt-[1px]">
              <div className="py-1 px-3 text-white bg-blue-500">
                <p className="text-lg text-center">Citas Cargadas</p>
	          <p className="text-lg text-center font-semibold">{dataAnfitrion.length}</p>
              </div>
              <div className="py-1 px-3 text-white bg-green-500">
                <p className="text-lg text-center">Citas Programadas</p>
                <p className="text-lg text-center">18</p>
              </div>
              <div className="py-1 px-3 text-white bg-yellow-500">
                <p className="text-lg text-center">Citas Pendientes</p>
                <p className="text-lg text-center">20</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=''>
          <div>
            <p>Avance:</p>
          </div>
          <div className='w-[100px] h-[100px]'>
            <CircularProgressbar value={progress} text={`${parseInt(progress)}%`} />
          </div>
          <div>
            <button
            type="button"
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white border-green-600 border-2 border-solid transition-all ease-in duration-200 shadow-[.3rem_.3rem_1rem_#ccc,_-.3rem_-.3rem_1rem_#fff] hover:shadow-[.3rem_.3rem_1rem_#fff,_-.3rem_-.3rem_1rem_#ccc] active:shadow-[inset_.1rem_.1rem_1rem_#60A5FA,_inset_-.1rem_-.1rem_1rem_#6faaf2]"
            >
              <i class="fa-solid fa-user-plus mr-1"></i>
              Cargar Archivos
            </button>
          </div>
        </div>
    </div>
  );

};
