import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useState } from "react";
import { DescripcionSede } from './DescripcionSede';
import { EstadosCitas } from './EstadosCitas';

export const InformacionSede = ({dataAnfitrion}) => {

  const totalTasks = 38;
  const [completedTasks, setCompletedTasks] = useState(18);

  const progress = (completedTasks / totalTasks) * 100;

  function handleTaskComplete() {
    setCompletedTasks(completedTasks + 1);
  }

  return (
    <div className="flex flex-col justify-center lg:flex-row lg:justify-between items-center bg-gray-100 shadow-md rounded-sm py-3 px-5 mt-5">
      <div className='w-full'>

        <DescripcionSede/>

        <section className='hidden lg:block'>
          <EstadosCitas dataAnfitrion={dataAnfitrion}/>
        </section>

      </div>
      <div className='flex flex-row lg:flex-col mt-4 lg:mt-0 justify-between w-full lg:w-auto lg:justify-center lg:items-center'>

        <section className='lg:hidden w-full'>
          <EstadosCitas dataAnfitrion={dataAnfitrion}/>
        </section>

        <section className='flex flex-col items-center justify-center'>
          <div>
            <p className='font-bold text-center'>Avance:</p>
          </div>
          <div className='w-[100px] h-[100px] mt-1'>
            <CircularProgressbar value={progress} text={`${parseInt(progress)}%`} />
          </div>
        </section>

      </div>
    </div>
  );

};