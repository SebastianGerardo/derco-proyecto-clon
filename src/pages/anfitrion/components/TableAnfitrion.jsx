import DataTable from "react-data-table-component";
import { DataDerco } from "../../../helpers/Data";
const columns = [
  {
    cell: () => <i className="fa-solid fa-car-side fa-2x text-gray-400"></i>,
    width: "5rem",
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
        {row.nombre} {row.apellido}
      </p>
    ),
    sortable: true,
    width: "10rem",
  },
  {
    name: "TELEFONO",
    selector: (row) => row.telefono,
    sortable: true,
    width: "7rem",
  },
  {
    name: "MARCA",
    selector: (row) => row.marca,
    sortable: true,
    width: "7rem",
  },
  {
    name: "LOCAL",
    selector: (row) => row.loca,
    sortable: true,
    width: "7rem",
  },
  {
    name: "SERVICIO",
    selector: (row) => row.servicio,
    sortable: true,
    width: "13rem"
  },
  {
    name: "ESTADO",
    selector: (row) => row.estado,
    sortable: true,
    width: "8rem",
    style: {
      color: "white",
      fontSize: "15px",
      margin: "4px",
      borderRadius: "5px",
      fontWeight: "700",
    },
    conditionalCellStyles: [
      {
        when: (row) => row.estado === "No asistio",
        style: {
          backgroundColor: "#FF5233",
        },
      },
      {
        when: (row) => row.estado === "Confirmo",
        style: {
          backgroundColor: "#FFB109",
        },
      },
      {
        when: (row) => row.estado === "Asiste",
        style: {
          backgroundColor: "#79FF09",
        },
      },
    ],
  },
  {
    name: "ACCIONES",
    cell: () => <button><i className="fa-solid fa-pen-to-square text-gray-400 fa-2x"></i></button>,
    center: true
  },
];
export const TableAnfitrion = () => {
  return (
    <DataTable columns={columns} data={DataDerco} pagination highlightOnHover />
  );
};
