import { useState } from "react";
import DataTable from "react-data-table-component";
import { BotonFroms } from "../../../components/Boton/BotonForms";
import { CustomHeader } from "../../../components/CustomHeaderTable/CustomHeaderTable";
import { Search } from "../../../components/datatable/Search";
import { DataAlmacen } from "../../../helpers/DataAlmacen";
import { ModalAlmacen } from "./ModalAlmacen";

const columns = [
  {
    cell: () => <img src="/img/car.gif" alt="" width={70} />,
    width: "5rem",
  },
  {
    name: <CustomHeader nameModule="CLIENTE" icon="fa-solid fa-user mr-1"/>,
    selector: (row) => <p>{row.nombre} {row.apellido}</p>,
    sortable: true,
    width: "15rem",
  },
  {
    name: <CustomHeader nameModule="OT" icon="fa-solid fa-phone mr-1"/>,
    cell: (row) => <p>{row.telefono}</p>,
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
    name: <CustomHeader nameModule="SERVICIO" icon="fa-solid fa-tools mr-1"/>,
    selector: (row) => row.placa,
    sortable: true,
    center: true
  },
  {
    name: <CustomHeader nameModule="KILOMETRAJE" icon="fa-solid fa-tachometer mr-1"/>,
    selector: (row) => row.kilometraje,
    sortable: true,
    center: true
  },
  {
    name: <CustomHeader nameModule="HORA CITA" icon="fa-solid fa-clock mr-1"/>,
    selector: (row) => row.horaLlegada,
    sortable: true,
  },

  {
    name: <CustomHeader nameModule="ESTADO" icon="fa-solid fa-user-clock mr-1"/>,
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
        when: (row) => row.estado === "Listo",
        style: {
          backgroundColor: "#4AD69D",
        },
      },
      {
        when: (row) => row.estado === "Pendiente",
        style: {
          backgroundColor: "#FFD966",
        },
      },
    ],
  },
  {
    name: <CustomHeader nameModule="ACCIONES" icon="fa-solid fa-cog mr-1"/>,
    cell: row => 
    <div className="flex items-center gap-3">
      <ModalAlmacen tipo="edit" data={row} />
    </div>,//Aquí se agregó la funcionalidad del modal, para el botón editar
    center: true,
  },
];
export const TableAlmacen = () => {
  const [placa, setPlaca] = useState("");

  const filteredItems = DataAlmacen.filter(
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
                checked={estado === "Pendiente"}
                onChange={() => setEstado(estado === "Pendiente" ? false : "Pendiente")}
              />
              <span className="ml-1">Pendiente</span>
            </label>
            <br />
            <label className="p-1 flex items-center justify-center">
              <input
                className="w-5 h-5 appearance-none border rounded-md transition-all duration-200 ease-out checked:bg-green-500"
                type="checkbox"
                checked={estado === "Listo"}
                onChange={() => setEstado(estado === "Listo" ? false : "Listo")}
              />
              <span className="ml-1">Listo</span>
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
