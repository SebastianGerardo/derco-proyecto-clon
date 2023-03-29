export const InputBasic = ({ pHolder, data, labelName, onChange, name }) => {
    return (
        <div className="w-full">
            <label htmlFor="" className="text-gray-400">
                {labelName}
            </label>
            <br />
            <input
                onChange={onChange}
                value={data || ""}
                name={name}
                type="text"
                placeholder={pHolder}
                className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
            />
        </div>
    )
}

export const InputBasicNumber = ({ pHolder, data, labelName, onChange, name }) => {

    const handleKeyDown = (event) => {
      // Verifica si la tecla presionada es un número o una de las teclas especiales (backspace, delete, arrow keys)
      if (!/[\d\s]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete' && !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        // Si la tecla presionada no es un número ni una tecla especial, cancela el evento
        event.preventDefault();
      }
    }
  
    return (
      <div className="w-full">
        <label htmlFor="" className="text-gray-400">
          {labelName}
        </label>
        <br />
        <input
          onChange={onChange}
          onKeyDown={handleKeyDown}
          value={data || ""}
          name={name}
          type="text"
          autoComplete="off"
          placeholder={pHolder}
          className="w-full border border-gray-300 py-2 px-3 mt-2 rounded-md focus:ring-1 focus:ring-sky-500 outline-none"
        />
      </div>
    )
  }