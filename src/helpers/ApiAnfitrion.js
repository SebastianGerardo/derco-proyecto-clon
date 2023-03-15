import { URL } from "./UrlApi";

export const TraeDataAnfitrion = async () => {
  try {
    const fetchResponse = await fetch(`${URL}/servicios/estado/1`, {
      method: "GET",
      credentials: "include",
    });
    const data = await fetchResponse.json();
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const crearServicio = async () => {
  try {
    const fetchResponse = await fetch(`${URL}/servicios/crear`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify([
        {
          nombres: "Juan Gutierres",
          placa: "SD2323",
          vehiculoKilometraje: "500",
          asesor: 7,
        },
        {
          nombres: "Lucho Gutierres",
          placa: "234SSD",
          vehiculoKilometraje: "100",
          asesor: 8,
        },
        {
          nombres: "Pepe Filipino",
          placa: "24SD23",
          vehiculoKilometraje: "1000",
          asesor: 5,
        },
      ]),
    });
    const data = await fetchResponse.json();
    return data;
  } catch (error) {
    return error;
  }
};
