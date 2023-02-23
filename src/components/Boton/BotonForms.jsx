export const BotonFroms = ({tipo, setIsOpen}) => {
  return (
    <>
      {tipo === "crear" ? (
        <button
          type="button"
          onClick={()=>setIsOpen(true)}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Agregar Cliente
        </button>
      ) : (
        <button>
          <img
            src="/img/edit.gif"
            alt=""
            width={35}
            onClick={() => setIsOpen(true)}
          />
        </button>
      )}
    </>
  );
};
