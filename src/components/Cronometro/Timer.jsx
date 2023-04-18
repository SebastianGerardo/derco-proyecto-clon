import { useEffect, useState } from "react";

export default function Timer(props) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (props.isRunning) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [props.isRunning]);

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

  useEffect(() => {
    setTime(0);
  }, [props.reset]);

  return (
    <div>
      <h1>{formatTime(time)}</h1>
    </div>
  );
}