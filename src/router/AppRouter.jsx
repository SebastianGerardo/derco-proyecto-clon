import { useContext } from "react";
import { Routes, Route } from "react-router-dom"
import { UserContext } from "../context/ContextDerco";
import { Login } from "../pages/Login/Login"
import { DashboardRouter } from "../pages/router/DashboardRouter"

export const AppRouter = () =>{
    const { cookiesUsu } = useContext(UserContext);
    console.log("validoCookie",cookiesUsu)
    return(
        <Routes>
            <Route path="/" element={<Login/>} />

            <Route path="/*" element={<DashboardRouter/>}/>
        </Routes>
    )
}