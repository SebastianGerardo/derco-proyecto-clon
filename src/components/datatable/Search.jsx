export const Search = ({ placa, setPlaca }) => {
  const buscarPlaca = (e) => {
    e.preventDefault();
  };

  const capturarPlaca = ({ target }) => {
    setPlaca(target.value);
  };
  return (
    <form
      onSubmit={(e) => buscarPlaca(e)}
      className="xl:w-1/4 lg:w-1/4 w-full my-5"
    >
      <div className="flex p-2 items-center gap-3 border-2 rounded-md border-gray-400 focus-within:border-blue-500 focus-within:text-blue-500">
        <img src="/img/search.gif" alt="" width={30} />
        <input
          type="text"
          className="outline-none w-full"
          value={placa}
          onChange={(e) => capturarPlaca(e)}
          placeholder={`Buscar por OT ${'&'} Placa`}
        />
      </div>
    </form>
  );
};

export const SearchValidate = ({ placa, setPlaca, disabled=false, validation }) => {
  const buscarPlaca = (e) => {
    e.preventDefault();
  };

  const capturarPlaca = ({ target }) => {
    setPlaca(target.value);
  };
  return (
    <form
      onClick={validation}
      onSubmit={(e) => buscarPlaca(e)}
      className="xl:w-1/4 lg:w-1/4 w-full my-5"
    >
      <div className="flex p-2 items-center gap-3 border-2 rounded-md border-gray-400 focus-within:border-blue-500 focus-within:text-blue-500">
        <img src="/img/search.gif" alt="" width={30} />
        <input
          disabled={disabled}
          type="text"
          className="outline-none w-full disabled:bg-transparent"
          value={placa}
          onChange={(e) => capturarPlaca(e)}
          placeholder={`Buscar por OT ${'&'} Placa`}
        />
      </div>
    </form>
  );
};
