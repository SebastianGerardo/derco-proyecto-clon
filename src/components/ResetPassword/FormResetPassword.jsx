import React, { useState } from "react";
import { InputBasic } from "../InputForms/InputBasic";

const FormResetPassword = ({ closeModal }) => {
    const [dataChange, setDataChange] = useState({
        password: "",
        newPassword: "",
        newPasswordConfirm: "",
    })
    
    const captura = (e) => {
        setDataChange({
            ...dataChange,
            [e.target.name]: e.target.value
        })
    }

    const sendChanges = () => {
        // Aquí se enviará la data al backend
    }

    return (
        <form action="" onSubmit={sendChanges} className="space-y-2">
            {/* INPUTS DEL FORM - INICIO */}
            <div className="w-full lg:flex lg:flex-col lg:gap-x-4">
                <section className="w-full lg:w-full md:w-full ">

                    <InputBasic labelName={"Contraseña Actual"} onChange={captura} pHolder={"*****"} data={dataChange.password} name={"password"}/>

                    <InputBasic labelName={"Nueva Contraseña"} onChange={captura} pHolder={""} data={dataChange.newPassword} name={"newPassword"}/>

                    <InputBasic labelName={"Confirmacion de Contraseña:"} onChange={captura} pHolder={""} data={dataChange.newPasswordConfirm} name={"newPasswordConfirm"}/>

                </section>
            </div>
            <div className="flex flex-col items-center justify-center w-full">

                <section className="flex lg:flex-row flex-row justify-center lg:items-end items-center md:flex-row">
                    <div className="flex justify-center w-full mt-1">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="flex items-center gap-2 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                            <i className="fa-solid fa-floppy-disk"></i>
                            Guardar
                        </button>
                    </div>
                </section>
            </div>
        </form>
    );
};

export default FormResetPassword;
