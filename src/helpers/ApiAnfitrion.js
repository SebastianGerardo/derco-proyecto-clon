import { URL } from "./UrlApi";

export const TraeDataAnfitrion = async () => {
  try {
    const fetchResponse = await fetch(`${URL}/servicios/estado/1`, {
      method: "GET",
      credentials: "include",
    });
    const data = await fetchResponse.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const crearServicio = async (registro) => {
  console.log(registro);
  try {
    const fetchResponse = await fetch(`${URL}/servicios/crear`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(registro),
    });
    const data = await fetchResponse.json();
    return data;
  } catch (error) {
    return error;
  }
};

/* ESTA API SIRVE PARA ACTULIZAR LOS DATOS DE RECEPCUON Y ANFITRION*/
export const editServicio = async (registro, id) => {
  try {
    const fetchResponse = await fetch(`${URL}/servicios/actualizar/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(registro),
    });
    const data = await fetchResponse.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const CantCitas = async () => {
  try {
    const fetchResponse = await fetch(`${URL}/servicios`, {
      method: "GET",
      credentials: "include",
    });
    const data = await fetchResponse.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const BuscarCliente = async ({placa}) => {
  console.log("NOSE QUE LLEGO", placa)
  try {
    const fetchResponse = await fetch(`${URL}/servicios/placa/${placa}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await fetchResponse.json();
    return data;
  } catch (error) {
    return error;
  }
};
