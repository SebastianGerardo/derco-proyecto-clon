import { useState } from "react";
import DataTable from "react-data-table-component";
import { CustomHeader } from "../../../components/CustomHeaderTable/CustomHeaderTable";
import { Search } from "../../../components/datatable/Search";
import { FormtearFecha } from "../../../helpers/funcions";
import { ModalLavado } from "./ModalLavado";
import { ApiPrueba } from "../../../helpers/ApiPruebaVistas";

export const TableLavado = ({ data }) => {

  const columns = [
    {
      name: <CustomHeader nameModule="OT" icon="fa-regular fa-id-card mr-1" />,
      cell: (row) => <p>{row.ot}</p>,
      sortable: true,
      center: true,
    },
    {
      name: <CustomHeader nameModule="PLACA" icon="fa-solid fa-id-card mr-1" />,
      selector: (row) => row.placa,
      sortable: true,
      width: "7rem",
      center: true
    },
    {
      name: <CustomHeader nameModule="TECNICO" icon="fa-solid fa-user mr-1" />,
      selector: (row) => <p>{row.tecnicoMecanico}</p>,
      sortable: true,
      center: true,
    },
    {
      name: <CustomHeader nameModule="CONFIRMACION DE PICKING" icon="fa-solid fa-tools mr-1" />,
      selector: (row) => row.confirmacionPicking,
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
          when: (row) => row.confirmacionPicking === "Pendiente",
          style: {
            backgroundColor: "#FFD34D",
          },
        },
        {
          when: (row) => row.confirmacionPicking === "Terminado",
          style: {
            backgroundColor: "#4AC695",
          },
        },
      ],
    },
    {
      name: <CustomHeader nameModule="FECHA / HORA INGRESO" icon="fa-solid fa-clock mr-1" />,
      selector: (row) => row.fecha,
      sortable: true,
      center: true
    },

    {
      name: <CustomHeader nameModule="ESTADO" icon="fa-solid fa-user-clock mr-1" />,
      selector: (row) => row.estado,
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
          when: (row) => row.estado === "Pendiente",
          style: {
            backgroundColor: "#FFD34D",
          },
        },
        {
          when: (row) => row.estado === "En proceso",
          style: {
            backgroundColor: "#B22323",
          },
        },
        {
          when: (row) => row.estado === "En pausa",
          style: {
            backgroundColor: "#9B5DA2",
          },
        },
      ],
    },
    {
      name: <CustomHeader nameModule="ACCIONES" icon="fa-solid fa-cog mr-1" />,
      cell: row =>
        <div className="flex items-center gap-3">
          <ModalLavado tipo="timer" data={row} /> {/* ESTO SE IMPLEMENTARA LUEGO */}
        </div>,//Aquí se agregó la funcionalidad del modal, para el botón editar
      center: true,
    },
  ];
  // let ordenado = data.sort((a, b) => new Date(b.fechaRegistro) - new Date(a.fechaRegistro))

  const [placa, setPlaca] = useState("");


  const filteredItems = ApiPrueba.filter((item) => item.placa && item.placa.toLowerCase().includes(placa.toLowerCase()) || item.ot && item.ot.toLowerCase().includes(placa.toLowerCase()));

  const filtroEstado = (e) => {
    e.preventDefault()
  }

  const [estado, setEstado] = useState("")

  const filtro2 = filteredItems.filter((item) => item.estado && item.estado.includes(estado))

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-2 lg:mb-0">

        <Search placa={placa} setPlaca={setPlaca} />

        <form action="" onSubmit={filtroEstado} className='border-solid border-gray-500 border w-72 px-2 py-1 rounded-md'>
          <p className="text-gray-500">Filtro por estado:</p>

          <div className="flex justify-evenly">
            <label className="p-1 flex items-center justify-center">
              <input
                className="w-5 h-5 appearance-none border rounded-md transition-all duration-200 ease-out checked:bg-green-500"
                type="checkbox"
                checked={estado === "Pendiente"}
                onChange={() => setEstado(estado === "Pendiente" ? "" : "Pendiente")}
              />
              <span className="ml-1">Pendiente</span>
            </label>
            <br />
            <label className="p-1 flex items-center justify-center">
              <input
                className="w-5 h-5 appearance-none border rounded-md transition-all duration-200 ease-out checked:bg-green-500"
                type="checkbox"
                checked={estado === "Listo"}
                onChange={() => setEstado(estado === "Listo" ? "" : "Listo")}
              />
              <span className="ml-1">Listo</span>
            </label>
          </div>

        </form>

      </div>
      {/**Componente Search de la tabla */}
      <DataTable
        columns={columns}
        data={filtro2}
        pagination
        paginationComponentOptions={{
          rowsPerPageText: "Filas por página:",
          rangeSeparatorText: "de",
          noRowsPerPage: false,
          selectAllRowsItem: true,
          selectAllRowsItemText: "Todos"
        }}
        noDataComponent={<p className="text-base text-gray-400">Esperando los registros para mostrar</p>}
      />
    </>
  );
};
