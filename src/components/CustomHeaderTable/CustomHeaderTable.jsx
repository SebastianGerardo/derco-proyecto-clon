export const CustomHeader = ({ icon, nameModule }) => (
    <div className="flex items-center text-center">
      {icon && <i className={icon}></i>}
      <h3>{nameModule}</h3>
    </div>
  );