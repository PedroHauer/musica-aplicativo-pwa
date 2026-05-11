import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import { useNavigate } from "react-router-dom";
import "./PaginaInicial.css";

function PaginaInicial() {
  const navigate = useNavigate();

  return (
    <Principal>
      <div className="pagina-inicial">
        <img
          src="/logo.png"
          alt="Logo HauerMusic"
          className="pagina-inicial__logo"
        />

        <h1 className="pagina-inicial__titulo">
          HauerMusic
        </h1>

        <p className="pagina-inicial__subtitulo">
          Seu catálogo pessoal de músicas favoritas
        </p>

        <div className="pagina-inicial__botoes">
          <BotaoCustomizado
            tipo="primario"
            aoClicar={() => navigate("/cadastro-musicas")}
          >
            Cadastro de Músicas
          </BotaoCustomizado>

          <BotaoCustomizado
            tipo="secundario"
            aoClicar={() => navigate("/lista-musicas")}
          >
            Lista de Músicas
          </BotaoCustomizado>
        </div>
      </div>
    </Principal>
  );
}

export default PaginaInicial;