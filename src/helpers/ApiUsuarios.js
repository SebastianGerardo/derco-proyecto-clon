export const IniciarSesion = async (login) => {
  try {
    const fetchResponse = await fetch(
      `https://api-derco-production.up.railway.app/sesiones/iniciar`,
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

export const VerificarSesion =async()=>{
  try {
    const fetchResponse = await fetch(
      `https://api-derco-production.up.railway.app/sesiones/verificar`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await fetchResponse.json();
    return data;
  } catch (error) {
    return error;
  }
}

export const CerrarSesionUsu =async()=>{
  try {
    const fetchResponse = await fetch(
      `https://api-derco-production.up.railway.app/sesiones/Cerrar`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const data = await fetchResponse.json();
    return data;
  } catch (error) {
    return error;
  }
}

