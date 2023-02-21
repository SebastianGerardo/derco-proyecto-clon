import { Route, Routes } from "react-router-dom";
import { Menu } from "../../components/Navbar/Menu";
import { Navbar } from "../../components/Navbar/Navbar";
import { Anfitrion } from "../anfitrion/Anfitrion";
import { Dashboard } from "../dashboard/Dashboard";
import { Recepcion } from "../Recepcion/Recepcion";

export const DashboardRouter = () => {
  return (
    <>
      <div className="flex items-start">
        <Menu />
        <div className="w-full ">
          <Navbar />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/dashboard/anfitrion" element={<Anfitrion />}></Route>
            <Route path="/dashboard/recepcion" element={<Recepcion />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
};
