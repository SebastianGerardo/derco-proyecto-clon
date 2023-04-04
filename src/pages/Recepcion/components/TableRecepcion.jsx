import { useContext, useState } from "react";
import DataTable from "react-data-table-component";
import { CustomHeader } from "../../../components/CustomHeaderTable/CustomHeaderTable";
import { Search } from "../../../components/datatable/Search";
import { ModalRecepcion } from "./ModalRecepcion";
import { FormtearFecha } from '../../../helpers/funcions'
import { UserContext } from "../../../context/ContextDerco";
export const TableRecepcion = ({ dataRecepcion }) => {
  
  const { UsuarioLogin } = useContext(UserContext);

  const columns = [
    {
      name: <CustomHeader nameModule="CLIENTE" icon="fa-solid fa-user mr-1" />,
      selector: (row) => <p>{row.nombres}</p>,
      sortable: true,
      width: "15rem",
      center: true
    },
    {
      name: <CustomHeader nameModule="TELEFONO" icon="fa-solid fa-phone mr-1" />,
      cell: (row) => <p>{row.telefono}</p>,
      sortable: true,
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
      name: <CustomHeader nameModule="HORA ABORDAJE" icon="fa-solid fa-clock mr-1" />,
      selector: (row) => <p>{FormtearFecha(row.fechaRegistro)}</p>,
      sortable: true,
      center: true
    },
    {
      name: <CustomHeader nameModule="PLACA" icon="fa-solid fa-id-card mr-1" />,
      selector: (row) => row.placa,
      sortable: true,
      center: true
    },
    {
      name: <CustomHeader nameModule="ASESOR" icon="fa-solid fa-user-tie mr-1" />,
      selector: (row) => row.asesor.nombres,
      sortable: true,
      center: true
    },
    {
      name: <CustomHeader nameModule="UBICACION" icon="fa-solid fa-user-clock mr-1" />,
      selector: (row) => row.estado === "2" && "Recepcion",
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
          when: (row) => row.estado === "2",
          style: {
            backgroundColor: "#4AD69D",
          },
        }
      ],
    },
    {
      name: <CustomHeader nameModule="ACCIONES" icon="fa-solid fa-cog mr-1" />,
      cell: row =>
        <div className="flex items-center gap-3">
          <ModalRecepcion tipo="edit" data={row} />
          <ModalRecepcion tipo="reasignar" data={row} />
        </div>,//Aquí se agregó la funcionalidad del modal, para el botón editar
      center: true,
    },
  ];

  const columnsToShow = columns.filter(column => {
    // Verifica si el usuario es un administrador
    const isAdmin = UsuarioLogin?.usuario?.tipo?.nombre === "Administrador";
  
    // Si la columna es la de asesor y el usuario no es un administrador, la filtramos
    if (column.name.props.nameModule === "ASESOR" && !isAdmin) {
      return false;
    }
  
    // En cualquier otro caso, mostramos la columna
    return true;
  });

 
  const [placa, setPlaca] = useState("");
  
  let ordenado = dataRecepcion.sort((a, b) => new Date(a.fechaRegistro) - new Date(b.fechaRegistro))

  const filteredItems = ordenado.filter(
    (item) =>
      item.placa && item.placa.toLowerCase().includes(placa.toLowerCase())
  );

  return (
    <>
      {/**Componente Search de la tabla */}
      <Search placa={placa} setPlaca={setPlaca} />
      <DataTable
        columns={columnsToShow}
        data={filteredItems}
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
