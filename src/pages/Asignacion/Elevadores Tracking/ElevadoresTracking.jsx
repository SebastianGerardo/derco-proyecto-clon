import React, { useEffect, useState } from 'react'
import { TraeElevadores } from '../../../helpers/ApiAsignacion'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { NuevaUbicacion } from '../../../helpers/ApiAsignacion'

const dataFicticia = [
  {
    elevador: { id: 1, nombre: 'Elevador 1', tecnico: { id: 21, nombres: 'Elder', apellidos: 'Manillo' } },
    servicios: [
      {
        id: 45,
        ubicacion: 'Lavado',
        ordenServicios: '[object Object],[object Object],[object Object],[object Object]',
        confirmacionSalida: '1',
        estado: '1',
        fecha_registro: '2023-04-06T05:03:01.000Z',
        servicio: {
          id: 1478,
          nombres: 'Juliano',
          telefono: '984321356',
          correo: 'david.cesarmc21@gmail.com',
          documento: null,
          placa: 'ABC123',
          marca: 'SUSUKI',
          modelo: 'CELERIO',
          ot: '12322222',
          horaEstimadaEntrega: '2:15',
          detalleServicio: null,
          notasCliente: null,
          comentarioInterno: null,
          comentarioAlmacen: null,
          comentario: null,
          servicioSolicitado: 'Lavado',
          vehiculoKilometraje: '10000',
          estado: '5',
          estadoPicking: '1',
          solicitudTaller: 'detalle',
          asistencia: '1',
          tipoCita: 'S',
          adicionales: '["Opción 3","Opción 6"]',
          fechaCita: null,
          fechaInicioRecepcion: '2023-04-06T05:01:30.000Z',
          fechaFinRecepcion: null,
          fechaEntrada: '2023-04-06T05:01:13.000Z',
          fechaRegistro: '2023-04-06T05:01:21.000Z'
        }
      }
    ]
  }, 
  {
    elevador: { id: 2, nombre: 'Elevador 2', tecnico: { id: 22, nombres: 'Cesar', apellidos: 'Frenillo' } },
    servicios: [
      {
        id: 46,
        ubicacion: '',
        ordenServicios: '{"nombre":"","terminado":1}',
        confirmacionSalida: '1',
        estado: '1',
        fecha_registro: '2023-04-06T05:13:45.000Z',
        servicio: {
          id: 1479,
          nombres: 'Juliano',
          telefono: '984321356',
          correo: 'david.cesarmc21@gmail.com',
          documento: null,
          placa: 'D5L344',
          marca: 'SUSUKI',
          modelo: 'CELERIO',
          ot: '7777788',
          horaEstimadaEntrega: null,
          detalleServicio: null,
          notasCliente: null,
          comentarioInterno: null,
          comentarioAlmacen: null,
          comentario: null,
          servicioSolicitado: 'Lavado',
          vehiculoKilometraje: '1233332',
          estado: '5',
          estadoPicking: '1',
          solicitudTaller: null,
          asistencia: '1',
          tipoCita: 'S',
          adicionales: '["Opción 3","Opción 4","Opción 6"]',
          fechaCita: null,
          fechaInicioRecepcion: '2023-04-06T05:13:01.000Z',
          fechaFinRecepcion: null,
          fechaEntrada: '2023-04-06T05:12:47.000Z',
          fechaRegistro: '2023-04-06T05:12:54.000Z'
        }
      }
    ]
  },
  {
    elevador: { id: 3, nombre: 'Elevador 3', tecnico: { id: 23, nombres: 'Melissa', apellidos: 'Paredes' } },
    servicios: [
      {
        id: 47,
        ubicacion: 'Lavado',
        ordenServicios: 
          '{"nombre":"Lavado","terminado":1},{"nombre":"Secado","terminado":1},{"nombre":"Mantenimiento","terminado":1},{"nombre":"Control de Calidad","terminado":1}',
        confirmacionSalida: '1',
        estado: '1',
        fecha_registro: '2023-04-06T05:17:19.000Z',
        servicio: {
          id: 1480,
          nombres: 'Maria Indacochea',
          telefono: '999999999',
          correo: 'david@lms.pe',
          documento: null,
          placa: 'ABC123',
          marca: 'SUSUKI',
          modelo: 'CELERIO',
          ot: '12312333',
          horaEstimadaEntrega: '2:45',
          detalleServicio: null,
          notasCliente: null,
          comentarioInterno: null,
          comentarioAlmacen: null,
          comentario: null,
          servicioSolicitado: 'Lavado',
          vehiculoKilometraje: '23333',
          estado: '5',
          estadoPicking: '1',
          solicitudTaller: null,
          asistencia: '1',
          tipoCita: 'S',
          adicionales: '["Opción 3","Opción 4","Opción 7"]',
          fechaCita: null,
          fechaInicioRecepcion: '2023-04-06T05:15:55.000Z',
          fechaFinRecepcion: null,
          fechaEntrada: '2023-04-06T05:15:41.000Z',
          fechaRegistro: '2023-04-06T05:15:50.000Z'
        }
      }
    ]
  },
  {
    elevador: { id: 4, nombre: 'Elevador 4', tecnico: { id: 24, nombres: 'Merlin', apellidos: 'Perez' } },
    servicios: [
      {
        id: 48,
        ubicacion: 'Lavado',
        ordenServicios: 
          '{"nombre":"Lavado","terminado":1},{"nombre":"Secado","terminado":1},{"nombre":"Mantenimiento","terminado":1}',
        confirmacionSalida: '1',
        estado: '1',
        fecha_registro: '2023-04-06T07:01:23.000Z',
        servicio: {
          id: 1481,
          nombres: 'pruebezota',
          telefono: '222111444',
          correo: null,
          documento: null,
          placa: '114422',
          marca: null,
          modelo: null,
          ot: '13123123',
          horaEstimadaEntrega: null,
          detalleServicio: null,
          notasCliente: null,
          comentarioInterno: null,
          comentarioAlmacen: null,
          comentario: null,
          servicioSolicitado: null,
          vehiculoKilometraje: '12111',
          estado: '5',
          estadoPicking: '1',
          solicitudTaller: null,
          asistencia: '1',
          tipoCita: 'S',
          adicionales: '["Opción 3","Opción 1"]',
          fechaCita: null,
          fechaInicioRecepcion: '2023-04-06T07:00:52.000Z',
          fechaFinRecepcion: null,
          fechaEntrada: '2023-04-06T07:00:37.000Z',
          fechaRegistro: '2023-04-06T07:00:48.000Z'
        }
      }
    ]
  },
  {
    elevador: { id: 5, nombre: 'Elevador 5', tecnico: { id: 25, nombres: 'Felix', apellidos: 'Suarez' } },
    servicios: []
  },
]

const ElevadoresTracking = () => {
  const [columns, setColumns] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      TraeElevadores().then(res => setColumns(res.data))
    }, 1000);
    return () => clearInterval(interval);
  }, [])

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
      
      const dataCambiada = {
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          servicios: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          servicios: destItems
        }
      }
      setColumns(Object.values(dataCambiada));
      NuevaUbicacion({elevador: (parseInt(destination.droppableId) + 1).toString()}, (destItems[destination.index].id).toString()).then(res => console.log(res))
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.servicios];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      const dataCambiada = {
        ...columns,
        [source.droppableId]: {
          ...column,
          servicios: copiedItems
        }
      } 
      setColumns(Object.values(dataCambiada))
      console.log(column.elevador.id, copiedItems[destination.index].id)
      NuevaUbicacion({elevador: (column.elevador.id).toString()}, copiedItems[destination.index].id.toString()).then(res => console.log(res))
      console.log(copiedItems)
      console.log(columns)
    }
  };

  return (
    <div className='flex justify-start xl:justify-cnter h-full overflow-x-auto'>
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
