import { useState } from "react";
import DataTable from "react-data-table-component";
import { CustomHeader } from "../../../../components/CustomHeaderTable/CustomHeaderTable";
import { Search } from "../../../../components/datatable/Search";
import { DataAlmacen } from "../../../../helpers/DataAlmacen";
import { DataAsignacionServicio } from "../../../../helpers/DataAsignacion";
// import { BotonFroms } from "../../../components/Boton/BotonForms";
import { ModalServicio } from "./ModalServicio";

const colorServicios = {
  "Lavado": "bg-[#00B0F0]",
  "Secado": "bg-[#7F7F7F]",
  "Mantenimiento": "bg-[#B22323]",
  "Control de Calidad": "bg-[#6B21A8]",
  "Pre Entrega": "bg-[#FFD966]",
  "Entrega": "bg-[#46AD63]",
}

const columns = [
  {
    name: <CustomHeader nameModule="OT" />,
    cell: (row) => <p>{row.ot}</p>,
    sortable: true,
    center: true,
    width: "6rem",
  },
  {
    name: <CustomHeader nameModule="PLACA" />,
    selector: (row) => row.placa,
    sortable: true,
    width: "7rem",
    center: true
  },
  {
    name: <CustomHeader nameModule="HORA ESTIMADA DE ENTREGA" />,
    selector: (row) => row.horaEstimadaEntrega,
    sortable: true,
    center: true
  },
  {
    name: <CustomHeader nameModule="TIPO DE SERVICIO" />,
    selector: (row) => row.tipoServicio,
    sortable: true,
    center: true,
    width: "15rem",
  },
  {
    name: <CustomHeader nameModule="UBICACION" />,
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
    selector: (row) => 
    <div className="flex gap-2 min-w-full text-white">
      {row.ordenServicios.split(',').map((item, index) => {
        return (
            <p className={`${colorServicios[item]} text-center py-2 px-4 rounded-full h-[39.2px]`} onClick={() => console.log(colorServicios[item])} key={index}>{item}</p>
        )
      })}
    </div>,
    width: "33rem",
    sortable: true,
    style: {
      color: "black",
      fontSize: "15px",
      margin: "4px",
      borderRadius: "5px",
      fontWeight: "700",
      textAlign: "center",
      cursor: "default",
      width: "100%",
    },
    conditionalCellStyles: [
      {
        when: (row) => row.estadoMantenimiento === "Pendiente",
        style: {
          backgroundColor: "#FFD966",
        },
      },
      {
        when: (row) => row.estadoMantenimiento === "Terminado",
        style: {
          backgroundColor: "#4AD69D",
        },
      },
      {
        when: (row) => row.estadoMantenimiento === "En proceso",
        style: {
          backgroundColor: "#D90912",
        },
      },
    ],
  },
  {
    name: <CustomHeader nameModule="CONFIRMACION DE SALIDA" />,
    selector: (row) => row.confirmacionSalida === "1" ? "Pendiente" : "Unidad Entregada",
    sortable: true,
    center: true,
    width: "auto",
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
export const TableServicio = ({dataServicios}) => {
  const [placa, setPlaca] = useState("");
  
  const newData = dataServicios.map(({servicio, datosAsignados}) => ({
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
  
  const [estado, setEstado] = useState("")

  const filteredItems = newData.filter(
    (item) =>
    item.placa && item.placa.toLowerCase().includes(placa.toLowerCase())
    );

  const filtro2 = filteredItems.filter((item) =>
    item.ubicacion && item.ubicacion.includes(estado)) //|| item.estadoAsignacion && item.estadoAsignacion.includes(estado) 
 
  return (
    <>
      <div onClick={() => console.log(filteredItems)} className="flex flex-col lg:flex-row justify-between items-center mb-2 lg:mb-0">
        <Search placa={placa} setPlaca={setPlaca} />
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
