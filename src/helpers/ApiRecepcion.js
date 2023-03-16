import { URL } from "./UrlApi";
export const traeRecepcion = async () => {
    try {
      const fetchResponse = await fetch(`${URL}/servicios/estado/2`, {
        method: "GET",
        credentials: "include",
      });
      const data = await fetchResponse.json();
      return data;
    } catch (error) {
      return error;
    }
  };