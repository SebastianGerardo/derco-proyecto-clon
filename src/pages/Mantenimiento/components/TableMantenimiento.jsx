import { useState } from "react";
import DataTable from "react-data-table-component";
import { CustomHeader } from "../../../components/CustomHeaderTable/CustomHeaderTable";
import { SearchValidate } from "../../../components/datatable/Search";
import { FormtearFecha } from "../../../helpers/funcions";
import { ModalMantenimiento } from "./ModalMantenimiento";
import { ApiPrueba } from "../../../helpers/ApiPruebaVistas";
import { ModalMensaje } from "./ModalMensaje";
import { ModalDetalle } from "./ModalDetalle";
import { Toast } from "../../../components/Alertas/SweetAlex";

const estados = {
  1: "Pendiente",
  2: "En proceso",
  3: "Pausa",
  4: "Finalizado",
};

const estadosColores = {
  1: "1",
  2: "2",
  3: "3",
  4: "4",
};

const estadoPicking = {
  0: "Pendiente",
  1: "Terminado",
};

export const TableMantenimiento = ({ data, elevadores }) => {
  const traeEstado = (data) => {
    let dataParseada = JSON.parse(data.ordenServicios);
    let resultado = dataParseada.find((res) => res.nombre === "Mantenimiento");
    return resultado.terminado;
  };

  const bloqueo = (data) => {
    const dataPar = JSON.parse(data?.ordenServicios);
    const valor = dataPar.find((res) => res?.nombre === "Mantenimiento");
    return valor?.terminado;
  };

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
      center: true,
    },
    {
      name: <CustomHeader nameModule="TECNICO" icon="fa-solid fa-user mr-1" />,
      selector: (row) => (
        <p>
          {row.elevador?.tecnico?.nombres.split(" ", 1)}{" "}
          {row.elevador?.tecnico?.apellidos.split(" ", 1)}
        </p>
      ),
      sortable: true,
      center: true,
    },
    {
      name: (
        <CustomHeader nameModule="ELEVADOR" icon="fa-solid fa-elevator mr-1" />
      ),
      selector: (row) => <p>{row.elevador.nombre}</p>,
      sortable: true,
      center: true,
    },
    {
      name: (
        <CustomHeader
          nameModule="CONFIRMACION DE PICKING"
          icon="fa-solid fa-tools mr-1"
        />
      ),
      selector: (row) => estadoPicking[row.servicio.estadoPicking],
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
          when: (row) => row.servicio.estadoPicking === "0",
          style: {
            backgroundColor: "#FFD34D",
          },
        },
        {
          when: (row) => row.servicio.estadoPicking === "1",
          style: {
            backgroundColor: "#4AC695",
          },
        },
      ],
    },
    {
      name: (
        <CustomHeader
          nameModule="FECHA / HORA INGRESO"
          icon="fa-solid fa-clock mr-1"
        />
      ),
      selector: (row) => FormtearFecha(row.fecha_registro),
      sortable: true,
      center: true,
    },

    {
      name: (
        <CustomHeader nameModule="ESTADO" icon="fa-solid fa-user-clock mr-1" />
      ),
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
          when: (row) => estadosColores[`${traeEstado(row)}`] === "1",
          style: {
            backgroundColor: "#FFD34D",
          },
        },
        {
          when: (row) => estadosColores[`${traeEstado(row)}`] === "2",
          style: {
            backgroundColor: "#B22323",
          },
        },
        {
          when: (row) => estadosColores[`${traeEstado(row)}`] === "3",
          style: {
            backgroundColor: "#9B5DA2",
          },
        },
        {
          when: (row) => estadosColores[`${traeEstado(row)}`] === "4",
          style: {
            backgroundColor: "#4AC695",
          },
        },
      ],
    },
    {
      name: <CustomHeader nameModule="ACCIONES" icon="fa-solid fa-cog mr-1" />,
      cell: (row) => (
        <div className="flex items-center gap-3">
          <ModalMantenimiento
            botonId={row.id}
            disable={bloqueo(row) != 4}
            tipo="timer"
            data={row}
          />
          <ModalMensaje tipo="mensaje" data={row} />
          <ModalDetalle tipo="detalle" data={row} />
        </div>
      ), //Aquí se agregó la funcionalidad del modal, para el botón editar
      center: true,
    },
  ];

  const [placa, setPlaca] = useState("");
  const [estado, setEstado] = useState("1");
  const [elevador, setElevador] = useState("");
  const validarTemporizador =
    localStorage.getItem("time") == null ||
    localStorage.getItem("estado") == "Pausado"
      ? true
      : false;
  const cantElevadores = elevadores?.map((item) => item.elevador.nombre);

  const handleSelectChange = (e) => {
    setElevador(e.target.value);
  };
 
  const filtroPlaca = data.filter(
    (item) =>
      (item.servicio.placa &&
        item.servicio.placa.toLowerCase().includes(placa.toLowerCase())) ||
      (item.servicio.ot &&
        item.servicio.ot.toLowerCase().includes(placa.toLowerCase()))
  );

  const filtroElevadores = filtroPlaca.filter(
    (item) => item.elevador.nombre && item.elevador.nombre.includes(elevador)
  );

  const filtroEstado = filtroElevadores.filter((item) =>
    estado == "4"
      ? JSON.parse(item.ordenServicios).find(
          (res) => res.nombre === "Mantenimiento"
        ).terminado == "4"
      : estado == "1"
      ? JSON.parse(item.ordenServicios).find(
          (res) => res.nombre === "Mantenimiento"
        ).terminado != "4"
      : JSON.parse(item.ordenServicios).find(
          (res) => res.nombre === "Mantenimiento"
        ).terminado
  );

  const advertenciaToast = (state) => {
    if (validarTemporizador) {
      return state == undefined ? "" : state();
    } else {
      Toast.fire({
        icon: "warning",
        title: "Finaliza o pausa el temporizador para ejecutar esta acción",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-2 lg:mb-0">
        <SearchValidate
          validation={() => advertenciaToast()}
          disabled={!validarTemporizador}
          placa={placa}
          setPlaca={setPlaca}
        />

        <label
          onClick={() => advertenciaToast()}
          className="flex flex-col"
          htmlFor=""
        >
          <span className="text-base font-semibold">Filtro por Elevador</span>
          <select
            className="w-[16rem] h-8 border-2 border-gray-300 rounded-md outline-none"
            name=""
            id=""
            disabled={!validarTemporizador}
            onChange={handleSelectChange}
          >
            <option value="">Elegir</option>
            {cantElevadores.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <form
          action=""
          className="border-solid border-gray-500 border w-72 px-2 py-1 rounded-md"
        >
          <p className="text-gray-500">Filtro por estado:</p>

          <div className="flex justify-evenly">
            <label className="p-1 flex items-center justify-center">
              <input
                className="w-5 h-5 appearance-none border rounded-md transition-all duration-200 ease-out checked:bg-green-500"
                type="checkbox"
                checked={estado === "1"}
                onChange={() =>
                  advertenciaToast(() => setEstado(estado === "1" ? "" : "1"))
                }
              />
              <span className="ml-1">Pendiente</span>
            </label>
            <br />
            <label className="p-1 flex items-center justify-center">
              <input
                className="w-5 h-5 appearance-none border rounded-md transition-all duration-200 ease-out checked:bg-green-500"
                type="checkbox"
                checked={estado === "4"}
                onChange={() =>
                  advertenciaToast(() => setEstado(estado === "4" ? "" : "4"))
                }
              />
              <span className="ml-1">Finalizado</span>
            </label>
          </div>
        </form>
      </div>
      {/**Componente Search de la tabla */}
      <DataTable
        columns={columns}
        data={filtroEstado}
        // pagination
        // paginationComponentOptions={{
        //   rowsPerPageText: "Filas por página:",
        //   rangeSeparatorText: "de",
        //   noRowsPerPage: false,
        //   selectAllRowsItem: true,
        //   selectAllRowsItemText: "Todos"
        // }}
        noDataComponent={
          <p className="text-base text-gray-400">
            Esperando los registros para mostrar
          </p>
        }
      />
    </>
  );
};
