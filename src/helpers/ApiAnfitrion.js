export const TraeDataAnfitrion = async () => {
  try {
    const fetchResponse = await fetch(
      `https://api-derco-production.up.railway.app/servicios/estado/1`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await fetchResponse.json();
    console.log(data)
    return data;
  } catch (error) {
    return error;
  }
};
