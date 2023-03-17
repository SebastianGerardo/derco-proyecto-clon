import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { DashboardRouter } from "../pages/router/DashboardRouter";
import { Anfitrion } from "../../src/pages/anfitrion/Anfitrion";
import { Dashboard } from "../../src/pages/dashboard/Dashboard";
import { Recepcion } from "../../src/pages/Recepcion/Recepcion";
import { PrivateRouter } from "./PrivateRouter";
import { Almacen } from "../pages/Almacen/Almacen";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRouter>
            <DashboardRouter />
          </PrivateRouter>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/abordaje" element={<Anfitrion />} />
        <Route path="/dashboard/recepcion" element={<Recepcion />} />
        <Route path="/dashboard/almacen" element={<Almacen />} />
      </Route>
    </Routes>
  );
};