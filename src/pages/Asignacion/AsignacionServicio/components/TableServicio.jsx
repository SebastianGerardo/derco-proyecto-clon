import { useState } from "react";
import DataTable from "react-data-table-component";
import { CustomHeader } from "../../../../components/CustomHeaderTable/CustomHeaderTable";
import { Search } from "../../../../components/datatable/Search";
import { DataAlmacen } from "../../../../helpers/DataAlmacen";
import { DataAsignacionServicio } from "../../../../helpers/DataAsignacion";
// import { BotonFroms } from "../../../components/Boton/BotonForms";
import { ModalServicio } from "./ModalServicio";

const colorServicios = {
  "1": "bg-[#FFD966]",
  "2": "bg-[#DC2626]",
  "3": "bg-[#9B5DA2]",
  "4": "bg-[#4AC695]",
}

const columns = [
  {
    name: <CustomHeader nameModule="OT" />,
    cell: (row) => <p>{row.ot}</p>,
    // sortable: true,
    center: true,
    width: "5rem",
  },
  {
    name: <CustomHeader nameModule="PLACA" />,
    selector: (row) => row.placa,
    // sortable: true,
    width: "7rem",
    center: true
  },
  {
    name: <CustomHeader nameModule="HORA ESTIMADA DE ENTREGA" />,
    selector: (row) => row.horaEstimadaEntrega,
    // sortable: true,
    center: true,
    width: "10rem",
  },
  {
    name: <CustomHeader nameModule="TIPO DE SERVICIO" />,
    selector: (row) => JSON.parse(row.tipoServicio).nombre,
    // sortable: true,
    center: true,
    width: "12rem",
  },
  {
    name: <CustomHeader nameModule="UBICACION" />,
    selector: (row) => row.ubicacion,
    // sortable: true,
    width: "10rem",
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
        when: (row) => row.ubicacion === "Entrega",
        style: {
          backgroundColor: "#4AD69D",
          borderRadius: "9999px",
        },
      },
      {
        when: (row) => row.ubicacion === "Lavado",
        style: {
          backgroundColor: "#00B0F0",
          borderRadius: "9999px",
        },
      },
      {
        when: (row) => row.ubicacion === "Mantenimiento",
        style: {
          backgroundColor: "#F97316",
          borderRadius: "9999px",
        },
      },
      {
        when: (row) => row.ubicacion === "Secado",
        style: {
          backgroundColor: "#9CA3AF",
          borderRadius: "9999px",
        },
      },
      {
        when: (row) => row.ubicacion === "Control de Calidad",
        style: {
          textAlign: "center",
          wordBreak: "break-all",
          backgroundColor: "#6B21A8",
          borderRadius: "9999px",
        },
      },
      {
        when: (row) => row.ubicacion === "Pre Entrega",
        style: {
          backgroundColor: "#FFD966",
          borderRadius: "9999px",
        },
      },
    ],
  },
  {
    name: <CustomHeader nameModule="SERVICIOS ASIGNADOS" />,
    cell: ({ ordenServicios }) => 
    <div className="flex gap-3 justify-start w-full">
      {ordenServicios.map(res => {
        return <div className={`text-sm ${colorServicios[res.terminado]} p-2 h-[39.2px] text-center rounded-full text-white font-bold`}>
          {res.nombre}
        </div>
      })}
    </div>,
    width: "30rem",
    center: true,
  },
  {
    name: <CustomHeader nameModule="CONFIRMACION DE SALIDA" />,
    selector: (row) => row.confirmacionSalida === "1" ? "Pendiente" : "Unidad Entregada",
    // sortable: true,
    center: true,
    width: "10rem",
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
        when: (row) => row.confirmacionSalida === "1",
        style: {
          backgroundColor: "#FFD966",
          borderRadius: "9999px",
        },
      },
      {
        when: (row) => row.confirmacionSalida === "2",
        style: {
          backgroundColor: "#4AD69D",
          borderRadius: "9999px",
        },
      },
    ],
  },
  {
    name: <CustomHeader nameModule="ACCIONES" />,
    cell: row =>
      <div className="flex items-center gap-3">
        <ModalServicio tipo="edit" data={row} />
      </div>,//Aquí se agregó la funcionalidad del modal, para el botón editar
    center: true,
  },
];
export const TableServicio = ({ dataServicios }) => {

  const [placa, setPlaca] = useState("");

  const newData = dataServicios.map(({ servicio, datosAsignados }) => ({
    datosAsignadosId: datosAsignados.id,
    ot: servicio.ot,
    placa: servicio.placa,
    horaEstimadaEntrega: servicio.horaEstimadaEntrega,
    tipoServicio: JSON.stringify(servicio?.tipoServicio),
    ubicacion: datosAsignados.ubicacion,
    ordenServicios: datosAsignados.ordenServicios,
    confirmacionSalida: datosAsignados.confirmacionSalida,
    nombres: servicio.nombres,
  }))

  const [estado, setEstado] = useState("1")

  const filteredItems = newData.filter(
    (item) =>
      item.placa && item.placa.toLowerCase().includes(placa.toLowerCase())
  );

  const filtro2 = filteredItems.filter((item) => item.confirmacionSalida && item.confirmacionSalida.includes(estado))

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-2 lg:mb-0">
        <Search placa={placa} setPlaca={setPlaca} />
        <form
          action=""
          className="border-solid border-gray-500 border w-72 px-2 py-1 rounded-md"
        >
          <p className="text-gray-500">Filtro por estado:</p>

        <div className="flex justify-evenly">
            <label className="p-1 flex items-center justify-center">
              <input
                className="w-5 h-5 appearance-none border rounded-md transition-all duration-200 ease-out checked:bg-green-500"
                type="checkbox"
                checked={estado === "1"}
                onChange={() => setEstado(estado === "1" ? "" : "1")}
              />
              <span className="ml-1">Pendiente</span>
            </label>
            <br />
            <label className="p-1 flex items-center justify-center">
              <input
                className="w-5 h-5 appearance-none border rounded-md transition-all duration-200 ease-out checked:bg-green-500"
                type="checkbox"
                checked={estado === "2"}
                onChange={() => setEstado(estado === "2" ? "" : "2")}
              />
              <span className="ml-1">Entregado</span>
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
