import { Toast } from "../components/Alertas/SweetAlex";

export const FormtearFecha = (fecha) => {
  console.log("SOY LA FECHA",fecha)
  const fechaFrom = new Date(fecha)
  const opciones = { timeZone: 'America/Lima', hour12: false };
  const hora = fechaFrom.toLocaleTimeString('es-PE', opciones);
  return hora
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

export function convertirFecha(fecha) {
  let partes = fecha.split(" ");
  let fechaPartes = partes[0].split("/");
  let horaPartes = partes[1].split(":");
  let nuevaFecha = `${fechaPartes[2]}-${fechaPartes[1] - 1}-${fechaPartes[0]} ${horaPartes[0]}:${horaPartes[1]}:${horaPartes[2]}`
  ;
  console.log(nuevaFecha)
  return nuevaFecha;

}
