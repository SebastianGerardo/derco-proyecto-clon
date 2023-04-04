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
