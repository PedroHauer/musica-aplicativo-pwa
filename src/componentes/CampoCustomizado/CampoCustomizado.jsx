import "./CampoCustomizado.css";

function CampoCustomizado({ label, ...props }) {
  return (
    <div className="campo-customizado__root">
      <label>{label}</label>
      <input className="campo-customizado__input" {...props} />
    </div>
  );
}

export default CampoCustomizado;