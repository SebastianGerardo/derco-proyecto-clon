import { DescripcionSede } from "../../../components/informacion/DescripcionSede";
import { EstadosCitas } from "../../../components/informacion/EstadosCitas";
import { useContext, useEffect, useState } from "react";
import { CantCitas } from "../../../helpers/ApiAnfitrion";
import ProgressBar from "../../../components/Radial Progresivo/ProgressBar";
import { UserContext } from "../../../context/ContextDerco";

export const InformacionAnfitrion = () => {
  const [cantCitas, setCantCitas] = useState([]);
  const [sinCitas, setSinCitas] = useState([]);

  const { socketState, UsuarioLogin } = useContext(UserContext);
  const [actualizar, setActualizar] = useState(false);

  useEffect(() => {
    CantCitas().then((res) => {
      if (res.statusCode === 200) {
        setCantCitas(res.data.abordaje.concita);
        setSinCitas(res.data.abordaje.sincita);
      }
    });
  }, [actualizar]);

  useEffect(() => {
    if (
      socketState !== undefined &&
      socketState !== "" &&
      socketState !== null
    ) {
      socketState.on("notificacionToClient", (res) => {
        res !== undefined && setActualizar(!actualizar);
      });
    }
  }, [actualizar]);

  useEffect(() => {
    if (cantCitas?.programados || sinCitas.total) {
      setCompletedTasks(cantCitas.programados + sinCitas.total);
    }
  }, [actualizar, cantCitas, sinCitas]);

  const [totalBarra, setTotalBarra] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  useEffect(() => {
    if (completedTasks > 0) {
      const totalTasks = cantCitas.total + sinCitas.total;
      setTotalBarra((completedTasks / totalTasks) * 100);
    }
  }, [completedTasks, sinCitas]);

  return (
    <div className="bg-gray-100 shadow-md rounded-sm py-3 px-5 mt-5">
      <div className="flex flex-col gap-y-2 items-center sm:flex-row min-[450px]:flex-row md:justify-between mt-4 lg:mt-0 justify-between w-full">
        <section className="">
          <EstadosCitas cantCitas={cantCitas} sinCitas={sinCitas} />
        </section>
        <section className="grid place-items-center">
          <div>
            <p className="font-bold text-center">Avance:</p>
          </div>
          <div className={`w-[100px] h-[100px] mt-1`}>
            <ProgressBar
              value={totalBarra ? totalBarra : 0}
              text={
                totalBarra === Infinity || NaN
                  ? 0
                  : totalBarra
                  ? parseInt(totalBarra)
                  : 0
              }
            />
          </div>
        </section>
      </div>
    </div>
  );
};
