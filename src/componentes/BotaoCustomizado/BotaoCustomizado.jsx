import "./BotaoCustomizado.css";

function BotaoCustomizado({ tipo, aoClicar, children }) {
  let classes = "botao-customizado__root";

  switch (tipo) {
    case "primario":
      classes += " botao-customizado__primario";
      break;

    case "secundario":
      classes += " botao-customizado__secundario";
      break;

    default:
      break;
  }

  return (
    <button
      type="submit"
      className={classes}
      onClick={aoClicar}
    >
      {children}
    </button>
  );
}

export default BotaoCustomizado;