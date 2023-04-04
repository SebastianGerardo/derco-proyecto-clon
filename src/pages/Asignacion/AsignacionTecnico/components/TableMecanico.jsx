import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CustomHeader } from "../../../../components/CustomHeaderTable/CustomHeaderTable";
import { Search } from "../../../../components/datatable/Search";
// import { BotonFroms } from "../../../components/Boton/BotonForms";
import { ModalMecanico } from "./ModalMecanico";
import { FormtearFecha } from "../../../../helpers/funcions";
import { TraeAsignacion } from "../../../../helpers/ApiAsignacion";

const columns = [
  {
    name: <CustomHeader nameModule="OT" icon="fa-solid fa-id-card mr-1" />,
    selector: (row) => row.ot,
    sortable: true,
    width: "7rem",
    center: true
  },
  {
    name: <CustomHeader nameModule="PLACA" icon="fa-solid fa-id-card mr-1" />,
    selector: (row) => row.placa,
    sortable: true,
    width: "7rem",
    center: true
  },
  {
    name: <CustomHeader nameModule="KILOMETRAJE" icon="fa-solid fa-clock mr-1" />,
    selector: (row) => row.vehiculoKilometraje,
    sortable: true,
    center: true,
  },
  {
    name: <CustomHeader nameModule="TIPO DE SERVICIO" icon="fa-solid fa-tools mr-1" />,
    selector: (row) => row.tipoServicio?.nombre,
    sortable: true,
    center: true
  },
  {
    name: <CustomHeader nameModule="MARCA" icon="fa-solid fa-clock mr-1" />,
    selector: (row) => row.marca,
    sortable: true,
    center: true,
  },
  {
    name: <CustomHeader nameModule="MODELO" icon="fa-solid fa-clock mr-1" />,
    selector: (row) => row.modelo,
    sortable: true,
    center: true,
  },
  {
    name: <CustomHeader nameModule="HORA DE RECEPCIÓN" icon="fa-solid fa-clock mr-1" />,
    selector: (row) => FormtearFecha(row.fechaInicioRecepcion),
    sortable: true,
    center: true,
  },
  {
    name: <CustomHeader nameModule="HORA ESTIMADA DE ENTREGA" icon="fa-solid fa-clock mr-1" />,
    selector: (row) => row.horaEstimadaEntrega,
    sortable: true,
    center: true,
  },
  {
    name: <CustomHeader nameModule="ESTADO" icon="fa-solid fa-user-clock mr-1" />,
    selector: (row) => row.estado === "4" ? "Pendiente" : "Terminado",
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
        when: (row) => row.estado === "4",
        style: {
          backgroundColor: "#FFD966",
        },
      },
      {
        when: (row) => row.estado === "5",
        style: {
          backgroundColor: "#4AD69D",
        },
      },
    ],
  },
  {
    name: <CustomHeader nameModule="ACCIONES" icon="fa-solid fa-cog mr-1" />,
    cell: row =>
      <div className="flex items-center gap-3">
        <ModalMecanico tipo="edit" data={row} />
      </div>,//Aquí se agregó la funcionalidad del modal, para el botón editar
    center: true,
  },
];
export const TableMecanico = ({dataAsignacion}) => {

  const [placa, setPlaca] = useState("");

  // console.log(dataAsignacion)

  const filteredItems = dataAsignacion.filter(
    (item) =>
      item.placa && item.placa.toLowerCase().includes(placa.toLowerCase())
  );

  const filtroEstado = (e) => {
    e.preventDefault()
  }

  const [estado, setEstado] = useState("")

  const filtro2 = filteredItems.filter((item) =>
    item.estado && item.estado.includes(estado))

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-2 lg:mb-0">
        <Search placa={placa} setPlaca={setPlaca} />

        <form action="" onSubmit={filtroEstado} className='border-solid border-gray-500 border w-72 px-2 py-1 rounded-md'>
          <p className="text-gray-500">Filtro por estado de picking:</p>

          <div className="flex justify-evenly">
            <label className="p-1 flex items-center justify-center">
              <input
                className="w-5 h-5 appearance-none border rounded-md transition-all duration-200 ease-out checked:bg-green-500"
                type="checkbox"
                checked={estado === "4"}
                onChange={() => setEstado(estado === "4" ? "" : "4")}
              />
              <span className="ml-1">Pendiente</span>
            </label>
            <br />
            <label className="p-1 flex items-center justify-center">
              <input
                className="w-5 h-5 appearance-none border rounded-md transition-all duration-200 ease-out checked:bg-green-500"
                type="checkbox"
                checked={estado === "5"}
                onChange={() => setEstado(estado === "5" ? "" : "5")} //FALTA AGREGAR EL ESTADO TERMINADO
              />
              <span className="ml-1">Terminado</span>
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
