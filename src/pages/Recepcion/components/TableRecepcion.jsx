import { useState } from "react";
import DataTable from "react-data-table-component";
import { DataRecepcion } from "../../../helpers/DataRecepcion";

const columns = [
  {
    cell: () => <i className="fa-solid fa-car-side fa-2x text-gray-300"></i>,
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
    width: "7rem"

  },
  {
    name: "SERVICIO",
    selector: (row) => row.servicio,
    sortable: true,

  },
  {
    name: "ASESOR",
    selector: (row) => row.asesor,
    sortable: true,
  },
  {
    name: "HORA LLEGADA",
    selector: (row) => row.horaLlegada,
    sortable: true,
  },
  {
    name: "ADICIONAL",
    selector: (row) => row.Adicional,
    sortable: true,
    center: true
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
      textAlign: "center"
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
    cell: () => <>Hola</>, //Aquí se agregó la funcionalidad del modal, para el botón editar
    center: true,
  },
];
export const TableRecepcion = () => {
  const [placa, setPlaca] = useState("");

  const buscarPlaca = (e) => {
    e.preventDefault();
  };

  const capturarPlaca = ({ target }) => {
    setPlaca(target.value);
  };

  const filteredItems = DataRecepcion.filter(
    (item) =>
      item.placa && item.placa.toLowerCase().includes(placa.toLowerCase())
  );
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
