import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { DescripcionSede } from "../../components/informacion/DescripcionSede";
import { TableMantenimiento } from "./components/TableMantenimiento";
import { InicarMan, TerminarPausarMan, TraeMantenimiento } from "../../helpers/ApiMantenimiento";
import { UserContext } from "../../context/ContextDerco";

export const Mantenimiento = () => {
  const { UsuarioLogin, socketState } = useContext(UserContext);


  const [infoMantenimiento, setInfoMantenimiento] = useState([])

  // ESTO SE IMPLEMENTARA LUEGO

  useEffect(() => {
    const interval = setInterval(() => {
      TraeMantenimiento().then(res => setInfoMantenimiento(res.data))
    }, 1000);
    return () => clearInterval(interval);
  }, [])

  // ADVERTENCIA AL CERRAR LA VENTANA
  //useEffect(() => {
  //  window.addEventListener('beforeunload', handlebeforeunload);

  // return () => {
  //    window.removeEventListener('beforeunload', handlebeforeunload);
  // }
  //}, [])

  //const handlebeforeunload = (e) => {
  // e.preventDefault();
  // e.returnValue = '';
  //}

  useEffect(() => {
    return () => {
      if (localStorage.getItem("estado") != "Pausado" && localStorage.getItem("time") !== null) {
        TerminarPausarMan({
          serviciosAsignado: localStorage.getItem("id"),
          tipo: "mantenimiento",
          motivo: "",
          comentario: "",
          tiempo: new Date(),
          estado: "Pausar",
        }).then(res => {
          console.log(res)
        })
        console.log("Se cerró la ventana")
        console.log("Se cargó la ventana")
      } 
      if (localStorage.getItem("estado") != null) {
        localStorage.setItem("estado", "Pausado")
      }
    };
  }, []);

  return (
    <>
      <div className="p-6">
        <TableMantenimiento data={infoMantenimiento} />
      </div>
    </>
  );
};
