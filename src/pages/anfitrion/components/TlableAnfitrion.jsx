import { useContext, useState } from "react";
import DataTable from "react-data-table-component";
import { Cargando } from "../../../components/Cargando/Cargando";
import { DescargarExcel } from "../../../components/datatable/DescargarExcel";
import { Search } from "../../../components/datatable/Search";
import { UserContext } from "../../../context/ContextDerco";
import { DataDerco } from "../../../helpers/Data";
import { useCargando } from "../../../hooks/useCargando";
import { ModalAnfitrion } from "./ModalAnfitrion";
const columns = [
  {
    cell: () => <img src="/img/car.gif" alt="" width={70} />,
    width: "5rem",
    center: true,
  },
  {
    name: "CLIENTE",
    cell: (row) => <p>{row.nombre}</p>,
    sortable: true,
    center: true,
  },
  {
    name: "PLACA",
    selector: (row) => row.placa,
    sortable: true,
    width: "6rem",
    center: true,
  },
  {
    name: "Fecha",
    selector: (row) => row.fecha,
    omit: true,
  },
  {
    name: "ASESOR",
    selector: (row) => <p>{row.asesor !== "" ? `${row.asesor}` : "--"} </p>,
    sortable: true,
    center: true,
  },
  {
    name: "KILOMETRAJE",
    selector: (row) => (
      <p>{row.kilometraje !== "" ? `${row.kilometraje} km` : "--"} </p>
    ),
    sortable: true,
    center: true,
  },
  {
    name: "HORA CITA",
    selector: (row) => (
      <p>{row.horaCita !== "" ? `${row.horaCita} pm` : "--"} </p>
    ),
    sortable: true,
    center: true,
  },
  {
    name: "ESTADO CLIENTE",
    cell: (row) => row.estadoCliente,
    sortable: true,
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
        when: (row) => row.estadoCliente === "Pendiente",
        style: {
          backgroundColor: "#FDAB3D",
        },
      },
      {
        when: (row) => row.estadoCliente === "Asistio",
        style: {
          backgroundColor: "#4AD69D",
        },
      },
      {
        when: (row) => row.estadoCliente === "No asistio",
        style: {
          backgroundColor: "#D90912",
        },
      },
    ],
    center: true,
  },
  {
    name: "ESTADO PROCESO",
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
          backgroundColor: "#06F11C",
        },
      },
      {
        when: (row) => row.estado === "Pendiente",
        style: {
          backgroundColor: "#FDAB3D",
        },
      },
    ],
  },
  {
    name: "ACCIONES",
    cell: (row) => <ModalAnfitrion data={row} tipo="edit" />, //Aquí se agregó la funcionalidad del modal, para el botón editar
    center: true,
  },
];
export const TableAnfitrion = () => {
  /*Hacermos Validaciones */
  const { UsuarioLogin } = useContext(UserContext);

  const [placa, setPlaca] = useState("");
  const filteredItems = DataDerco.filter(
    (item) =>
      item.placa && item.placa.toLowerCase().includes(placa.toLowerCase())
  );
  const [pending] = useCargando(filteredItems);
  return (
    <>
      {/* Buscardor de la tabla */}
      <div className="flex justify-between items-center w-full">
        <Search placa={placa} setPlaca={setPlaca} />
        {UsuarioLogin.usuario?.tipo.nombre === "Administrador" && (
          <DescargarExcel array={filteredItems} />
        )}
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
