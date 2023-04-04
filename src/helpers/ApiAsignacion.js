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
