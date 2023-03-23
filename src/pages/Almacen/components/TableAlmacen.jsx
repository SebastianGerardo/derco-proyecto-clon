import { useState } from "react";
import DataTable from "react-data-table-component";
import { CustomHeader } from "../../../components/CustomHeaderTable/CustomHeaderTable";
import { Search } from "../../../components/datatable/Search";
import { ModalAlmacen } from "./ModalAlmacen";

export const TableAlmacen = ({ data }) => {

  const columns = [
    {
      cell: () => <img src="/img/car.gif" alt="" width={40} />,
      center: true,
    },
    {
      name: <CustomHeader nameModule="CLIENTE" icon="fa-solid fa-user mr-1" />,
      selector: (row) => <p>{row.nombres}</p>,
      sortable: true,
      center: true,
    },
    {
      name: <CustomHeader nameModule="OT" icon="fa-solid fa-phone mr-1" />,
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
      selector: (row) => row.tipoServicio.nombre,
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
      name: <CustomHeader nameModule="HORA CITA" icon="fa-solid fa-clock mr-1" />,
      selector: (row) => row.fechaCita === null && "--",
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


  const [placa, setPlaca] = useState("");


  const filteredItems = data.filter((item) => item.placa && item.placa.toLowerCase().includes(placa.toLowerCase()) || item.ot && item.ot.toLowerCase().includes(placa.toLowerCase()));

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
                onChange={() => setEstado(estado === "0" ? false : "0")}
              />
              <span className="ml-1">Pendiente</span>
            </label>
            <br />
            <label className="p-1 flex items-center justify-center">
              <input
                className="w-5 h-5 appearance-none border rounded-md transition-all duration-200 ease-out checked:bg-green-500"
                type="checkbox"
                checked={estado === "1"}
                onChange={() => setEstado(estado === "1" ? false : "1")}
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
