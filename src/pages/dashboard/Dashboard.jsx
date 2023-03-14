import { useLocation } from "react-router-dom";
import { ModalBienvenida } from "./components/ModalBienvenida";

export const Dashboard = () => {
  const { state } = useLocation()
  console.log(useLocation())
  console.log("Soy el estate",state)
  return (
    <>
        <ModalBienvenida/>
    </>
  );
};
