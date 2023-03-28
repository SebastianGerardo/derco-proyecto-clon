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



export const reemplzar = (valor) => {
  const palabrasAReemplazar = {
      '/\+51|/g': "",
      '  ': '',
      ' ': '',
      '-': "",
  };
  const expresionRegular = new RegExp(Object.keys(palabrasAReemplazar).join('|'), 'gi');
  const textoReemplazado = valor?.replace(expresionRegular, match => palabrasAReemplazar[match]);
  const final = textoReemplazado.replace(/\+51|/, "")
  const FinalDeFinales = final.replace("+", "")
  return FinalDeFinales
}


export function convertirFecha(fecha) {
  var partes = fecha.split(" ");
  var fechaPartes = partes[0].split("/");
  var horaPartes = partes[1].split(":");
  var nuevaFecha = new Date(fechaPartes[2], fechaPartes[1] - 1, fechaPartes[0], horaPartes[0], horaPartes[1], horaPartes[2]);
  return nuevaFecha.toISOString();
}