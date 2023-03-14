import { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Cargando } from "../../../components/Cargando/Cargando";
import { DescargarExcel } from "../../../components/datatable/DescargarExcel";
import { Search } from "../../../components/datatable/Search";
import { UserContext } from "../../../context/ContextDerco";
import { TraeDataAnfitrion } from "../../../helpers/ApiAnfitrion";
import { DataDerco } from "../../../helpers/Data";
import { useCargando } from "../../../hooks/useCargando";
import { ModalAnfitrion } from "./ModalAnfitrion";
import { CustomHeader } from "../../../components/CustomHeaderTable/CustomHeaderTable";

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
    selector: (row) => <p>{row.asesor !== "" ? `${row.asesor}` : "--"} </p>,
    sortable: true,
    center: true,
  },
  {
    name: <CustomHeader nameModule="KILOMETRAJE" icon='fa-solid fa-tachometer mr-1' />,
    selector: (row) => (
      <p>{row.vehiculoKilometraje !== "" ? `${row.vehiculoKilometraje} km` : "--"} </p>
    ),
    sortable: true,
    center: true,
  },
  {
    name: <CustomHeader nameModule="HORA CITA" icon='fa-solid fa-clock mr-1' />,
    selector: (row) => (
      <p>{row.horaCita !== "" ? `${row.horaCita} pm` : "--"} </p>
    ),
    sortable: true,
    center: true,
  },
  {
    name: <CustomHeader nameModule="ESTADO CLIENTE" icon='fa-solid fa-user-check mr-1' />,
    cell: (row) => row.estadoCliente,
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
        when: (row) => row.estadoCliente === "Pendiente",
        style: {
          backgroundColor: "#FFD300",
        },
      },
      {
        when: (row) => row.estadoCliente === "Asistio",
        style: {
          backgroundColor: "#00FF00",
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
    name: <CustomHeader nameModule="ESTADO PROCESO" icon='fa-solid fa-user-clock mr-1' />,
    selector: (row) => row.estado,
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
        when: (row) => row.estado === "Recepcion",
        style: {
          backgroundColor: "#87CEFA",
        },
      },
      {
        when: (row) => row.estado === "Pendiente",
        style: {
          backgroundColor: "#FFD300",
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
export const TableAnfitrion = () => {
  /*Hacermos Validaciones */
  const { UsuarioLogin } = useContext(UserContext);
  /*Peticion Api*/
  const [dataAnfitrion, setDataAnfitrion] = useState([])
  useEffect(() => {
    TraeDataAnfitrion().then((res) => setDataAnfitrion(res.data));
  }, []);
  /*FIltro de DataTable*/
  const [placa, setPlaca] = useState("");
  const filteredItems = dataAnfitrion.filter(
    (item) =>
      item.placa && item.placa.toLowerCase().includes(placa.toLowerCase())
  );
  /*Cargando*/
  const [pending] = useCargando(filteredItems);
  return (
    <>
      {/* Buscardor de la tabla */}
      <div className="flex justify-between items-center w-full">
        <Search placa={placa} setPlaca={setPlaca} />
        {UsuarioLogin.data?.usuario?.tipo.nombre === "Administrador" && (
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
