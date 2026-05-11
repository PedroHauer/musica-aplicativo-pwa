import "./Principal.css";

function Principal({ titulo, children }) {
  return (
    <main className="container-principal">
      <div className="card-principal">

        {titulo && <h1>{titulo}</h1>}

        <div className="conteudo-principal">
          {children}
        </div>

      </div>
    </main>
  );
}

export default Principal;