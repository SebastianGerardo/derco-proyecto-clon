import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext, useState } from 'react'
import { read, utils } from "xlsx";
import { Toast } from '../../../components/Alertas/SweetAlex';
import { UserContext } from '../../../context/ContextDerco';
import { crearServicio } from '../../../helpers/ApiAnfitrion';
import { convertirFecha, reemplzar } from '../../../helpers/funcions';
export const BtnMasivo = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [excel, setExcel] = useState("")
    const capturarExcel = (e) => {
        setExcel(e.target.files[0])
    }
    const { estadoData, setEstadoData } = useContext(UserContext);

    const subirDatos = (e) => {
        e.preventDefault()
        if (excel != "") {
            let fileReader = new FileReader();
            fileReader.readAsBinaryString(excel);
            fileReader.onload = (e) => {
                let data = e.target.result
                let dataParseada = read(data, { type: "binary" })
                dataParseada.SheetNames.map((resul) => {
                    let rowObject = utils.sheet_to_row_object_array(dataParseada.Sheets[resul])
                    let nuevoValor = rowObject.map((res) => ({
                        nombres: `${res.Nombre} ${res.Apellido}`,
                        correo: res["E-mail"],
                        telefono: reemplzar(res.Teléfono),
                        servicioSolicitado: res.Servicio,
                        fechaCita: convertirFecha(`${res["Fecha de realización"]}:00`),
                        notasCliente: res["Notas compartidas con cliente"],
                        comentarioInterno: res["Comentario interno"],
                        detalleServicio: res["Detalles del servicio solicitado"],
                        vehiculoKilometraje: res.Kilometraje,
                        marca: res["Marca"],
                        modelo: res["Modelo"],
                        placa: reemplzar(res["Placa (solo letras y números, sin guión)"]),
                        fechaEntrada: new Date(convertirFecha(`${res["Fecha de creación"]}:00`))
                    }))

            
                    crearServicio(nuevoValor).then((res) => {
                        if (res.statusCode === 200) {
                            Toast.fire({
                                icon: "success",
                                title: "Archivo cargado correctamente",
                            });
                            res.data.map((res) => {
                                if (res.registradoAnteriormente) {
                                    Toast.fire({
                                        icon: "error",
                                        title: "Datos Repetidos",
                                    });
                                }
                            })
                            setEstadoData(!estadoData);
                            setIsOpen(false);
                        } else {
                            Toast.fire({
                                icon: "error",
                                title: "Ocurrió un problema al cargar el archivo",
                            });
                        }
                    });
                })
            }
        } else {
            Toast.fire({
                icon: "error",
                title: "Ingresa un archivo",
            });
        }
    }


    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="rounded-md mr-4 bg-green-600 px-4 py-2 text-sm font-medium text-white border-green-600 border-2 border-solid transition-all ease-in duration-200 shadow-[.3rem_.3rem_1rem_#ccc,_-.3rem_-.3rem_1rem_#fff] hover:shadow-[.3rem_.3rem_1rem_#fff,_-.3rem_-.3rem_1rem_#ccc] active:shadow-[inset_.1rem_.1rem_1rem_#16A34A,_inset_-.1rem_-.1rem_1rem_#16A34A]"
            >
                <i className="fa-solid fa-upload mr-1"></i>
                Cargar Archivos
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
                                        <p className='text-center text-xl font-medium '>Módulo de carga masiva</p>
                                        <button onClick={(e) => { e.preventDefault(); setIsOpen(false) }} className="absolute top-0 right-0 mr-4 text-white text-3xl">x</button>
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
                                            <div className='flex items-center mt-5 justify-center gap-5'>
                                                <button type="submit" className="flex items-center gap-2 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"><i className="flex gap items-cemter gap-3 fa-solid fa-floppy-disk"></i>Cargar Excel</button>
                                                {/* <a href='/documentos/Plantilla Derco.xlsx' className='p-2 bg-green-500 rounded-md text-white font-semibold flex items-center gap-3'><i className="fa-solid fa-download flex"></i>Descargar Plantilla</a> */}
                                            </div>

                                        </form>

                                        <p className='font-bold text-sm text-red-400 mt-5'>*Nota: <span className="font-normal">El módulo de carga masiva solo aceptará formatos .xls, .xlsx, otros tipos de formatos dará error.</span></p>
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