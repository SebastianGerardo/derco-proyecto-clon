import { useState } from "react";
import DataTable from "react-data-table-component";
import { BotonFroms } from "../../../components/Boton/BotonForms";
import { Search } from "../../../components/datatable/Search";
import { DataRecepcion } from "../../../helpers/DataRecepcion";
import { ModalRecepcion } from "./ModalRecepcion";

const columns = [
  {
    cell: () => <img src="/img/car.gif" alt="" width={70}/>,
    width: "5rem",
  },
  {
    name: "CLIENTE",
    selector: (row) => <p>{row.nombre} + {row.apellido}</p>,
    sortable: true,
    width: "6rem",
  },
  {
    name: "TELEFONO",
    cell: (row) => <p>{row.telefono}</p>,
    sortable: true,
  },
  {
    name: "PLACA",
    selector: (row) => row.placa,
    sortable: true,
    width: "7rem",
  },
  {
    name: "KILOMETRAJE",
    selector: (row) => row.kilometraje,
    sortable: true,
  },
  {
    name: "ASESOR",
    selector: (row) => row.asesor,
    sortable: true,
  },
  {
    name: "HORA CITA",
    selector: (row) => row.horaLlegada,
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
      cursor: "default",
    },
    conditionalCellStyles: [
      {
        when: (row) => row.estado === "Atendido",
        style: {
          backgroundColor: "#06F11C",
        },
      },
      {
        when: (row) => row.estado === "Pendiente",
        style: {
          backgroundColor: "#F10606",
        },
      },
    ],
  },
  {
    name: "ACCIONES",
    cell: row => <ModalRecepcion tipo="edit" data={row} />,//Aquí se agregó la funcionalidad del modal, para el botón editar
    center: true,
  },
];
export const TableRecepcion = () => {
  const [placa, setPlaca] = useState("");

  const filteredItems = DataRecepcion.filter(
    (item) =>
      item.placa && item.placa.toLowerCase().includes(placa.toLowerCase())
  );
  return (
    <>
      {/**Componente Search de la tabla */}
      <Search placa={placa} setPlaca={setPlaca} />
      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
      />
    </>
  );
};
