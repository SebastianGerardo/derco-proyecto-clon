export const IniciarSesion = async (login) => {
  try {
    const fetchResponse = await fetch(
      `https://api-production-586a.up.railway.app/sesiones/iniciar`,
      {
        method: "POST",
        credentials: "include",
        body: new URLSearchParams(login),
      }
    );
    const data = await fetchResponse.json();
    return data;
  } catch (error) {
    return error;
  }
};
