import { FormCrear } from "../../pages/anfitrion/components/FormCrear";
import { FormEdit } from "../../pages/anfitrion/components/FormEdit";
export const FromAnfitrion = ({ data }) => {
  console.log(data);
  return <>{data !== undefined ? <FormEdit data={data} /> : <FormCrear />}</>;
};
