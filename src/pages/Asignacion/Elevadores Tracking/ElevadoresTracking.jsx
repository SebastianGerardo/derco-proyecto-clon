import React, { useEffect, useState } from 'react'
import { GuardarEle, TraeElevadores } from '../../../helpers/ApiAsignacion'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { Toast } from "../../../components/Alertas/SweetAlex";



const ElevadoresTracking = () => {
  const EstadoServicio = {
    "5": {
      "nombre": "Pendiente",
      "color": "#EAB308CC",
      "colorDrag": "#FFD966"
    },
    "6": {
      "nombre": "En proceso",
      "color": "bg-red-600",
      "colorDrag": "#"
    },
    "7": {
      "nombre": "En pausa",
      "color": "bg-purple-700",
      "colorDrag": "#"
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
            title: "Se reasigno correctamente",
          });
          setBanderita(!bandera)
        } else {
          Toast.fire({
            icon: "error",
            title: "Error al reasignar",
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
            title: "Cambio realizado",
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


  console.log(columns)
  return (
    <div className='flex justify-start h-full overflow-x-auto'>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).length > 0 && Object.entries(columns).map(([columnId, column], index) => {
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
                                        ? EstadoServicio[item.servicio.estado]?.colorDrag
                                        : EstadoServicio[item.servicio.estado]?.color,
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
  )
}

export default ElevadoresTracking
