import { useContext, useState } from "react";
import DataTable from "react-data-table-component";
import { CustomHeader } from "../../../components/CustomHeaderTable/CustomHeaderTable";
import { Search } from "../../../components/datatable/Search";
import { ModalRecepcion } from "./ModalRecepcion";
import { FormtearFecha } from '../../../helpers/funcions'
import { UserContext } from "../../../context/ContextDerco";
import PickingRecepcion from "./PickingRecepcion";
export const TableRecepcion = ({ dataRecepcion }) => {

  const { UsuarioLogin } = useContext(UserContext);

  const ubicaciones = {
    "2": "Recepcion",
    "3": "Almacén",
    "4": "Asignación",
  }

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
      center: true,
      width: "10rem"
    },
    {
      name: <CustomHeader nameModule="HORA ABORDAJE" icon="fa-solid fa-clock mr-1" />,
      selector: (row) => <p>{FormtearFecha(row.fechaRegistro)}</p>,
      sortable: true,
      center: true,
      width: "10rem"
    },
    {
      name: <CustomHeader nameModule="PLACA" icon="fa-solid fa-id-card mr-1" />,
      selector: (row) => row.placa,
      sortable: true,
      center: true
    },
    {
      name: <CustomHeader nameModule="ASESOR" icon="fa-solid fa-user-tie mr-1" />,
      selector: (row) => row.asesor?.nombres,
      sortable: true,
      center: true
    },
    {
      name: <CustomHeader nameModule="UBICACION" icon="fa-solid fa-user-clock mr-1" />,
      selector: (row) => row.estado && ubicaciones[row.estado],
      sortable: true,
      center: true,
      width: "8rem",
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
          when: (row) => row.estado,
          style: {
            backgroundColor: "#3B82F6",
          },
        },
        {
          when: (row) => row.estado === "2",
          style: {
            backgroundColor: "#4AD69D",
          },
        },
      ],
    },
    {
      name: <CustomHeader nameModule="ESTADO" icon="fa-solid fa-user-clock mr-1" />,
      selector: (row) => row.estadoPicking === "1" ? "Pendiente" : "Terminado",
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
          when: (row) => row.estadoPicking === "1",
          style: {
            backgroundColor: "#FFD966",
          },
        },
        {
          when: (row) => row.estadoPicking === "0",
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
          <ModalRecepcion tipo="edit" data={row} />
          <ModalRecepcion tipo="reasignar" data={row} />
          <PickingRecepcion data={row} />
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
  const [estado, setEstado] = useState("1")
  const [ubicacion, setUbicacion] = useState("2")

  const handleSelectChange = (event) => {
    setUbicacion(event.target.value);
  }

  let ordenado = dataRecepcion.sort((a, b) => new Date(a.fechaRegistro) - new Date(b.fechaRegistro))

  const filteredItems = ordenado.filter(
    (item) =>
      item.placa && item.placa.toLowerCase().includes(placa.toLowerCase())
  );

  const filtro2 = filteredItems.filter((item) => item.estadoPicking && item.estadoPicking.includes(estado))

  const filto3 = filtro2.filter((item) => item.estado && item.estado.includes(ubicacion))

  // console.log(filteredItems)

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-2 lg:mb-0 gap-y-4">
        {/**Componente Search de la tabla */}
        <Search placa={placa} setPlaca={setPlaca} />
        <form action="" className='border-solid border-gray-500 border w-72 px-2 py-1 rounded-md'>
          <p className="text-gray-500">Filtro por estado:</p>
          <div className="flex justify-evenly">
            <label className="p-1 flex items-center justify-center">
              <input
                className="w-5 h-5 appearance-none border rounded-md transition-all duration-200 ease-out checked:bg-green-500"
                type="checkbox"
                checked={estado === "1"}
                onChange={() => setEstado(estado === "1" ? "" : "1")}
              />
              <span className="ml-1">Pendiente</span>
            </label>
            <br />
            <label className="p-1 flex items-center justify-center">
              <input
                className="w-5 h-5 appearance-none border rounded-md transition-all duration-200 ease-out checked:bg-green-500"
                type="checkbox"
                checked={estado === "0"}
                onChange={() => setEstado(estado === "0" ? "" : "0")}
              />
              <span className="ml-1">Terminado</span>
            </label>
          </div>
        </form>

        <form action="">
          <label className="flex flex-col" htmlFor="">
            <span className="text-lg">Filtro por Ubicación</span>
            <select className="w-[16rem] h-8 border-2 border-gray-300 rounded-md outline-none" name="" id="" onChange={handleSelectChange}>
              <option value="2">Recepción</option>
              <option value="3">Almacén</option>
              <option value="4">Asignación</option>
              <option value="5">Mantenimiento</option>
              <option value="6">Lavado</option>
              <option value="7">Secado</option>
              <option value="8">Control de Calidad</option>
            </select>
          </label>

        </form>

        
      </div>
      <DataTable
        columns={columnsToShow}
        data={filto3}
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
