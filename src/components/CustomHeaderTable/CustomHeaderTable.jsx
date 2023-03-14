export const CustomHeader = ({ icon, nameModule }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <i className={icon}></i>
      <h3>{nameModule}</h3>
    </div>
  );