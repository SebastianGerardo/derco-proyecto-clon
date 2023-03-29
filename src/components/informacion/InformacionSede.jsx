
import { DescripcionSede } from './DescripcionSede';
import { EstadosCitas } from './EstadosCitas';
import { useEffect, useState } from "react";
import { CantCitas } from "../../helpers/ApiAnfitrion";
import ProgressBar from '../Radial Progresivo/ProgressBar';

export const InformacionSede = () => {

  const [cantCitas, setCantCitas] = useState([])
  const [bandera, setBandera] = useState(false)

  useEffect(() => {
    
    CantCitas().then(res => {
      if(res.statusCode === 200){
        setCantCitas(res.data.concita) 
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
      <div className='grid grid-cols-2 lg:flex lg:flex-col mt-4 lg:mt-0 justify-between w-full lg:w-auto lg:justify-center lg:items-center'>

        <section className='lg:hidden w-full'>
          <EstadosCitas cantCitas={cantCitas}/>
        </section>

        <section className='grid place-items-center'>
          <div>
            <p className='font-bold text-center'>Avance:</p>
          </div>
          <div className={`w-[100px] h-[100px] mt-1`}>
            <ProgressBar value={progress ? progress : 0} text={progress === Infinity || NaN ? 0 : (progress ? parseInt(progress) : 0)} />
          </div>
        </section>

      </div>
    </div>
  );

};