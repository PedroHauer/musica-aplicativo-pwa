import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

import Principal from "../../componentes/Principal/Principal";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";

import { loginUsuario } from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function fazerLogin() {
    const resultado = loginUsuario(email, senha);

    if (resultado.sucesso) {
      navigate("/");
    } else {
      alert(resultado.mensagem);
    }
  }

  return (
    <Principal titulo="Login">
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
        aoClicar={fazerLogin}
      >
        Entrar
      </BotaoCustomizado>

      <BotaoCustomizado
        tipo="secundario"
        aoClicar={() => navigate("/cadastro-usuario")}
      >
        Criar conta
      </BotaoCustomizado>
    </Principal>
  );
}

export default Login;