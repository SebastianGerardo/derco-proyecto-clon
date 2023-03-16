export const FormtearFecha = (fecha) => {
    const fechaActual = new Date(fecha)
    const dateFinal = fechaActual.toLocaleDateString();
    if(dateFinal !== "Invalid Date"){
      const Mostrar = dateFinal +
      " " +
      fechaActual.getHours() +
      ":" +
      fechaActual.getMinutes() +
      ":" +
      fechaActual.getSeconds()
      return Mostrar
    }else{
      return "--"
    }
  }