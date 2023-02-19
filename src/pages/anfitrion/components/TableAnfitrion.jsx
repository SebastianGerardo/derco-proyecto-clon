import { useState } from "react";
import DataTable from "react-data-table-component";
import ClientModal from "../../../components/ModalClient/components/ClientModal";
import ModalClient from "../../../components/ModalClient/ModalClient";
import { DataDerco } from "../../../helpers/Data";
const columns = [
  {
    cell: () => <i className="fa-solid fa-car-side fa-2x text-gray-400"></i>,
    width: "5rem",
  },
  {
    name: "PLACA",
    selector: (row) => row.placa,
    sortable: true,
    width: "6rem",
  },
  {
    name: "NOMBRE Y APELLIDO",
    cell: (row) => (
      <p>
        {row.nombre} {row.apellido}
      </p>
    ),
    sortable: true,
    width: "10rem",
  },
  {
    name: "TELEFONO",
    selector: (row) => row.telefono,
    sortable: true,
    width: "7rem",
  },
  {
    name: "MARCA",
    selector: (row) => row.marca,
    sortable: true,
    width: "7rem",
  },
  {
    name: "LOCAL",
    selector: (row) => row.loca,
    sortable: true,
    width: "7rem",
  },
  {
    name: "SERVICIO",
    selector: (row) => row.servicio,
    sortable: true,
    width: "13rem"
  },
  {
    name: "ESTADO",
    selector: (row) => row.estado,
    sortable: true,
    width: "8rem",
    style: {
      color: "white",
      fontSize: "15px",
      margin: "4px",
      borderRadius: "5px",
      fontWeight: "700",
    },
    conditionalCellStyles: [
      {
        when: (row) => row.estado === "No asistio",
        style: {
          backgroundColor: "#FF5233",
        },
      },
      {
        when: (row) => row.estado === "Confirmo",
        style: {
          backgroundColor: "#FFB109",
        },
      },
      {
        when: (row) => row.estado === "Asiste",
        style: {
          backgroundColor: "#79FF09",
        },
      },
    ],
  },
  {
    name: "ACCIONES",
    cell: () => <ModalEditClient/>, //Aquí se agregó la funcionalidad del modal, para el botón editar
    center: true
  },
];
export const TableAnfitrion = () => {
  return (
    <>
      <DataTable columns={columns} data={DataDerco} pagination highlightOnHover />
    </>
  );
};

export const ModalEditClient = () => {
  const [open, setOpen ] = useState(false)

  const handleModal = (openModal) => {
    // Esta función sirve para cambiar el estado del modal
    setOpen(openModal)
  }

  return (
    <>
      <button onClick={() => setOpen(true)}><i className="fa-solid fa-pen-to-square text-gray-400 fa-2x"></i></button> 

      {/* MODAL PARA EDITAR EL CLIENTE */}
      <ModalClient open={open} handleModal={handleModal} modalContent={<ClientModal handleModal={handleModal}/>} />
    </> 
  )
}