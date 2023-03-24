import { URL } from "./UrlApi";

export const traeAlmacen = async () => {
  try {
    const fetchResponse = await fetch(`${URL}/servicios/estado/3-4`, {
      method: "GET",
      credentials: "include",
    });
    const data = await fetchResponse.json();
    console.log(data)
    return data;
  } catch (error) {
    return error;
  }
};