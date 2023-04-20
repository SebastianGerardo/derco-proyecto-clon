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
    console.log("SOY LA API",dataMan)
    const {serviciosAsignado} = dataMan
    try {
      const fetchResponse = await fetch(`${URL}/servicios_asignados/historial/agregar/${serviciosAsignado}`, {
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

  export const Mensajes = async (dataMan) => {
    console.log("wenas", dataMan)
    try {
      const fetchResponse = await fetch(`${URL}/mensajes/enviar`, {
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

  export const DestinatariosMensaje = async (dataMan) => {
    try {
      const fetchResponse = await fetch(`${URL}/usuarios/tipo/1-2-3-4-5-6`, {
        method: 'GET',
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
  
  export const TraeDetalle = async (idDetalle, dataMan) => {
    try {
      const fetchResponse = await fetch(`${URL}/historial_servicios/${idDetalle}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
      });
      const data = await fetchResponse.json();
      return data;
    } catch (error) {
      return error;
    }
  };
