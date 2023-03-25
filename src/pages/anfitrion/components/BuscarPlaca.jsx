import { useState } from "react"
import { Toast } from "../../../components/Alertas/SweetAlex";
import { BuscarCliente } from "../../../helpers/ApiAnfitrion";


export const BuscarPlaca = ({setDatosRegistro}) => {
    const [placa, setPlaca] = useState("")
    const handleInputChange = (e) => {
        setPlaca({
            [e.target.name]: e.target.value,
        });
    };

    console.log(placa)
    const buscar = (e) => {
        e.preventDefault()
        BuscarCliente(placa).then((res) => {
            if (res.statusCode) {
                Toast.fire({
                    icon: "success",
                    title: "Cliente Encontrado",
                });
                console.log(res.data)
            setDatosRegistro({
                nombres: res.data.nombres,
                placa: res.data.placa,
                vehiculoKilometraje: res.data.vehiculoKilometraje,
                asesor: { id: "" },
                estado: "",
                tipoCita: "S",
                fechaEntrada: new Date()
            })
            }else{
                Toast.fire({
                    icon: "success",
                    title: "Cliente no existe",
                });
            }
        })
    }
    return (
        <form action="" className="p-5" onSubmit={buscar}>
            <div className="lg:w-full flex flex-col lg:flex-row items-start lg:items-center w-full gap-3">
                <label htmlFor="" className="inline-block min-w-[12rem] text-gray-400">
                    Buscar datos de la unidad:
                </label>
                <div className="w-full flex p-2 items-center gap-3 border-2 rounded-md border-gray-400 focus-within:border-red-500 focus-within:text-black">
                    <img src="/img/search.gif" alt="" width={30} />
                    <input
                        type="text"
                        name="placa"
                        className="outline-none w-full"
                        onChange={handleInputChange}
                        placeholder="Buscar por placa"
                    />
                </div>
                <button className="bg-green-500 rounded-md text-white h-full p-3">Buscar</button>
            </div>
        </form>
    )
}