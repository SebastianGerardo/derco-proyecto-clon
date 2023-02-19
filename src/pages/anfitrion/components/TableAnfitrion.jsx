import { useState } from "react";
import DataTable from "react-data-table-component";
import { ButtonModal } from "../../../components/modal/ButtonModal";
import { DataDerco } from "../../../helpers/Data";
const columns = [
  {
    cell: () => <i className="fa-solid fa-car-side fa-2x text-gray-300"></i>,
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
        {row.nombre}
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
    width: "13rem",
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
      textAlign: "center"
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
    cell: (row) => <ButtonModal tipo="edit" data={row} />, //Aquí se agregó la funcionalidad del modal, para el botón editar
    center: true,
  },
];
export const TableAnfitrion = () => {
  const [placa, setPlaca] = useState("");

  const buscarPlaca = (e) => {
    e.preventDefault();
  };

  const capturarPlaca = ({ target }) => {
    setPlaca(target.value);
  };

  const filteredItems = DataDerco.filter(
    (item) =>
      item.placa && item.placa.toLowerCase().includes(placa.toLowerCase())
  );
  console.log(placa);
  return (
    <>
      <div>
        <form onSubmit={(e) => buscarPlaca(e)} className="xl:w-1/4 lg:w-1/4 w-full my-5">
          <div className="flex p-2 items-center gap-3 border-2 rounded-md border-gray-400 focus-within:border-blue-500 focus-within:text-blue-500">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" className="outline-none w-full" value={placa} onChange={(e) => capturarPlaca(e)} placeholder="Buscar por placa" />
          </div>
        </form>
      </div>
      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        highlightOnHover
      />
    </>
  );
};
