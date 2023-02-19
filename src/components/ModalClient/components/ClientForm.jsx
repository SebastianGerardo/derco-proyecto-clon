import React from "react";

export const ClientForm = () => {
  return (
    <div className="bg-white px-4 py-5 sm:p-6">
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            autoComplete="first-name"
            className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm pl-1 h-7 focus:outline-none focus:ring-0 focus:ring-black  focus:border-black sm:text-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="apellido"
            className="block text-sm font-medium text-gray-700"
          >
            Apellido
          </label>
          <input
            type="text"
            name="apellido"
            id="apellido"
            autoComplete="last-name"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm pl-1 h-7 focus:outline-none focus:ring-0 focus:ring-black  focus:border-black sm:text-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-4">
          <label
            htmlFor="placa"
            className="block text-sm font-medium text-gray-700"
          >
            Placa
          </label>
          <input
            type="text"
            name="placa"
            id="placa"
            autoComplete="plate"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm pl-1 h-7 focus:outline-none focus:ring-0 focus:ring-black  focus:border-black sm:text-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="local"
            className="block text-sm font-medium text-gray-700"
          >
            Local
          </label>
          <select
            id="local"
            name="local"
            autoComplete="local-name"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          >
            <option>Surco</option>
            <option>Surquillo</option>
            <option>Camacho</option>
          </select>
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="estado"
            className="block text-sm font-medium text-gray-700"
          >
            Estado
          </label>
          <select
            id="estado"
            name="estado"
            autoComplete="state-status"
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          >
            <option>Asiste</option>
            <option>No asiste</option>
            <option>Confirmo</option>
          </select>
        </div>

        <div className="col-span-6 sm:col-span-4 lg:col-span-2">
          <label
            htmlFor="marca"
            className="block text-sm font-medium text-gray-700"
          >
            Marca
          </label>
          <input
            type="text"
            name="marca"
            id="marca"
            autoComplete="type-brand"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm pl-1 h-7 focus:outline-none focus:ring-0 focus:ring-black  focus:border-black sm:text-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
          <label
            htmlFor="telefono"
            className="block text-sm font-medium text-gray-700"
          >
            Telefono
          </label>
          <input
            type="text"
            name="telefono"
            id="telefono"
            autoComplete="phone-number"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm pl-1 h-7 focus:outline-none focus:ring-0 focus:ring-black  focus:border-black sm:text-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
          <label
            htmlFor="servicio"
            className="block text-sm font-medium text-gray-700"
          >
            Servicio
          </label>
          <input
            type="text"
            name="servicio"
            id="servicio"
            autoComplete="service-type"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm pl-1 h-7 focus:outline-none focus:ring-0 focus:ring-black  focus:border-black sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};
