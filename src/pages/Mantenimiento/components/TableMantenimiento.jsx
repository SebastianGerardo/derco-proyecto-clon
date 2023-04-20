import { useState } from "react";
import DataTable from "react-data-table-component";
import { CustomHeader } from "../../../components/CustomHeaderTable/CustomHeaderTable";
import { Search } from "../../../components/datatable/Search";
import { FormtearFecha } from "../../../helpers/funcions";
import { ModalMantenimiento } from "./ModalMantenimiento";
import { ApiPrueba } from "../../../helpers/ApiPruebaVistas";
import { ModalMensaje } from "./ModalMensaje";
import { ModalDetalle } from "./ModalDetalle";

const estados = {
  "1": "Pendiente",
  "2": "En proceso",
  "3": "Pausa",
  "4": "Finalizado",
}

export const TableMantenimiento = ({ data }) => {
  

  const traeEstado = (data) =>{
    let dataParseada = JSON.parse(data.ordenServicios)
    let resultado = dataParseada.find(res=> res.nombre === "Mantenimiento")
    return resultado.terminado
  }

  const columns = [
    {
      name: <CustomHeader nameModule="OT" icon="fa-regular fa-id-card mr-1" />,
      cell: (row) => <p>{row.servicio.ot}</p>,
      sortable: true,
      center: true,
    },
    {
      name: <CustomHeader nameModule="PLACA" icon="fa-solid fa-id-card mr-1" />,
      selector: (row) => row.servicio.placa,
      sortable: true,
      width: "7rem",
      center: true
    },
    {
      name: <CustomHeader nameModule="TECNICO" icon="fa-solid fa-user mr-1" />,
      selector: (row) => <p>{row.elevador?.tecnico?.nombres}</p>,
      sortable: true,
      center: true,
    },
    {
      name: <CustomHeader nameModule="CONFIRMACION DE PICKING" icon="fa-solid fa-tools mr-1" />,
      selector: (row) => row.servicio.estadoPicking === "1" ? "Pendiente" : "Terminado",
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
          when: (row) => row.servicio.estadoPicking === "1",
          style: {
            backgroundColor: "#FFD34D",
          },
        },
        {
          when: (row) => row.servicio.estadoPicking === "2",
          style: {
            backgroundColor: "#4AC695",
          },
        },
      ],
    },
    {
      name: <CustomHeader nameModule="FECHA / HORA INGRESO" icon="fa-solid fa-clock mr-1" />,
      selector: (row) => FormtearFecha(row.fecha_registro),
      sortable: true,
      center: true
    },

    {
      name: <CustomHeader nameModule="ESTADO" icon="fa-solid fa-user-clock mr-1" />,
      selector: (row) => estados[`${traeEstado(row)}`],
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
          when: (row) => row.estado === "1",
          style: {
            backgroundColor: "#FFD34D",
          },
        },
        {
          when: (row) => row.estado === "2",
          style: {
            backgroundColor: "#B22323",
          },
        },
        {
          when: (row) => row.estado === "3",
          style: {
            backgroundColor: "#9B5DA2",
          },
        },
        {
          when: (row) => row.estado === "4",
          style: {
            backgroundColor: "green",
          },
        },
      ],
    },
    {
      name: <CustomHeader nameModule="ACCIONES" icon="fa-solid fa-cog mr-1" />,
      cell: row =>
        <div className="flex items-center gap-3">
          {
            bloqueo(row) != 4 && (
              <ModalMantenimiento tipo="timer" data={row}  /> 
            ) 
          }
          <ModalMensaje tipo="mensaje" data={row} />
          <ModalDetalle tipo="detalle" data={row} />
        </div>,//Aquí se agregó la funcionalidad del modal, para el botón editar
      center: true,
    },
  ];
  const bloqueo = (data) =>{
    const dataPar = JSON.parse(data.ordenServicios)
    const valor = dataPar.find(res => res.nombre === "Mantenimiento")
    return valor.terminado

  }


  // let ordenado = data.sort((a, b) => new Date(b.fechaRegistro) - new Date(a.fechaRegistro))
  const [placa, setPlaca] = useState("");


  const filteredItems = data.filter((item) => item.placa && item.placa.toLowerCase().includes(placa.toLowerCase()) || item.ot && item.ot.toLowerCase().includes(placa.toLowerCase()));

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
        data={data}
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
