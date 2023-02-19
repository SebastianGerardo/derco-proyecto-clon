import { Routes, Route } from "react-router-dom"
import { Login } from "../pages/Login/Login"
import { DashboardRouter } from "../pages/router/DashboardRouter"

export const AppRouter = () =>{
    return(
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/*" element={<DashboardRouter/>}/>
        </Routes>
    )
}