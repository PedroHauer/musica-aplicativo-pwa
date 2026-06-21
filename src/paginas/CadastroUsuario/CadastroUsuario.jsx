import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./CadastroUsuario.css";

import Principal from "../../componentes/Principal/Principal";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";

import { cadastrarUsuario } from "../../services/authService";

function CadastroUsuario() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleCadastrar() {
    if (!nome || !email || !senha) {
      toast.error("Preencha todos os campos.");
      return;
    }

    const resultado = cadastrarUsuario(nome, email, senha);

    if (!resultado.sucesso) {
      toast.error(resultado.mensagem);
      return;
    }

    toast.success(resultado.mensagem);

    setNome("");
    setEmail("");
    setSenha("");

    setTimeout(() => {
      navigate("/login");
    }, 1200);
  }

  return (
    <Principal titulo="Cadastro de Usuário">
      <CampoCustomizado
        label="Nome"
        placeholder="Digite seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <CampoCustomizado
        label="Email"
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <CampoCustomizado
        label="Senha"
        type="password"
        placeholder="Digite sua senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <BotaoCustomizado
  tipo="primario"
  aoClicar={handleCadastrar}
>
        Cadastrar
      </BotaoCustomizado>
    </Principal>
  );
}

export default CadastroUsuario;