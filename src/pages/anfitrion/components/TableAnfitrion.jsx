import { useState } from "react";
import DataTable from "react-data-table-component";
import { Search } from "../../../components/datatable/Search";
import { DataDerco } from "../../../helpers/Data";
import { ModalAnfitrion } from "./ModalAnfitrion";
const columns = [
  {
    cell: () => <img src="/img/car.gif" alt="" width={70}/>,
    width: "5rem"
  },
  {
    name: "PLACA",
    selector: (row) => row.placa,
    sortable: true,
    width: "6rem",
  },
  {
    name: "NOMBRE Y APELLIDO",
    cell: (row) => (
      <p>
        {row.nombre}
      </p>
    ),
    sortable: true,

  },
  {
    name: "MARCA",
    selector: (row) => row.marca,
    sortable: true,

  },
  {
    name: "SERVICIO",
    selector: (row) => row.servicio,
    sortable: true,

  },
  {
    name: "CITA",
    selector: (row) => row.cita,
    sortable: true,
    center: true
  },
  {
    name: "ASESOR",
    selector: (row) => row.asesor,
    sortable: true,
  },
  {
    name: "ESTADO",
    selector: (row) => row.estado,
    sortable: true,
    style: {
      color: "white",
      fontSize: "15px",
      margin: "4px",
      borderRadius: "5px",
      fontWeight: "700",
      textAlign: "center",
      cursor: "default"
    },
    conditionalCellStyles: [
      {
        when: (row) => row.estado === "Asignado",
        style: {
          backgroundColor: "#06F11C",
        },
      },
      {
        when: (row) => row.estado === "No asignado",
        style: {
          backgroundColor: "#F10606",
        },
      },
    ],
  },
  {
    name: "ACCIONES",
    cell: (row) => <ModalAnfitrion  data={row} tipo="edit"/>, //Aquí se agregó la funcionalidad del modal, para el botón editar
    center: true,
  },
];
export const TableAnfitrion = () => {
  const [placa, setPlaca] = useState("");

  const filteredItems = DataDerco.filter(
    (item) =>
      item.placa && item.placa.toLowerCase().includes(placa.toLowerCase())
  );
 
  return (
    <>
      {/* Buscardor de la tabla */}
      <Search placa={placa} setPlaca={setPlaca} />
      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
      />
    </>
  );
};
