import Principal from "../../componentes/Principal/Principal";
import { useState } from "react";
import "./ListaMusicas.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { obterUsuarioLogado } from "../../services/authService";
import {
  MdMic,
  MdMusicNote,
  MdStar,
  MdComment,
  MdEdit,
  MdDelete,
  MdArrowBack
} from "react-icons/md";

function ListaMusicas() {
  const navigate = useNavigate();

  const usuarioLogado = obterUsuarioLogado();

  const [musicas, setMusicas] = useState(() => {
    const todasMusicas =
      JSON.parse(localStorage.getItem("musicas")) || [];

    return todasMusicas.filter(
      (musica) => musica.usuarioId === usuarioLogado?.id
    );
  });

  const [termoBusca, setTermoBusca] = useState("");

  function removerMusica(idParaRemover) {
    const musicaParaRemover = musicas.find(
      (musica) => musica.id === idParaRemover
    );

    if (!musicaParaRemover) return;

    const confirmar = window.confirm(
      `Tem certeza que deseja excluir "${musicaParaRemover.nome}"?`
    );

    if (!confirmar) {
      toast.info("Exclusão cancelada");
      return;
    }

    const novasMusicas = musicas.filter(
      (musica) => musica.id !== idParaRemover
    );

    setMusicas(novasMusicas);

    const todasMusicas =
      JSON.parse(localStorage.getItem("musicas")) || [];

    const listaAtualizada = todasMusicas.filter(
      (musica) => musica.id !== idParaRemover
    );

    localStorage.setItem(
      "musicas",
      JSON.stringify(listaAtualizada)
    );

    toast.success("Música excluída com sucesso!");
  }

  function renderizarEstrelas(nota) {
    let estrelas = "";

    for (let i = 1; i <= 5; i++) {
      estrelas += i <= nota ? "★" : "☆";
    }

    return estrelas;
  }

  const musicasFiltradas = [...musicas]
    .filter(
      (musica) =>
        musica.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
        musica.artista.toLowerCase().includes(termoBusca.toLowerCase()) ||
        musica.genero.toLowerCase().includes(termoBusca.toLowerCase())
    )
    .sort((a, b) => b.nota - a.nota);

  return (
    <Principal titulo="Lista de Músicas">
      <button
        className="botao-voltar"
        onClick={() => navigate("/")}
        type="button"
      >
        <MdArrowBack size={26} />
      </button>

      <input
        type="text"
        className="campo-busca"
        placeholder="Buscar música, artista ou gênero..."
        value={termoBusca}
        onChange={(e) => setTermoBusca(e.target.value)}
      />

      {musicasFiltradas.length === 0 ? (
        <p>Nenhuma música cadastrada para este usuário.</p>
      ) : (
        musicasFiltradas.map((musica) => (
          <div key={musica.id} className="lista-musicas__card">
            <div className="lista-musicas__titulo">
              {musica.nome}
            </div>

            <div className="lista-musicas__info">
              <MdMic /> {musica.artista}
            </div>

            <div className="lista-musicas__info">
              <MdMusicNote /> {musica.genero}
            </div>

            <div className="lista-musicas__nota">
              <MdStar /> {renderizarEstrelas(musica.nota)} ({musica.nota}/5)
            </div>

            <div className="lista-musicas__opiniao">
              <MdComment /> {musica.opiniao}
            </div>

            <button
              className="lista-musicas__botao"
              onClick={() =>
                navigate(`/cadastro-musicas/${musica.id}`)
              }
            >
              <MdEdit /> Editar
            </button>

            <button
              className="lista-musicas__botao"
              onClick={() => removerMusica(musica.id)}
            >
              <MdDelete /> Excluir
            </button>
          </div>
        ))
      )}
    </Principal>
  );
}

export default ListaMusicas;