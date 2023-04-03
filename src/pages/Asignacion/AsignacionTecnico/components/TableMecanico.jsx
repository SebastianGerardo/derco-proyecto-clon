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
    name: <CustomHeader nameModule="OT" icon="fa-solid fa-phone mr-1" />,
    cell: (row) => { row.servicio?.ot },
    sortable: true,
    center: true,
  },
  {
    name: <CustomHeader nameModule="PLACA" icon="fa-solid fa-id-card mr-1" />,
    selector: (row) => row.servicio?.placa,
    sortable: true,
    width: "7rem",
    center: true
  },
  {
    name: <CustomHeader nameModule="KILOMETRAJE" icon="fa-solid fa-clock mr-1" />,
    selector: (row) => row.servicio?.vehiculoKilometraje,
    sortable: true,
    center: true,
  },
  {
    name: <CustomHeader nameModule="TIPO DE SERVICIO" icon="fa-solid fa-tools mr-1" />,
    selector: (row) => row.servicio?.tipoServicio?.nombre,
    sortable: true,
    center: true
  },
  {
    name: <CustomHeader nameModule="MARCA" icon="fa-solid fa-clock mr-1" />,
    selector: (row) => row.servicio?.marca,
    sortable: true,
    center: true,
  },
  {
    name: <CustomHeader nameModule="MODELO" icon="fa-solid fa-clock mr-1" />,
    selector: (row) => row.servicio?.modelo,
    sortable: true,
    center: true,
  },
  {
    name: <CustomHeader nameModule="HORA DE RECEPCIÓN" icon="fa-solid fa-clock mr-1" />,
    selector: (row) => FormtearFecha(row.servicio?.fechaInicioRecepcion),
    sortable: true,
    center: true,
  },
  {
    name: <CustomHeader nameModule="HORA ESTIMADA DE ENTREGA" icon="fa-solid fa-clock mr-1" />,
    selector: (row) => row.servicio?.horaEstimadaEntrega,
    sortable: true,
    center: true,
  },
  {
    name: <CustomHeader nameModule="ESTADO" icon="fa-solid fa-user-clock mr-1" />,
    selector: (row) => row.estadoAsignado === "1" ? "Pendiente" : "Asignado",
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
        when: (row) => row.estadoAsignado === "1",
        style: {
          backgroundColor: "#FFD966",
        },
      },
      {
        when: (row) => row.estadoAsignado === "2",
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
      item.servicio?.placa && item.servicio?.placa.toLowerCase().includes(placa.toLowerCase())
  );

  const filtroEstado = (e) => {
    e.preventDefault()
  }

  const [estado, setEstado] = useState("")

  const filtro2 = filteredItems.filter((item) =>
    item.estadoAsignado && item.estadoAsignado.includes(estado))



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
                checked={estado === "1"}
                onChange={() => setEstado(estado === "1" ? false : "1")}
              />
              <span className="ml-1">Pendiente</span>
            </label>
            <br />
            <label className="p-1 flex items-center justify-center">
              <input
                className="w-5 h-5 appearance-none border rounded-md transition-all duration-200 ease-out checked:bg-green-500"
                type="checkbox"
                checked={estado === "2"}
                onChange={() => setEstado(estado === "2" ? false : "2")}
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
      />
    </>
  );
};
