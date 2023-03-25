import { useState } from "react";
import DataTable from "react-data-table-component";
import { Cargando } from "../../../components/Cargando/Cargando";
import { Search } from "../../../components/datatable/Search";
import { useCargando } from "../../../hooks/useCargando";
import { ModalAnfitrion } from "./ModalAnfitrion";
import { CustomHeader } from "../../../components/CustomHeaderTable/CustomHeaderTable";
import { BtnMasivo } from "./BtnMasivo";
import { FormtearFecha } from "../../../helpers/funcions";


const columns = [
  {
    cell: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="stroke-current text-gray-700/50 w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
    ,
    width: "5rem",
    center: true
  },
  {
    name: <CustomHeader nameModule="CLIENTE" icon="fa-solid fa-user mr-1" />,
    cell: (row) => <p>{row.nombres}</p>,
    sortable: true,
    center: true,
  },
  {
    name: <CustomHeader nameModule={"PLACA"} icon='fa-solid fa-id-card mr-1' />,
    selector: (row) => row.placa,
    sortable: true,
    width: "6.5rem",
    center: true,
  },
  {
    name: "Fecha",
    selector: (row) => row.fecha,
    omit: true,
  },
  {
    name: <CustomHeader nameModule="ASESOR" icon='fa-solid fa-user-tie mr-1' />,
    selector: (row) => <p>{row.asesor?.nombres !== undefined ? `${row.asesor?.nombres}` : "--"} </p>,
    sortable: true,
    center: true,
  },
  {
    name: <CustomHeader nameModule="KILOMETRAJE" icon='fa-solid fa-tachometer mr-1' />,
    selector: (row) => (
      <p>{row.vehiculoKilometraje !== null ? `${row.vehiculoKilometraje} km` : "--"} </p>
    ),
    sortable: true,
    center: true,
  },
  {
    name: <CustomHeader nameModule="HORA CITA" icon='fa-solid fa-clock mr-1' />,
    selector: (row) => (
      <p>{row.fechaCita !== null ? `${FormtearFecha(new Date(row.fechaCita))}` : "--"} </p>
    ),
    sortable: true,
    center: true,
  },
  {
    name: <CustomHeader nameModule="UBICACION" icon='fa-solid fa-user-check mr-1' />,
    cell: (row) => row.estado === "1" && "Abordaje",
    sortable: true,
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
        when: (row) => row.estado === "1",
        style: {
          backgroundColor: "#FDAB3D",
        },
      }
    ],
    center: true,
  },
  {
    name: <CustomHeader nameModule="ESTADO" icon='fa-solid fa-user-clock mr-1' />,
    selector: (row) => row.asistencia === "0" ? "No Asignado" : row.asistencia === "1" ? "Pendiente" : "Asignado",
    sortable: true,
    center: true,
    width: "10.5rem",
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
        when: (row) => row.asistencia === "0",
        selector: () => "Pendiente",
        style: {
          backgroundColor: "#C00000",
        },
      },
      {
        when: (row) => row.asistencia === "1",
        style: {
          backgroundColor: "#FFD966",
        },
      },
      {
        when: (row) => row.asistencia === "2",
        style: {
          backgroundColor: "#00B050",
        },
      },
    ],
  },
  {
    name: <CustomHeader nameModule="ACCIONES" icon='fa-solid fa-cog mr-1' />,
    cell: (row) => <ModalAnfitrion data={row} tipo="edit" />, //Aquí se agregó la funcionalidad del modal, para el botón editar
    center: true,
  },
];
export const TableAnfitrion = ({ dataAnfitrion }) => {
  console.log(dataAnfitrion)
  /*FIltro de DataTable*/
  const [placa, setPlaca] = useState("");
  const filteredItems = dataAnfitrion?.filter(
    (item) =>
      item.placa && item.placa.toLowerCase().includes(placa.toLowerCase())
  );

  /*Cargando*/
  const [pending] = useCargando(filteredItems);

  return (
    <>
      {/* Buscardor de la tabla */}
      <div className="flex flex-col lg:flex-row lg:justify-between items-center w-full">
        <Search placa={placa} setPlaca={setPlaca} />
        <div className="">
          <BtnMasivo />
          <ModalAnfitrion tipo="crear" />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredItems}
        progressPending={pending}
        progressComponent={<Cargando />}
        pagination
      />
    </>
  );
};
