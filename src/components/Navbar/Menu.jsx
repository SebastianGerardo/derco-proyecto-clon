import { BarraMenu } from "./BarraMenu";

export const Menu = () => {
  return (
    <div className=" space-y-2 shadow-lg bg-redDerco hidden lg:block xl:block z-100 h-screen transition-all w-16 hover:w-64">
      <BarraMenu />
    </div>
  );
};
