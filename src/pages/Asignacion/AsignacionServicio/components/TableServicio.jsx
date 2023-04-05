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
    name: <CustomHeader nameModule="SERVICIOS ASIGNADOS" />,
    selector: (row) => 
    <div className="flex gap-2 min-w-full">
      {row.ordenServicios.split(',').map((item, index) => {
        return (
            <p key={index}>{item}</p>
        )
      })}
    </div>,
    width: "20rem",
    sortable: true,
    center: true,
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
    selector: (row) => row.confirmacionSalida === "1" ? "Pendiente" : "Unidad Entregada",
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
        when: (row) => row.confirmacionSalida === "1",
        style: {
          backgroundColor: "#FFD966",
        },
      },
      {
        when: (row) => row.confirmacionSalida === "2",
        style: {
          backgroundColor: "#4AD69D",
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
    ot: servicio.ot,
    placa: servicio.placa,
    horaEstimadaEntrega: servicio.horaEstimadaEntrega,
    tipoServicio: servicio.tipoServicio,
    ubicacion: datosAsignados.ubicacion,
    ordenServicios: datosAsignados.ordenServicios,
    confirmacionSalida: datosAsignados.confirmacionSalida,
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

  // [
  //   {
  //     servicio: {
  //       id: 1472,
  //       nombres: 'Juancito',
  //       telefono: null,
  //       correo: null,
  //       documento: null,
  //       placa: '123123',
  //       marca: null,
  //       modelo: null,
  //       ot: null,
  //       horaEstimadaEntrega: null,
  //       detalleServicio: null,
  //       notasCliente: null,
  //       comentarioInterno: null,
  //       comentarioAlmacen: null,
  //       comentario: null,
  //       servicioSolicitado: null,
  //       vehiculoKilometraje: '5000',
  //       estado: '5',
  //       estadoPicking: '1',
  //       solicitudTaller: null,
  //       asistencia: '1',
  //       tipoCita: 'S',
  //       adicionales: '[]',
  //       fechaCita: null,
  //       fechaInicioRecepcion: '2023-04-05T06:34:36.000Z',
  //       fechaFinRecepcion: null,
  //       fechaEntrada: '2023-04-05T06:34:17.000Z',
  //       fechaRegistro: '2023-04-05T06:34:31.000Z',
  //       asesor: { id: 9, nombres: 'Felipe', apellidos: 'Currado' },
  //       tipoServicio: null
  //     },
  //     datosAsignados: {
  //       id: 41,
  //       ubicacion: 'Lavado',
  //       ordenServicios: 'Lavado,Secado,Mantenimiento',
  //       confirmacionSalida: '1',
  //       estado: '1',
  //       fecha_registro: '2023-04-05T06:35:19.000Z'
  //     }
  //   }, 
  //   {
  //     servicio: {
  //       id: 1473,
  //       nombres: 'pepito',
  //       telefono: null,
  //       correo: null,
  //       documento: null,
  //       placa: '888888',
  //       marca: null,
  //       modelo: null,
  //       ot: null,
  //       horaEstimadaEntrega: null,
  //       detalleServicio: null,
  //       notasCliente: null,
  //       comentarioInterno: null,
  //       comentarioAlmacen: null,
  //       comentario: null,
  //       servicioSolicitado: null,
  //       vehiculoKilometraje: '5000',
  //       estado: '5',
  //       estadoPicking: '1',
  //       solicitudTaller: null,
  //       asistencia: '1',
  //       tipoCita: 'S',
  //       adicionales: '[]',
  //       fechaCita: null,
  //       fechaInicioRecepcion: '2023-04-05T06:40:38.000Z',
  //       fechaFinRecepcion: null,
  //       fechaEntrada: '2023-04-05T06:40:23.000Z',
  //       fechaRegistro: '2023-04-05T06:40:34.000Z',
  //       asesor: { id: 9, nombres: 'Felipe', apellidos: 'Currado' },
  //       tipoServicio: null
  //     },
  //     datosAsignados: {
  //       id: 42,
  //       ubicacion: 'Lavado',
  //       ordenServicios: 'Lavado,Mantenimiento',
  //       confirmacionSalida: '1',
  //       estado: '1',
  //       fecha_registro: '2023-04-05T06:40:57.000Z'
  //     }
  //   },
  // ]