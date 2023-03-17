export const BotonFroms = ({tipo, setIsOpen}) => {
  return (
    <>
      {tipo === "crear" ? (
        <button
          type="button"
          onClick={()=>setIsOpen(true)}
          className="rounded-md bg-[#03A9F4] px-4 py-2 text-sm font-medium text-white border-[#03A9F4] border-2 border-solid transition-all ease-in duration-200 shadow-[.3rem_.3rem_1rem_#ccc,_-.3rem_-.3rem_1rem_#fff] hover:shadow-[.3rem_.3rem_1rem_#fff,_-.3rem_-.3rem_1rem_#ccc] active:shadow-[inset_.1rem_.1rem_1rem_#60A5FA,_inset_-.1rem_-.1rem_1rem_#6faaf2]"
        >
          <i class="fa-solid fa-user-plus mr-1"></i>
          Agregar Cliente
        </button>
      ) : (
        <button>
          {tipo === "reasignar" ? (
            <i className="fa-solid fa-user-gear text-lg"
            onClick={() => setIsOpen(true)}>
            </i>
          ):(
            <i className="fa-solid fa-pencil text-lg"
            onClick={() => setIsOpen(true)}>
            </i>  
          )
          }
        </button>
      )}
    </>
  );
};
