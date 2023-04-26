import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useOutlet } from "react-router-dom";
import { Menu } from "../../components/Navbar/Menu";
import { Navbar } from "../../components/Navbar/Navbar";
import useTimerDerco from "../../hooks/useTimerDerco";


export const DashboardRouter = () => {

  const {time,
    setTime,
    isRunning,
    setIsRunning,
    hasStarted,
    setIdUsuario,
    idUsuario,
    formatTime,
    handleInit,
    handleStop,
    handleFinish} = useTimerDerco()

  return (
    <>
      <div className="flex items-start">
        <Menu />
        <div className="max-h-screen h-screen w-full overflow-y-auto flex flex-col">
            <Navbar />

              <Outlet context={[handleInit, handleStop, handleFinish, formatTime, setIsRunning, isRunning, hasStarted, time, setTime]} />

        </div>
      </div>
    </>
  );
};
