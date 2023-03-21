import { useState } from "react";
import DataTable from "react-data-table-component";
import { CustomHeader } from "../../../../components/CustomHeaderTable/CustomHeaderTable";
import { Search } from "../../../../components/datatable/Search";
import { DataAlmacen } from "../../../../helpers/DataAlmacen";
import { DataAsignacionServicio } from "../../../../helpers/DataAsignacion";
// import { BotonFroms } from "../../../components/Boton/BotonForms";
import { ModalServicio } from "./ModalServicio";

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
    selector: (row) => row.horaEstimada,
    sortable: true,
    center: true
  },
  {
    name: <CustomHeader nameModule="TIPO DE SERVICIO" />,
    selector: (row) => row.servicio,
    sortable: true,
    center: true,
    width: "10rem",
  },
  {
    name: <CustomHeader nameModule="ASESOR" />,
    selector: (row) => row.asesor,
    sortable: true,
    center: true
  },
  {
    name: <CustomHeader nameModule="HORA RECEPCION" />,
    selector: (row) => row.horaRecepcion,
    sortable: true,
    center: true
  },
  {
    name: <CustomHeader nameModule="HORA DE ASIGNACION" />,
    selector: (row) => row.horaAsignacion,
    sortable: true,
    center: true
  },
  {
    name: <CustomHeader nameModule="HORA INICIO DE MANTENIMIENTO" />,
    selector: (row) => row.horaInicioMantenimiento,
    sortable: true,
    center: true,
    width: "10rem",
  },
  {
    name: <CustomHeader nameModule="HORA FIN DE MANTENIMIENTO" />,
    selector: (row) => row.horaFinMantenimiento,
    sortable: true,
    center: true,
    width: "10rem"
  },
  {
    name: <CustomHeader nameModule="ESTADO DE MANTENIMIENTO" />,
    selector: (row) => row.estadoMantenimiento,
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
    width: "10rem",
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
        },
      },
      {
        when: (row) => row.ubicacion === "Lavado",
        style: {
          backgroundColor: "#60A5FA",
        },
      },
      {
        when: (row) => row.ubicacion === "Mantenimiento",
        style: {
          backgroundColor: "#F97316",
        },
      },
      {
        when: (row) => row.ubicacion === "Secado",
        style: {
          backgroundColor: "#9CA3AF",
        },
      },
      {
        when: (row) => row.ubicacion === "Control de calidad",
        style: {
          textAlign: "center",
          wordBreak: "break-all",
          backgroundColor: "#6B21A8",
        },
      },
      {
        when: (row) => row.ubicacion === "Pre Entrega",
        style: {
          backgroundColor: "#FFD966",
        },
      },
    ],
  },
  {
    name: <CustomHeader nameModule="CONFIRMACION DE SALIDA DE LA UNIDAD" />,
    selector: (row) => row.salidaUnidad,
    sortable: true,
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
        when: (row) => row.salidaUnidad === "Unidad Entregada",
        style: {
          backgroundColor: "#4AD69D",
        },
      },
      {
        when: (row) => row.salidaUnidad === "Pendiente",
        style: {
          backgroundColor: "#FFD966",
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
export const TableServicio = () => {
  const [placa, setPlaca] = useState("");

  const filteredItems = DataAsignacionServicio.filter(
    (item) =>
      item.placa && item.placa.toLowerCase().includes(placa.toLowerCase())
  );
  
  const [estado, setEstado] = useState("")

  const filtro2 = filteredItems.filter((item) =>
    item.ubicacion && item.ubicacion.includes(estado) || item.estadoAsignacion && item.estadoAsignacion.includes(estado)) 
 
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-2 lg:mb-0">
        <Search placa={placa} setPlaca={setPlaca} />
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
