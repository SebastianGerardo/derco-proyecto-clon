import { URL } from "./UrlApi";

export const TraeMantenimiento = async () => {
    try {
      const fetchResponse = await fetch(`${URL}/servicios_asignados/ubicacion/mantenimiento`, {
        method: "GET",
        credentials: "include",
      });
      const data = await fetchResponse.json();
      return data;
    } catch (error) {
      return error;
    }
  };
  



export const InicarMan = async (dataMan) => {
    const {serviciosAsignado} = dataMan
    try {
      const fetchResponse = await fetch(`${URL}/servicios_asignados/historial/iniciar/${serviciosAsignado}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataMan),
      });
      const data = await fetchResponse.json();
      return data;
    } catch (error) {
      return error;
    }
  };


  export const TerminarPausarMan = async (dataMan) => {
    try {
      const fetchResponse = await fetch(`${URL}/servicios_asignados/historial/agregar`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataMan),
      });
      const data = await fetchResponse.json();
      return data;
    } catch (error) {
      return error;
    }
  };


  export const TerminarMan = async (dataMan) => {
    const {serviciosAsignado} = dataMan
    try {
      const fetchResponse = await fetch(`${URL}/servicios_asignados/historial/terminar/${serviciosAsignado}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataMan),
      });
      const data = await fetchResponse.json();
      return data;
    } catch (error) {
      return error;
    }
  };
