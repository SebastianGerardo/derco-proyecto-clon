import { Outlet } from "react-router-dom";
import { Menu } from "../../components/Navbar/Menu";
import { Navbar } from "../../components/Navbar/Navbar";


export const DashboardRouter = () => {
  return (
    <>
      <div className="flex items-start">
        <Menu />
        <div className="w-full ">
          <Navbar />
   
            <Outlet />

        </div>
      </div>
    </>
  );
};
