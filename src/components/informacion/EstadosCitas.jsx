export const EstadosCitas = ({ cantCitas, sinCitas }) => {
  return (
    <div className='flex flex-col gap-4 sm:flex-col gp:flex-col lg:flex-row justify-between w-full'>
            <section className='flex flex-col md:flex-row lg:flex-row gap-3'>
                <div className='px-5 py-2 bg-blue-400 min-w-[10rem] text-center text-white rounded-md flex flex-col'>
                    <p className='font-semibold'>Citas Cargadas</p>
                    <span className='font-bold text-3xl'>{cantCitas.total === undefined ? 0 : cantCitas.total}</span>
                </div>
                <div className='px-5 py-2 bg-yellow-400 min-w-[10rem] text-center text-white rounded-md flex flex-col'>
                    <p className='font-semibold'>Clientes Sin cita</p>
                    <span className='font-bold text-3xl'>{sinCitas.total === undefined ? 0 : sinCitas.total}</span>
                </div>
                <div className='px-5 py-2 bg-green-400 min-w-[10rem] text-center text-white rounded-md flex flex-col'>
                    <p className='font-semibold'>Citas Programadas</p>
                    <span className='font-bold text-3xl'>{cantCitas.programados === undefined ? 0 : cantCitas.programados}</span>
                </div>
                <div className='px-5 py-2 bg-yellow-400 min-w-[10rem] text-center text-white rounded-md flex flex-col'>
                    <p className='font-semibold'>Citas Pendientes</p>
                    <span className='font-bold text-3xl'>{cantCitas.pendientes === undefined ? 0 : cantCitas.pendientes}</span>
                </div>
            </section>
    </div>
  );
};