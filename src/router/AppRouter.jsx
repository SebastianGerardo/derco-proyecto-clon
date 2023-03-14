import { useContext } from "react";
import { Routes, Route } from "react-router-dom"
import { UserContext } from "../context/ContextDerco";
import { Login } from "../pages/Login/Login"
import { DashboardRouter } from "../pages/router/DashboardRouter"
import { Anfitrion } from "../../src/pages/anfitrion/Anfitrion";
import { Dashboard } from "../../src/pages/dashboard/Dashboard";
import { Recepcion } from "../../src/pages/Recepcion/Recepcion";


export const AppRouter = () =>{


    return(
        <Routes>
            <Route path="/login" element={<Login/>} />
            
            <Route path="/dashboard" element={<DashboardRouter/>}>
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/dashboard/anfitrion" element={<Anfitrion />}/>
                <Route path="/dashboard/recepcion" element={<Recepcion />}/>
            </Route>


        </Routes>
    )
}