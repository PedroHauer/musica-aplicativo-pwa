import Principal from "../../componentes/Principal/Principal";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { MdStar, MdArrowBack } from "react-icons/md";
import "./CadastroMusicas.css";

function CadastroMusicas() {
  const { id } = useParams();
  const navigate = useNavigate();

  const musicasSalvas =
    JSON.parse(localStorage.getItem("musicas")) || [];

  const musicaEmEdicaoOriginal = musicasSalvas.find(
    (musica) => musica.id == id
  );

  const musicaEmEdicao = musicaEmEdicaoOriginal
    ? {
        ...musicaEmEdicaoOriginal,
        nota:
          musicaEmEdicaoOriginal.nota > 5
            ? Math.ceil(musicaEmEdicaoOriginal.nota / 2)
            : musicaEmEdicaoOriginal.nota,
      }
    : null;

  const [notaSelecionada, setNotaSelecionada] = useState(
    musicaEmEdicao?.nota || 0
  );

  function salvarMusica(event) {
    event.preventDefault();

    const nome = event.target.nome.value.trim();
    const artista = event.target.artista.value.trim();
    const genero = event.target.genero.value.trim();
    const nota = notaSelecionada;
    const opiniao = event.target.opiniao.value.trim();

    if (!nome || !artista || !genero || !nota || !opiniao) {
      toast.error("Preencha todos os campos obrigatórios!");
      return;
    }

    if (nota < 1 || nota > 5) {
      toast.warning("A nota deve ser entre 1 e 5!");
      return;
    }

    const novaMusica = {
      id: musicaEmEdicao?.id || Date.now(),
      nome,
      artista,
      genero,
      nota,
      opiniao,
    };

    let listaAtualizada = [...musicasSalvas];

    if (musicaEmEdicao) {
      listaAtualizada = listaAtualizada.map((musica) =>
        musica.id == id ? novaMusica : musica
      );
    } else {
      listaAtualizada.push(novaMusica);
    }

    localStorage.setItem(
      "musicas",
      JSON.stringify(listaAtualizada)
    );

    toast.success("Música salva com sucesso!");
    navigate("/lista-musicas");
  }

  return (
    <Principal titulo="Cadastro de Músicas">
      <button
        className="botao-voltar"
        onClick={() => navigate("/")}
        type="button"
      >
        <MdArrowBack size={26} />
      </button>

      <form onSubmit={salvarMusica}>
        <CampoCustomizado
          label="Nome da Música"
          name="nome"
          defaultValue={musicaEmEdicao?.nome}
        />

        <CampoCustomizado
          label="Artista"
          name="artista"
          defaultValue={musicaEmEdicao?.artista}
        />

        <CampoCustomizado
          label="Gênero"
          name="genero"
          defaultValue={musicaEmEdicao?.genero}
        />

        <div className="cadastro-musicas__estrelas">
          <label>Nota</label>

          <div className="cadastro-musicas__grupo-estrelas">
            {[1, 2, 3, 4, 5].map((estrela) => (
              <MdStar
                key={estrela}
                size={38}
                className={
                  estrela <= notaSelecionada
                    ? "estrela ativa"
                    : "estrela"
                }
                onClick={() => setNotaSelecionada(estrela)}
              />
            ))}
          </div>
        </div>

        <CampoCustomizado
          label="Opinião"
          name="opiniao"
          defaultValue={musicaEmEdicao?.opiniao}
        />

        <BotaoCustomizado tipo="primario">
          Salvar Música
        </BotaoCustomizado>
      </form>
    </Principal>
  );
}

export default CadastroMusicas;