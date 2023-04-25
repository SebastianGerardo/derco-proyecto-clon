import { Toast } from "../components/Alertas/SweetAlex";

export const FormtearFecha = (fecha) => {
  const fechaFrom = new Date(fecha);
  const opciones = { timeZone: "America/Lima", hour12: false };
  const hora = fechaFrom.toLocaleTimeString("es-PE", opciones);
  return hora;
};

export const reemplzar = (valor) => {
  if (valor !== undefined) {
    const palabrasAReemplazar = {
      "/+51|/g": "",
      "  ": "",
      " ": "",
      "-": "",
    };
    const expresionRegular = new RegExp(
      Object.keys(palabrasAReemplazar).join("|"),
      "gi"
    );
    const textoReemplazado = valor?.replace(
      expresionRegular,
      (match) => palabrasAReemplazar[match]
    );
    const final = textoReemplazado.replace(/\+51|/, "");
    const FinalDeFinales = final.replace("+", "");
    return FinalDeFinales;
  } else {
    Toast.fire({
      icon: "error",
      title: "Plantilla Excel incorrecta",
    });
  }
};

export const formateamosPlaca = (placa) => {
  const palabrasAReemplazar = {
    "  ": "",
    " ": "",
    "-": "",
  };
  if (placa !== undefined) {
    const expresionRegular = new RegExp(
      Object.keys(palabrasAReemplazar).join("|"),
      "gi"
    );
    const textoReemplazado = placa?.replace(
      expresionRegular,
      (match) => palabrasAReemplazar[match]
    );
    return textoReemplazado;
  } else {
    return placa;
  }
};

/*export function convertirFecha(fecha) {
  let partes = fecha.split(" ");
  let fechaPartes = partes[0].split("/");
  let horaPartes = partes[1].split(":");
  let nuevaFecha = `${fechaPartes[2]}-${fechaPartes[1] - 1}-${fechaPartes[0]} ${horaPartes[0]}:${horaPartes[1]}:${horaPartes[2]}`
  ;
  console.log(nuevaFecha)
  return nuevaFecha;

}*/

export function convertirFecha(isoString) {
  let partes = isoString.split(" ");
  let fechaPartes = partes[0].split("/");
  let horaPartes = partes[1].split(":");
  let nuevaFecha = `${fechaPartes[2]}-${fechaPartes[1] - 1}-${fechaPartes[0]} ${
    horaPartes[0]
  }:${horaPartes[1]}:${horaPartes[2]}`;
  const fechaActual = new Date(nuevaFecha);
  let hola = new Date(fechaActual.setHours(fechaActual.getHours() - 5));
  return hola;
}


export function obtenerFechaActual(fecha) {
  const anio = fecha.getFullYear();
  const mes = fecha.getMonth() + 1;
  const dia = fecha.getDate();
  const hora = fecha.getHours() - 5
  const min = fecha.getMinutes()
  return `${anio}-${mes < 10 ? 0 : ''}${mes}-${dia < 10 ? 0 : ''}${dia} ${hora<10 ? 0 : ""}${hora}:${min<10 ? 0 : ""}${min}:00`;
}
//2023-04-25 19:28:06