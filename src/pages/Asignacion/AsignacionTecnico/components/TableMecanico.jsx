import { useState } from "react";
import DataTable from "react-data-table-component";
import { CustomHeader } from "../../../../components/CustomHeaderTable/CustomHeaderTable";
import { Search } from "../../../../components/datatable/Search";
import { DataAlmacen } from "../../../../helpers/DataAlmacen";
import { DataAsignacionMecanico } from "../../../../helpers/DataAsignacion";
// import { BotonFroms } from "../../../components/Boton/BotonForms";
import { ModalMecanico } from "./ModalMecanico";

const columns = [
  {
    cell: () => <img src="/img/car.gif" alt="" width={70} />,
    width: "5rem",
  },
  {
    name: <CustomHeader nameModule="OT" icon="fa-solid fa-phone mr-1"/>,
    cell: (row) => <p>{row.ot}</p>,
    sortable: true,
    center: true,
  },
  {
    name: <CustomHeader nameModule="PLACA" icon="fa-solid fa-id-card mr-1"/>,
    selector: (row) => row.placa,
    sortable: true,
    width: "7rem",
    center: true
  },
  {
    name: <CustomHeader nameModule="HORA CITA" icon="fa-solid fa-clock mr-1"/>,
    selector: (row) => row.horaEstimada,
    sortable: true,
  },
  {
    name: <CustomHeader nameModule="SERVICIO" icon="fa-solid fa-tools mr-1"/>,
    selector: (row) => row.servicio,
    sortable: true,
    center: true
  },
  {
    name: <CustomHeader nameModule="HORA CITA" icon="fa-solid fa-clock mr-1"/>,
    selector: (row) => row.horaRecepcion,
    sortable: true,
  },
  {
    name: <CustomHeader nameModule="ESTADO" icon="fa-solid fa-user-clock mr-1"/>,
    selector: (row) => row.estadoAsignacion,
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
        when: (row) => row.estadoAsignacion === "Pendiente",
        style: {
          backgroundColor: "#FFD966",
        },
      },
      {
        when: (row) => row.estadoAsignacion === "Listo",
        style: {
          backgroundColor: "#4AD69D",
        },
      },
    ],
  },
  {
    name: <CustomHeader nameModule="ESTADO" icon="fa-solid fa-user-clock mr-1"/>,
    selector: (row) => row.ubicacion,
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
        when: (row) => row.ubicacion === "Asignacion",
        style: {
          backgroundColor: "#3B82F6",
        },
      },
      {
        when: (row) => row.ubicacion === "No Asignado",
        style: {
          backgroundColor: "#93C5FD",
        },
      },
    ],
  },
  {
    name: <CustomHeader nameModule="ACCIONES" icon="fa-solid fa-cog mr-1"/>,
    cell: row => 
    <div className="flex items-center gap-3">
      <ModalMecanico tipo="edit" data={row} />
    </div>,//Aquí se agregó la funcionalidad del modal, para el botón editar
    center: true,
  },
];
export const TableMecanico = () => {
  const [placa, setPlaca] = useState("");

  const filteredItems = DataAsignacionMecanico.filter(
    (item) =>
      item.placa && item.placa.toLowerCase().includes(placa.toLowerCase())
  );
  
  const filtroEstado = (e) => {
    e.preventDefault()
  }

  const [estado, setEstado] = useState("")

  const filtro2 = filteredItems.filter((item) =>
    item.ubicacion && item.ubicacion.includes(estado) || item.estadoAsignacion && item.estadoAsignacion.includes(estado)) 
 
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
                checked={estado === "Asignacion"}
                onChange={() => setEstado(estado === "Asignacion" ? false : "Asignacion")}
              />
              <span className="ml-1">Asignado</span>
            </label>
            <br />
            <label className="p-1 flex items-center justify-center">
              <input
                className="w-5 h-5 appearance-none border rounded-md transition-all duration-200 ease-out checked:bg-green-500"
                type="checkbox"
                checked={estado === "Pendiente"}
                onChange={() => setEstado(estado === "Pendiente" ? false : "Pendiente")}
              />
              <span className="ml-1">Pendiente</span>
            </label>
          </div>

        </form>

      </div>
      {/**Componente Search de la tabla */}
      <DataTable
        columns={columns}
        data={estado !== false ? filtro2 : filteredItems}
        pagination
      />
    </>
  );
};