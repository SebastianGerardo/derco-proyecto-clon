import { useState } from "react";
import DataTable from "react-data-table-component";
import { CustomHeader } from "../../../components/CustomHeaderTable/CustomHeaderTable";
import { Search } from "../../../components/datatable/Search";
import { FormtearFecha } from "../../../helpers/funcions";
import { ModalAlmacen } from "./ModalAlmacen";

export const TableAlmacen = ({ data }) => {

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
      selector: (row) => <p>{row.nombres}</p>,
      sortable: true,
      center: true,
    },
    {
      name: <CustomHeader nameModule="OT" icon="fa-regular fa-id-card mr-1" />,
      cell: (row) => <p>{row.ot}</p>,
      sortable: true,
      center: true,
    },
    {
      name: <CustomHeader nameModule="PLACA" icon="fa-solid fa-id-card mr-1" />,
      selector: (row) => row.placa,
      sortable: true,
      width: "7rem",
      center: true
    },
    {
      name: <CustomHeader nameModule="SERVICIO" icon="fa-solid fa-tools mr-1" />,
      selector: (row) => row.servicioSolicitado,
      sortable: true,
      center: true
    },
    {
      name: <CustomHeader nameModule="KILOMETRAJE" icon="fa-solid fa-tachometer mr-1" />,
      selector: (row) => <p>{row.vehiculoKilometraje} km</p>,
      sortable: true,
      center: true
    },
    {
      name: <CustomHeader nameModule="HORA RECEPCION" icon="fa-solid fa-clock mr-1" />,
      selector: (row) => row.fechaInicioRecepcion === null ? "--" : `${FormtearFecha(row.fechaInicioRecepcion)}`,
      sortable: true,
      center: true
    },

    {
      name: <CustomHeader nameModule="ESTADO" icon="fa-solid fa-user-clock mr-1" />,
      selector: (row) => row.estadoPicking === "0" ? "Pendiente" : "Listo",
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
          when: (row) => row.estadoPicking === "0",
          style: {
            backgroundColor: "#FFD966",
          },
        },
        {
          when: (row) => row.estadoPicking === "1",
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
          <ModalAlmacen tipo="edit" data={row} />
        </div>,//Aquí se agregó la funcionalidad del modal, para el botón editar
      center: true,
    },
  ];
  let ordenado = data.sort((a, b) => new Date(b.fechaRegistro) - new Date(a.fechaRegistro))

  const [placa, setPlaca] = useState("");


  const filteredItems = ordenado.filter((item) => item.placa && item.placa.toLowerCase().includes(placa.toLowerCase()) || item.ot && item.ot.toLowerCase().includes(placa.toLowerCase()));

  const filtroEstado = (e) => {
    e.preventDefault()
  }

  const [estado, setEstado] = useState("")

  const filtro2 = filteredItems.filter((item) => item.estadoPicking && item.estadoPicking.includes(estado))



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
                checked={estado === "0"}
                onChange={() => setEstado(estado === "0" ? "" : "0")}
              />
              <span className="ml-1">Pendiente</span>
            </label>
            <br />
            <label className="p-1 flex items-center justify-center">
              <input
                className="w-5 h-5 appearance-none border rounded-md transition-all duration-200 ease-out checked:bg-green-500"
                type="checkbox"
                checked={estado === "1"}
                onChange={() => setEstado(estado === "1" ? "" : "1")}
              />
              <span className="ml-1">Listo</span>
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
