import { useState } from "react";
import DataTable from "react-data-table-component";
import { CustomHeader } from "../../../components/CustomHeaderTable/CustomHeaderTable";
import { Search } from "../../../components/datatable/Search";
import { ModalRecepcion } from "./ModalRecepcion";
import {FormtearFecha} from '../../../helpers/funcions'
const columns = [
  {
    cell: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="stroke-current text-gray-700/50 hover:text-sky-700 w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>
  ,
    width: "5rem",
  },
  {
    name: <CustomHeader nameModule="CLIENTE" icon="fa-solid fa-user mr-1"/>,
    selector: (row) => <p>{row.nombres}</p>,
    sortable: true,
    width: "15rem",
  },
  {
    name: <CustomHeader nameModule="TELEFONO" icon="fa-solid fa-phone mr-1"/>,
    cell: (row) => <p>{row.telefono}</p>,
    sortable: true,
  },
  {
    name: <CustomHeader nameModule="PLACA" icon="fa-solid fa-id-card mr-1"/>,
    selector: (row) => row.placa,
    sortable: true,
    center: true
  },
  {
    name: <CustomHeader nameModule="SERVICIO" icon="fa-solid fa-tools mr-1"/>,
    selector: (row) => row.placa,
    sortable: true,
    center: true
  },
  {
    name: <CustomHeader nameModule="KILOMETRAJE" icon="fa-solid fa-tachometer mr-1"/>,
    selector: (row) => <p>{row.vehiculoKilometraje} km</p>,
    sortable: true,
    center: true
  },
  {
    name: <CustomHeader nameModule="HORA ABORDAJE" icon="fa-solid fa-clock mr-1"/>,
    selector: (row) => <p>{FormtearFecha(row.fechaRegistro)}</p>,
    sortable: true,
  },

  {
    name: <CustomHeader nameModule="UBICACION" icon="fa-solid fa-user-clock mr-1"/>,
    selector: (row) => row.estado === "2" && "Recepcion",
    sortable: true,
    center: true,
    style: {
      color: "white",
      fontSize: "15px",
      margin: "4px",
      borderRadius: "5px",
      fontWeight: "700",
      textAlign: "center",
      cursor: "default",
    },
    conditionalCellStyles: [
      {
        when: (row) => row.estado === "2",
        style: {
          backgroundColor: "#4AD69D",
        },
      }
    ],
  },
  {
    name: <CustomHeader nameModule="ACCIONES" icon="fa-solid fa-cog mr-1"/>,
    cell: row => 
    <div className="flex items-center gap-3">
      <ModalRecepcion tipo="edit" data={row} />
      <ModalRecepcion tipo="reasignar" data={row} />
    </div>,//Aquí se agregó la funcionalidad del modal, para el botón editar
    center: true,
  },
];
export const TableRecepcion = ({dataRecepcion}) => {
  const [placa, setPlaca] = useState("");

  const filteredItems = dataRecepcion.filter(
    (item) =>
      item.placa && item.placa.toLowerCase().includes(placa.toLowerCase())
  );

  const filtroEstado = (e) => {
    e.preventDefault()
  }
  const [estado, setEstado] = useState("")
  const capturarEstados = ({ target }) => {
    setEstado(target.value)
  }

  const filtro2 = filteredItems.filter((item) =>
    item.estado && item.estado.includes(estado))
 
    console.log(estado)


  return (
    <>
      <form action="" onSubmit={filtroEstado}>
        <select name="" id="" onChange={capturarEstados}>
          <option value="">Estado</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Recepcion">Recepción</option>
          <option value="Asignación">Asignación</option>
          <option value="Servicio">Servicio</option>
          <option value="Lavado">Lavado</option>
          <option value="Secado">Secado</option>
          <option value="Entrega">Entrega</option>
        </select>
      </form>
      {/**Componente Search de la tabla */}
      <Search placa={placa} setPlaca={setPlaca} />
      <DataTable
        columns={columns}
        data={estado !== "" ? filtro2 : filteredItems}
        pagination
      />
    </>
  );
};
