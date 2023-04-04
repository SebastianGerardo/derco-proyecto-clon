import { useContext, useEffect, useState } from "react";
import { InformacionAnfitrion } from "./components/InformacionAnfitrion";
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
        <InformacionAnfitrion dataAnfitrion={dataAnfitrion} />
        {/*TABLA*/}
        <TableAnfitrion dataAnfitrion={dataAnfitrion} />
      </div>
    </>
  );
};
