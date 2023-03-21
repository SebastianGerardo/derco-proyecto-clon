import { Outlet } from "react-router-dom";
import { Menu } from "../../components/Navbar/Menu";
import { Navbar } from "../../components/Navbar/Navbar";


export const DashboardRouter = () => {
  return (
    <>
      <div className="flex items-start">
        <Menu />
        <div className="max-h-screen h-screen w-full overflow-y-auto flex flex-col">
            <Navbar />

              <Outlet />

        </div>
      </div>
    </>
  );
};
