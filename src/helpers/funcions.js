export const FormtearFecha = (fecha) => {
  const fechaActual = new Date(fecha);
  const dateFinal = fechaActual.toLocaleDateString();
  if (dateFinal !== "Invalid Date") {
    if (String(fechaActual.getSeconds()).length == "1") {
      const Mostrar =
        dateFinal +
        " " +
        fechaActual.getHours() +
        ":" +
        fechaActual.getMinutes() +
        ":" +
        `${fechaActual.getSeconds()}0`;
      return Mostrar;
    } else {
      const Mostrar =
        dateFinal +
        " " +
        fechaActual.getHours() +
        ":" +
        fechaActual.getMinutes() +
        ":" +
        fechaActual.getSeconds();
      return Mostrar;
    }
  } else {
    return "--";
  }
};
