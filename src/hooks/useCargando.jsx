import { useEffect, useState } from "react";

export const useCargando = (data ) => {
  console.log(data)
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(data);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return [pending, rows];
};
