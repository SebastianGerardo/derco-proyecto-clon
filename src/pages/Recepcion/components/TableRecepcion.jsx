import { useState } from "react";
import DataTable from "react-data-table-component";
import { BotonFroms } from "../../../components/Boton/BotonForms";
import { CustomHeader } from "../../../components/CustomHeaderTable/CustomHeaderTable";
import { Search } from "../../../components/datatable/Search";
import { DataRecepcion } from "../../../helpers/DataRecepcion";
import { ModalRecepcion } from "./ModalRecepcion";

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
    name: <CustomHeader nameModule="TELEFONO" icon="fa-solid fa-phone mr-1"/>,
    cell: (row) => <p>{row.telefono}</p>,
    sortable: true,
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
        when: (row) => row.estado === "Recepcion",
        style: {
          backgroundColor: "#4AD69D",
        },
      },
      {
        when: (row) => row.estado === "Pendiente",
        style: {
          backgroundColor: "#FDAB3D",
        },
      },
      {
        when: (row) => row.estado === "Secado",
        style: {
          backgroundColor: "#0073EA",
        },
      },
    ],
  },
  {
    name: <CustomHeader nameModule="ACCIONES" icon="fa-solid fa-cog mr-1"/>,
    cell: row => <div className="flex items-center gap-3">
      <ModalRecepcion tipo="edit" data={row} />
      <button disabled={row.estado !== "Secado"} className={`${row.estado !== "Secado" ? "text-gray-500" : "text-blue-500"}`}><i className="fa-solid fa-door-open fa-2x"></i></button>
    </div>,//Aquí se agregó la funcionalidad del modal, para el botón editar
    center: true,
  },
];
export const TableRecepcion = () => {
  const [placa, setPlaca] = useState("");

  const filteredItems = DataRecepcion.filter(
    (item) =>
      item.placa && item.placa.toLowerCase().includes(placa.toLowerCase())
  );

  const filtroEstado = (e) => {
    e.preventDefault()
  }
  const [estado, setEstado] = useState("")
  const capturarEstados = ({ target }) => {
    setEstado(target.value)
  }

  const filtro2 = filteredItems.filter((item) =>
    item.estado && item.estado.includes(estado))
 



  return (
    <>
      <form action="" onSubmit={filtroEstado}>
        <select name="" id="" onChange={capturarEstados}>
          <option value="">Estado</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Recepcion">Recepción</option>
          <option value="Asignación">Asignación</option>
          <option value="Servicio">Servicio</option>
          <option value="Lavado">Lavado</option>
          <option value="Secado">Secado</option>
          <option value="Entrega">Entrega</option>
        </select>
      </form>
      {/**Componente Search de la tabla */}
      <Search placa={placa} setPlaca={setPlaca} />
      <DataTable
        columns={columns}
        data={estado !== "" ? filtro2 : filteredItems}
        pagination
      />
    </>
  );
};
