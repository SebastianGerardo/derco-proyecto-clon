import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { Toast } from '../../../components/Alertas/SweetAlex'
import { editServicio } from '../../../helpers/ApiAnfitrion'

const BotonPicking = ({data}) => {
    const [estadoPicking, setEstadoPicking] = useState({
        estadoPicking: data.estadoPicking,
        comentarioAlmacen: data.comentarioAlmacen,
        estado: "4"
    })

    const cambiarEstadoPicking = () => {
        if (estadoPicking.estadoPicking === "0") {
            setEstadoPicking({
                ...estadoPicking,
                estadoPicking: "1",
            })
        } 
    }
    
    const confirmarPicking = (e) => {
      e.preventDefault()
      if(data?.estadoPicking === "0"){
      Swal.fire({
        title: '¿Deseas confirmar esta unidad?',
        text: "Esta acción no se podrá revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#28A745',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          if (data?.estadoPicking !== "1") {
            enviarPickingAlmacen()
          } else {
            console.log(estadoPicking.estadoPicking !== "1")
            Toast.fire({
              icon: "error",
              title: "Esta unidad ya ha sido confirmada",
            });
          }
        } 
      })
      }
    }

    // console.log(estadoPicking)

    const enviarPickingAlmacen = () =>{
        editServicio(estadoPicking, data.id).then(res => {
            if (res.statusCode === 200) {
              Toast.fire({
                icon: "success",
                title: "Datos guardados correctamente!",
              });
            } else {
              Toast.fire({
                icon: "error",
                title: "Ha ocurrido un error al guardar el dato",
              });
            }
          })
    }
    
  return (
    <form action="" onSubmit={confirmarPicking}>
        <button type='submit' onClick={cambiarEstadoPicking}>
          {data?.estadoPicking === "1" ?
            <i className="fa-solid fa-lg text-gray-700/50 fa-circle-check"></i>
              :
            <i className="fa-regular fa-lg text-gray-700/50 hover:text-sky-700 transition-all ease-in-out duration-75 fa-circle-check"></i>
          }
        </button>
    </form>
  )
}

export default BotonPicking
