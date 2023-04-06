import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { Toast } from '../../../components/Alertas/SweetAlex'
import { editServicio } from '../../../helpers/ApiAnfitrion'

const PickingRecepcion = ({data}) => {
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
          {data?.estado === "8" ?
            <button type='submit' onClick={cambiarEstadoPicking}>
              <svg width="22" height="26" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.875 1.875C19.875 0.835938 19.0391 0 18 0C16.9609 0 16.125 0.835938 16.125 1.875V8.125C16.125 9.16406 16.9609 10 18 10C19.0391 10 19.875 9.16406 19.875 8.125V1.875ZM12.5156 17.5H23.4844C24.0156 17.5 24.4844 17.8359 24.6641 18.3281L26.1484 22.5H9.85156L11.3438 18.3281C11.5234 17.8281 11.9922 17.5 12.5234 17.5H12.5156ZM6.63281 16.6484L4.42187 22.8438C2.85156 23.5078 1.75 25.0625 1.75 26.875V30V35V37.5C1.75 38.8828 2.86719 40 4.25 40H5.5C6.88281 40 8 38.8828 8 37.5V35H28V37.5C28 38.8828 29.1172 40 30.5 40H31.75C33.1328 40 34.25 38.8828 34.25 37.5V35V30V26.875C34.25 25.0625 33.1484 23.5078 31.5781 22.8438L29.3672 16.6484C28.4766 14.1641 26.125 12.5 23.4844 12.5H12.5156C9.875 12.5 7.51563 14.1641 6.63281 16.6484ZM8 26.875C8.49728 26.875 8.97419 27.0725 9.32583 27.4242C9.67746 27.7758 9.875 28.2527 9.875 28.75C9.875 29.2473 9.67746 29.7242 9.32583 30.0758C8.97419 30.4275 8.49728 30.625 8 30.625C7.50272 30.625 7.02581 30.4275 6.67417 30.0758C6.32254 29.7242 6.125 29.2473 6.125 28.75C6.125 28.2527 6.32254 27.7758 6.67417 27.4242C7.02581 27.0725 7.50272 26.875 8 26.875ZM26.125 28.75C26.125 28.2527 26.3225 27.7758 26.6742 27.4242C27.0258 27.0725 27.5027 26.875 28 26.875C28.4973 26.875 28.9742 27.0725 29.3258 27.4242C29.6775 27.7758 29.875 28.2527 29.875 28.75C29.875 29.2473 29.6775 29.7242 29.3258 30.0758C28.9742 30.4275 28.4973 30.625 28 30.625C27.5027 30.625 27.0258 30.4275 26.6742 30.0758C26.3225 29.7242 26.125 29.2473 26.125 28.75ZM1.04688 3.04688C0.3125 3.78125 0.3125 4.96875 1.04688 5.69531L4.79688 9.44531C5.53125 10.1797 6.71875 10.1797 7.44531 9.44531C8.17188 8.71094 8.17969 7.52344 7.44531 6.79688L3.70312 3.04688C2.96875 2.3125 1.78125 2.3125 1.05469 3.04688H1.04688ZM32.2969 3.04688L28.5469 6.79688C27.8125 7.53125 27.8125 8.71875 28.5469 9.44531C29.2812 10.1719 30.4687 10.1797 31.1953 9.44531L34.9453 5.69531C35.6797 4.96094 35.6797 3.77344 34.9453 3.04688C34.2109 2.32031 33.0234 2.3125 32.2969 3.04688Z" fill="#46AD63"/>
              </svg>
            </button>
              :
            <button disabled type='submit' onClick={cambiarEstadoPicking}>
              <svg width="22" height="26" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.875 1.875C19.875 0.835937 19.0391 0 18 0C16.9609 0 16.125 0.835937 16.125 1.875V8.125C16.125 9.16406 16.9609 10 18 10C19.0391 10 19.875 9.16406 19.875 8.125V1.875ZM12.5156 17.5H23.4844C24.0156 17.5 24.4844 17.8359 24.6641 18.3281L26.1484 22.5H9.85156L11.3438 18.3281C11.5234 17.8281 11.9922 17.5 12.5234 17.5H12.5156ZM6.63281 16.6484L4.42187 22.8437C2.85156 23.5078 1.75 25.0625 1.75 26.875V30V35V37.5C1.75 38.8828 2.86719 40 4.25 40H5.5C6.88281 40 8 38.8828 8 37.5V35H28V37.5C28 38.8828 29.1172 40 30.5 40H31.75C33.1328 40 34.25 38.8828 34.25 37.5V35V30V26.875C34.25 25.0625 33.1484 23.5078 31.5781 22.8437L29.3672 16.6484C28.4766 14.1641 26.125 12.5 23.4844 12.5H12.5156C9.875 12.5 7.51563 14.1641 6.63281 16.6484ZM8 26.875C8.49728 26.875 8.97419 27.0725 9.32583 27.4242C9.67746 27.7758 9.875 28.2527 9.875 28.75C9.875 29.2473 9.67746 29.7242 9.32583 30.0758C8.97419 30.4275 8.49728 30.625 8 30.625C7.50272 30.625 7.02581 30.4275 6.67417 30.0758C6.32254 29.7242 6.125 29.2473 6.125 28.75C6.125 28.2527 6.32254 27.7758 6.67417 27.4242C7.02581 27.0725 7.50272 26.875 8 26.875ZM26.125 28.75C26.125 28.2527 26.3225 27.7758 26.6742 27.4242C27.0258 27.0725 27.5027 26.875 28 26.875C28.4973 26.875 28.9742 27.0725 29.3258 27.4242C29.6775 27.7758 29.875 28.2527 29.875 28.75C29.875 29.2473 29.6775 29.7242 29.3258 30.0758C28.9742 30.4275 28.4973 30.625 28 30.625C27.5027 30.625 27.0258 30.4275 26.6742 30.0758C26.3225 29.7242 26.125 29.2473 26.125 28.75ZM1.04687 3.04688C0.3125 3.78125 0.3125 4.96875 1.04687 5.69531L4.79687 9.44531C5.53125 10.1797 6.71875 10.1797 7.44531 9.44531C8.17188 8.71094 8.17969 7.52344 7.44531 6.79688L3.70312 3.04688C2.96875 2.3125 1.78125 2.3125 1.05469 3.04688H1.04687ZM32.2969 3.04688L28.5469 6.79688C27.8125 7.53125 27.8125 8.71875 28.5469 9.44531C29.2812 10.1719 30.4687 10.1797 31.1953 9.44531L34.9453 5.69531C35.6797 4.96094 35.6797 3.77344 34.9453 3.04688C34.2109 2.32031 33.0234 2.3125 32.2969 3.04688Z" fill="#D9D9D9"/>
              </svg>
            </button>
          }
    </form>
  )
}

export default PickingRecepcion