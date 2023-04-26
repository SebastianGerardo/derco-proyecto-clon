import React, { useEffect, useState } from "react";

const useTimerDerco = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [idUsuario, setIdUsuario] = useState(null);

    const handleInit = () => {
        setIsRunning(true);
        setHasStarted(true);
    };

    const handleStop = () => {
        setIsRunning(false);
        setHasStarted(false);
    }

    const handleFinish = () => {
        setIsRunning(false);
        setHasStarted(false);
    }

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  //ESTA FUNCION FORMATEA EL TIEMPO
  const formatTime = (time) => {
    const days = Math.floor(time / 86400)
      .toString()
      .padStart(2, "0");
    const hours = Math.floor((time % 86400) / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${days}:${hours}:${minutes}:${seconds}`;
  };
  return {
    time,
    setTime,
    isRunning,
    setIsRunning,
    hasStarted,
    setIdUsuario,
    idUsuario,
    formatTime,
    handleInit,
    handleStop,
    handleFinish,
  };
};

export default useTimerDerco;
