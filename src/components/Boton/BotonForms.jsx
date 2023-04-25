import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { Toast } from "../Alertas/SweetAlex";

export const BotonFroms = ({ tipo, setIsOpen }) => {

  return (
    <>
      {tipo === 'crear' ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-[#03A9F4] px-4 py-2 text-sm font-medium text-white border-[#03A9F4] border-2 border-solid transition-all ease-in duration-200 shadow-[.3rem_.3rem_1rem_#ccc,_-.3rem_-.3rem_1rem_#fff] hover:shadow-[.3rem_.3rem_1rem_#fff,_-.3rem_-.3rem_1rem_#ccc] active:shadow-[inset_.1rem_.1rem_1rem_#60A5FA,_inset_-.1rem_-.1rem_1rem_#6faaf2]"
        >
          <i className="fa-solid fa-user-plus mr-1"></i>
          Registrar Cliente
        </button>
      ) : (
        <button>
          {tipo === 'reasignar' ? (
            // <i className="fa-solid fa-user-gear text-lg"
            // onClick={() => setIsOpen(true)}>
            // </i>

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
              onClick={() => setIsOpen(true)}
            >
              {' '}
              <path stroke="none" d="M0 0h24v24H0z" />{' '}
              <rect x="4" y="13" rx="2" width="4" height="6" />{' '}
              <rect x="16" y="13" rx="2" width="4" height="6" />{' '}
              <path d="M4 15v-3a8 8 0 0 1 16 0v3" />{' '}
              <path d="M18 19a6 3 0 0 1 -6 3" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              className="stroke-current text-gray-700/50 hover:text-sky-700 w-6 h-6 transition-all ease-in-out duration-75"
              onClick={() => setIsOpen(true)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          )}
        </button>
      )}
    </>
  );
};

// BOTON PARA MANTENIMIENTO, SECADO, LAVADO Y ENTREGA

export const BotonTimer = ({ tipo, setIsOpen, disable, botonId }) => {

  const [clickId, setClickId] = useState(() => {
    const idPresionado = botonId != undefined ? botonId : botonId;
    return idPresionado;
  });

  const [idComenzado, setIdComenzado] = useState(() => {
    const idLocal = localStorage.getItem('id') != null ? localStorage.getItem('id') : false;
    return idLocal;
  });

  const [estadoLocal, setEstadoLocal] = useState(() => {
    const estadoLocal = localStorage.getItem('estado') != null ? localStorage.getItem('estado') : false;
    return estadoLocal;
  });

  useEffect(() => {
    setIdComenzado(localStorage.getItem('id'));
  }, [localStorage.getItem('id')]);
  
  useEffect(() => {
    setEstadoLocal(localStorage.getItem('estado'));
  }, [localStorage.getItem('estado')]);
  
  const validarId = ( ) => {
    console.log(idComenzado);
    console.log(clickId);
    if (idComenzado) {
      console.log('validando...');
      // console.log(idComenzado);
      if (idComenzado == clickId) {
        console.log('se ha validado!');
        return (setIsOpen(true)) ;
      } else {
        console.log('no se ha validado');
        console.log(clickId != undefined);
        return (
          Toast.fire({
            icon: "warning",
            title: "Ya hay un temporizador activo",
          })
        );
      } 
    } else if (disable){
      console.log('no se ha validado');
      return (setIsOpen(true));
    } else {
      Toast.fire({
        icon: "error",
        title: "Este temporizador ya ha finalizado",
      })
    }
  }

  return (
    
    <>
      {
        (
          <button
            type="button"
          >
            {tipo === 'timer' ?
              (
                <svg onClick={() => validarId()} width="25" height="25" viewBox="0 0 33 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.75 0C11.3672 0 10.25 0.977539 10.25 2.1875C10.25 3.39746 11.3672 4.375 12.75 4.375H14V6.72656C6.21094 7.7793 0.25 13.6719 0.25 20.7812C0.25 28.6357 7.52344 35 16.5 35C25.4766 35 32.75 28.6357 32.75 20.7812C32.75 17.9238 31.7891 15.2646 30.1328 13.043L32.0156 11.3955C32.9922 10.541 32.9922 9.15332 32.0156 8.29883C31.0391 7.44434 29.4531 7.44434 28.4766 8.29883L26.7891 9.77539C24.5938 8.20312 21.9297 7.12305 19 6.72656V4.375H20.25C21.6328 4.375 22.75 3.39746 22.75 2.1875C22.75 0.977539 21.6328 0 20.25 0H16.5H12.75ZM18.375 13.125V21.875C18.375 22.7842 17.5391 23.5156 16.5 23.5156C15.4609 23.5156 14.625 22.7842 14.625 21.875V13.125C14.625 12.2158 15.4609 11.4844 16.5 11.4844C17.5391 11.4844 18.375 12.2158 18.375 13.125Z" fill={disable ? "#5A5A5A" : "#D9D9D9"} />
                </svg>
              )
              :
              tipo === 'mensaje' ?
                ( 
                    <svg onClick={() => setIsOpen(true)} width="22" height="22" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.07927 17.7872C-0.466682 18.6691 -0.323032 21.0206 1.32553 21.7042L10.9227 25.7032V32.7647C10.9227 34.002 11.9214 35 13.1596 35C13.8231 35 14.4524 34.7061 14.8765 34.1934L19.1176 29.1143L27.593 32.6416C28.8859 33.1817 30.3839 32.334 30.596 30.9532L34.9739 2.51587C35.1039 1.68873 34.7413 0.854747 34.0504 0.383071C33.3595 -0.0886051 32.4566 -0.12962 31.7247 0.287369L1.07927 17.7872ZM4.64316 19.5304L28.0034 6.19357L12.9817 22.9688L13.0638 23.0372L4.64316 19.5304ZM27.5656 29.0801L16.1694 24.3292L30.8149 7.9709L27.5656 29.0801Z" fill="#5A5A5A" />
                    </svg>
                ) : (
                    <svg onClick={() => setIsOpen(true)} width="20" height="25" viewBox="0 0 30 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 31.7188C4.3125 31.7188 3.75 31.2266 3.75 30.625V4.375C3.75 3.77344 4.3125 3.28125 5 3.28125H17.5V8.75C17.5 9.95996 18.6172 10.9375 20 10.9375H26.25V30.625C26.25 31.2266 25.6875 31.7188 25 31.7188H5ZM5 0C2.24219 0 0 1.96191 0 4.375V30.625C0 33.0381 2.24219 35 5 35H25C27.7578 35 30 33.0381 30 30.625V10.5615C30 9.39941 29.4766 8.28516 28.5391 7.46484L21.4609 1.27832C20.5234 0.458008 19.2578 0 17.9297 0H5ZM9.375 17.5C8.33594 17.5 7.5 18.2314 7.5 19.1406C7.5 20.0498 8.33594 20.7812 9.375 20.7812H20.625C21.6641 20.7812 22.5 20.0498 22.5 19.1406C22.5 18.2314 21.6641 17.5 20.625 17.5H9.375ZM9.375 24.0625C8.33594 24.0625 7.5 24.7939 7.5 25.7031C7.5 26.6123 8.33594 27.3438 9.375 27.3438H20.625C21.6641 27.3438 22.5 26.6123 22.5 25.7031C22.5 24.7939 21.6641 24.0625 20.625 24.0625H9.375Z" fill="#5A5A5A" />
                    </svg>
                )}
          </button>
        )
      }

    </>


  )
}