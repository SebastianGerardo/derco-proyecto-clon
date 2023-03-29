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
                <svg
                className="stroke-current text-gray-700/50 hover:text-sky-700 w-6 h-6 transition-all ease-in-out duration-75"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                {' '}
                <path stroke="none" d="M0 0h24v24H0z" />{' '}
                <rect x="4" y="13" rx="2" width="4" height="6" />{' '}
                <rect x="16" y="13" rx="2" width="4" height="6" />{' '}
                <path d="M4 15v-3a8 8 0 0 1 16 0v3" />{' '}
                <path d="M18 19a6 3 0 0 1 -6 3" />
                </svg>
        </button>
    </form>
  )
}

export default BotonPicking
