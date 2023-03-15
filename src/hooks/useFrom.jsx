import { useEffect, useState } from "react";
//PENSANDO AUN COMO HACERLO UN HOOK
export const useFrom = (e) => {
    console.log(e)
  setDatosUsuarios({
    ...datosUsuarios,
    [e.target.name]: e.target.value,
  });
  return [];
};
