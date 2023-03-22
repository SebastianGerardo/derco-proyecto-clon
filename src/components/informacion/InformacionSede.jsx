import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { DescripcionSede } from './DescripcionSede';
import { EstadosCitas } from './EstadosCitas';
import { useEffect, useState } from "react";
import { CantCitas } from "../../helpers/ApiAnfitrion";

export const InformacionSede = () => {

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

  useEffect(() => {
    if (cantCitas?.programados) {
      setCompletedTasks(cantCitas.programados);
    }
  }, [cantCitas]);

  const totalTasks = cantCitas.total;
  const [completedTasks, setCompletedTasks] = useState(0);

  const progress = (completedTasks / totalTasks) * 100;

  function handleTaskComplete() {
    setCompletedTasks(completedTasks + 1);
  }

  return (
    <div className="flex flex-col justify-center lg:flex-row lg:justify-between items-center bg-gray-100 shadow-md rounded-sm py-3 px-5 mt-5">
      <div className='w-full'>

        <DescripcionSede/>

        <section className='hidden lg:block'>
          <EstadosCitas cantCitas={cantCitas}/>
        </section>

      </div>
      <div className='flex flex-row lg:flex-col mt-4 lg:mt-0 justify-between w-full lg:w-auto lg:justify-center lg:items-center'>

        <section className='lg:hidden w-full'>
          <EstadosCitas cantCitas={cantCitas}/>
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