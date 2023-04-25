import { URL } from "./UrlApi";

export const TraeAsignacion = async () => {
  try {
    const fetchResponse = await fetch(`${URL}/servicios/estado/4`, {
      method: "GET",
      credentials: "include",
    });
    const data = await fetchResponse.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const TraeElevadores = async () => {
  try {
    const fetchResponse = await fetch(`${URL}/elevadores/`, {
      method: "GET",
      credentials: "include",
    });
    const data = await fetchResponse.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const GuardarElevador = async (registro, idServicio) => {
  try {
    const fetchResponse = await fetch(`${URL}/servicios/asignar/${idServicio}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(registro),
    });
    const data = await fetchResponse.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const TraeServicio = async () => {
  try {
    const fetchResponse = await fetch(`${URL}/servicios/estado/5`, {
      method: "GET",
      credentials: "include",
    });
    const data = await fetchResponse.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const NuevaUbicacion = async (registro, datoAsignadoId) => {

  try {
    const fetchResponse = await fetch(`${URL}/servicios_asignados/actualizar/${datoAsignadoId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(registro),
    });
    const data = await fetchResponse.json();
    return data;
  } catch (error) {
    return error;
  }
}


export const GuardarEle = async (data, dataEnviar) => {
  const { elevador } = data;
  let arrayNuevo = {
    servicios: dataEnviar,
  };

  try {
    const fetchResponse = await fetch(
      `${URL}/servicios_asignados/actualizar/elevador/${elevador.id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arrayNuevo),
      }
    );
    const data = await fetchResponse.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const CambiarEstado = async (dataAsig) => {

  try {
    const fetchResponse = await fetch(
      `${URL}/servicios/confirmar_salida/${dataAsig.datosAsignadosId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({salida: "2"}),
      }
    );
    const data = await fetchResponse.json();
    return data;
  } catch (error) {

    return error;
  }
};
