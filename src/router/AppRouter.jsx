import { useContext } from "react";
import { Routes, Route } from "react-router-dom"
import { UserContext } from "../context/ContextDerco";
import { Login } from "../pages/Login/Login"
import { DashboardRouter } from "../pages/router/DashboardRouter"

export const AppRouter = () =>{


    return(
        <Routes>
            <Route path="/login" element={<Login/>} />

            <Route path="/*" element={<DashboardRouter/>}/>
        </Routes>
    )
}