import React, { useEffect, useState } from 'react'
import { GuardarEle, TraeElevadores } from '../../../helpers/ApiAsignacion'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { Toast } from '../../../components/Alertas/SweetAlex'


const ElevadoresTracking = () => {
  const EstadoServicio = {
    "1": {
      "nombre": "Pendiente",
      "color": "#EAB308CC",
      "colorDrag": "#FFD966"
    },
    "2": {
      "nombre": "En proceso",
      "color": "#DC2626CC",
      "colorDrag": "#DC2626"
    },
    "3": {
      "nombre": "En pausa",
      "color": "#9B5DA2CC",
      "colorDrag": "#9B5DA2"
    },
  }


  const [columns, setColumns] = useState([])
  const [bandera, setBanderita] = useState(false)
  useEffect(() => {
    TraeElevadores().then((datos) => setColumns(datos.data))
  }, [bandera])

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.servicios];
      const destItems = [...destColumn.servicios];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          servicios: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          servicios: destItems
        }
      });
      GuardarEle(destColumn, destItems).then(res => {
        if (res.statusCode === 200) {
          Toast.fire({
            icon: "success",
            title: "Reasignado correctamente",
          });
          setBanderita(!bandera)
        } else {
          Toast.fire({
            icon: "error",
            title: "Ocurrio un error",
          });
        }
      })
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.servicios];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          servicios: copiedItems
        }
      });

      GuardarEle(column, copiedItems).then(res => {
        if (res.statusCode === 200) {
          Toast.fire({
            icon: "success",
            title: "Reasignado correctamente",
          });
          setBanderita(!bandera)
        } else {
          Toast.fire({
            icon: "error",
            title: "Ocurrio un error",
          });
        }
      })
    }
  };

  const [estado, setEstado] = useState({
    estado: '',
    fecha: ''
  })

  const handleEstado = (e) => {
    setEstado({
      ...estado,
      [e.target.name]: e.target.value
    }
    )
  }

  const filtroEstado = Object.values(columns).map((elevador) => {
    const serviciosFiltrados = elevador.servicios.filter((servicio) => {
      return servicio.estado && servicio.estado.includes(estado.estado);
    });
    
    return { ...elevador, servicios: serviciosFiltrados };
  });

    // FECHA FILTER
  
  // let filteredAccounts = filter2.filter(function (account: any) {
  //   if (valor1.length > 0 && valor2.length > 0) {
  //       return ParseoFecha(account.fecha) > ParseoFecha(valor1) && ParseoFecha(account.fecha) < ParseoFecha(valor2)
  //   } else {
  //       return filteredItems
  //   }
  // })
  // export const  ParseoFecha = (dateStr: any) =>  {
  // let parts = dateStr.split("-")
  // if (parts[0].length == 4) {
  //     return new Date(parts[0], parts[1] - 1, parts[2]).getTime()
  // } else {
  //     return new Date(parts[2], parts[1] - 1, parts[0]).getTime()
  // }
  // }

  return (
    <div className='flex flex-col justify-start h-full overflow-x-auto'>
       <section className='py-4 flex items-center justify-around w-full'>
        <select className='cursor-pointer text-lg font-medium border rounded-md border-black w-[10rem] h-8' onChange={handleEstado} name="estado" id="">
          <option value="">Elegir</option>
          <option value="1">Pendiente</option>
          <option value="2">En proceso</option>
          <option value="3">En pausa</option>
          <option value="4">Terminado</option>
        </select>
        <div className='text-3xl font-bold'>
          Seguimiento de Elevadores
        </div>
        <input className='cursor-pointer border border-black px-1 rounded-md w-[10rem] text-lg h-8' type="date" value={estado.fecha} name="fecha" onChange={handleEstado} />
      </section>
    <div className='flex justify-start h-full overflow-x-auto'>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(filtroEstado).length > 0 && Object.entries(filtroEstado).map(([columnId, column], index) => {
          return (
            <div
              className='flex flex-col items-center'
              key={columnId}
            >
              <h2 className='p-5 bg-gray-500 text-white w-[250px] rounded-md text-center'>{column.elevador?.nombre}</h2>
              <div className='m-2'>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightgrey"
                            : "",
                        }}
                        className='p-[4px] w-[250px] min-h-[500px]'
                      >
                        {column?.servicios.map((item, index) => {
                          return (
                            <Draggable
                              key={item?.id}
                              draggableId={item?.id.toString()}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      backgroundColor: snapshot.isDragging
                                        ? EstadoServicio[item.estado]?.colorDrag
                                        : EstadoServicio[item?.estado]?.color,
                                      ...provided.draggableProps.style
                                    }}
                                    className='flex flex-col gap-1 p-4 m-0 mb-2 min-h-[50px]  rounded-md text-white font-bold'
                                  >
                                    <p>OT:<span className='ml-1 font-normal'>{item?.servicio.ot}</span></p>
                                    <p>Técnico:<span className='ml-1 font-normal'>{column?.elevador.tecnico?.nombres} {column.elevador.tecnico?.apellidos}</span></p>
                                    <p>Hora E. de entrega:<span className='ml-1 font-normal'>{item?.servicio.horaEstimadaEntrega}</span></p>
                                    <p>E. del servicio:<span className='ml-1 font-normal'>{EstadoServicio[item?.servicio.estado]?.nombre}</span></p>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
    </div>
  )
}

export default ElevadoresTracking
