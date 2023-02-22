import { useState } from "react";
import DataTable from "react-data-table-component";
import { ButtonModal } from "../../../components/modal/ButtonModal";
import { DataDerco } from "../../../helpers/Data";
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
      <div className="flex justify-between items-center flex-wrap w-full my-3">
        <form onSubmit={(e) => buscarPlaca(e)} className="xl:w-1/4 lg:w-1/4 w-full my-5">
          <div className="flex p-2 items-center gap-3 border-2 rounded-md border-gray-400 focus-within:border-blue-500 focus-within:text-blue-500">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" className="outline-none w-full" value={placa} onChange={(e) => capturarPlaca(e)} placeholder="Buscar por placa" />
          </div>
        </form>
        <ButtonModal tipo="crear" />
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
