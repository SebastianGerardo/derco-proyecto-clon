
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Swal from 'sweetalert2';
import { BotonFroms } from '../../../../components/Boton/BotonForms';
import FormServicio from './FormServicio';
import { NuevaUbicacion } from '../../../../helpers/ApiAsignacion';
import { useEffect } from 'react';
import { Toast } from '../../../../components/Alertas/SweetAlex';

export const ModalServicio = ({ data }) => {
  const [actualizar, setActualizar] = useState(false);

  useEffect(() => {
    if (actualizar) {
      NuevaUbicacion({confirmacionSalida:'3'}, data.datosAsignadosId).then(res => {
        if (res.statusCode == 200) {
          Toast.fire({
            icon: "success",
            title: "Confirmado!, El cliente se ha confirmado correctamente.",
          });
        } else {
          Toast.fire({
            icon: "error",
            title: "Error!, El cliente no se ha confirmado correctamente.",
          });
        }
      })
      setActualizar(false)
    }
  }, [actualizar])

  const confirmarPicking = (e) => {

    const serviciosTerminados = data?.ordenServicios.every((item) => item.terminado == "4");
    const confirmacionSalida = data?.confirmacionSalida == "3";

    e.preventDefault();
    if (serviciosTerminados && data?.ordenServicios?.length > 0 && !confirmacionSalida) {
      {Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se podrá revertir",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: 'Finalizar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            setActualizar(true)
        }
      })}
    } else {
      Toast.fire({
        icon: "error",
        title: "El cliente no ha terminado todos los servicios.",
      });
    }

    if (confirmacionSalida) {
      Toast.fire({
        icon: "warning",
        title: "El cliente ya ha sido confirmado.",
      });
    } 
  }
  return (
    <>
      <button onClick={(e) => confirmarPicking(e)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          className="stroke-current text-gray-700/50 hover:text-sky-700 w-6 h-6 transition-all ease-in-out duration-75"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </button>
    </>
  );
};
