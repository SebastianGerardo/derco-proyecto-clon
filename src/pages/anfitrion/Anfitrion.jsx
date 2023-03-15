import { useContext, useEffect, useState } from "react";
import { InformacionSede } from "../../components/informacion/InformacionSede";
import { UserContext } from "../../context/ContextDerco";
import { TraeDataAnfitrion } from "../../helpers/ApiAnfitrion";

import { TableAnfitrion } from "./components/TableAnfitrion";

export const Anfitrion = () => {

  const {estadoData} = useContext(UserContext)
  /*Peticion Api*/
  const [dataAnfitrion, setDataAnfitrion] = useState([])
  useEffect(() => {
    TraeDataAnfitrion().then((res) => setDataAnfitrion(res.data));
  }, [estadoData]);


  return (
    <>
      <div className="p-5">
       
        <InformacionSede dataAnfitrion={dataAnfitrion} />
        {/*TABLA*/}
        <TableAnfitrion dataAnfitrion={dataAnfitrion} />
      </div>
    </>
  );
};
