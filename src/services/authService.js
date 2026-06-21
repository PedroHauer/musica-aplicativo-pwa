const CHAVE_USUARIOS = "usuarios";
const CHAVE_USUARIO_LOGADO = "usuarioLogado";

function obterUsuarios() {
  const usuarios = localStorage.getItem(CHAVE_USUARIOS);

  if (!usuarios) {
    return [];
  }

  return JSON.parse(usuarios);
}

function salvarUsuarios(listaUsuarios) {
  localStorage.setItem(
    CHAVE_USUARIOS,
    JSON.stringify(listaUsuarios)
  );
}

function cadastrarUsuario(nome, email, senha) {
  const usuarios = obterUsuarios();

  const emailJaExiste = usuarios.some(
    (usuario) => usuario.email.toLowerCase() === email.toLowerCase()
  );

  if (emailJaExiste) {
    return {
      sucesso: false,
      mensagem: "Este e-mail já está cadastrado.",
    };
  }

  const novoUsuario = {
    id: Date.now().toString(),
    nome,
    email,
    senha,
  };

  usuarios.push(novoUsuario);

  salvarUsuarios(usuarios);

  return {
    sucesso: true,
    mensagem: "Usuário cadastrado com sucesso!",
  };
}

function loginUsuario(email, senha) {
  const usuarios = obterUsuarios();

  const usuario = usuarios.find(
    (usuario) =>
      usuario.email.toLowerCase() === email.toLowerCase() &&
      usuario.senha === senha
  );

  if (!usuario) {
    return {
      sucesso: false,
      mensagem: "E-mail ou senha inválidos.",
    };
  }

  localStorage.setItem(
    CHAVE_USUARIO_LOGADO,
    JSON.stringify(usuario)
  );

  return {
    sucesso: true,
    mensagem: "Login realizado com sucesso!",
    usuario,
  };
}

function obterUsuarioLogado() {
  const usuario = localStorage.getItem(
    CHAVE_USUARIO_LOGADO
  );

  if (!usuario) {
    return null;
  }

  return JSON.parse(usuario);
}

function logoutUsuario() {
  localStorage.removeItem(CHAVE_USUARIO_LOGADO);
}

export {
  obterUsuarios,
  salvarUsuarios,
  cadastrarUsuario,
  loginUsuario,
  obterUsuarioLogado,
  logoutUsuario,
  CHAVE_USUARIO_LOGADO,
};