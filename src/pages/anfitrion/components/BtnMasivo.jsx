import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext, useState } from 'react'
import { read, utils } from "xlsx";
import { Toast } from '../../../components/Alertas/SweetAlex';
import { UserContext } from '../../../context/ContextDerco';
import { crearServicio } from '../../../helpers/ApiAnfitrion';
export const BtnMasivo = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [excel, setExcel] = useState("")
    const capturarExcel = (e) => {
        setExcel(e.target.files[0])
    }
    const { estadoData, setEstadoData } = useContext(UserContext);
    const subirDatos = (e) => {
        e.preventDefault()
        if (excel) {
            let fileReader = new FileReader();
            fileReader.readAsBinaryString(excel);
            fileReader.onload = (e) => {
                let data = e.target.result
                let dataParseada = read(data, { type: "binary" })
                dataParseada.SheetNames.map((resul) => {
                    let rowObject = utils.sheet_to_row_object_array(dataParseada.Sheets[resul])
                    crearServicio(rowObject).then((res) => {
                        if (res.statusCode === 200) {
                            Toast.fire({
                                icon: "success",
                                title: "Usuario Creado Exitosamente",
                            });
                            setEstadoData(!estadoData);
                            setIsOpen(false);
                        } else {
                            Toast.fire({
                                icon: "error",
                                title: "No se creo el usuario correctamente",
                            });
                        }
                    });
                })
            }
        }
    }


    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
                Open dialog
            </button>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
                                    <div className='bg-[#C00000] text-white py-2 w-full'>
                                        <p className='text-center text-xl font-medium '>Modulo de carga masiva</p>
                                    </div>
                                    <div className='p-5 w-full block'>
                                        <form action="" className='mx-auto mt-5' onSubmit={subirDatos}>
                                            <input type="file" accept='.xls, .xlsx' onChange={capturarExcel} className="block w-full text-sm text-slate-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-full file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-green-50 file:text-green-700
                                                hover:file:bg-green-100
                                                "/>
                                            <button type="submit" className='bg-black text-white rounded-md p-2 font-semibold mt-5 mx-auto flex items-center gap-3'><i class="flex gap items-cemter gap -3 fa-solid fa-floppy-disk"></i>Cargar Excel</button>
                                        </form>
                                        <p className='font-bold text-sm text-red-400 mt-5'>*Nota: <spam className="font-normal">El modulo de carga masiva solo aceptara formastos .xls, .xlsx, otros tipos de formatos dara error.</spam></p>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}