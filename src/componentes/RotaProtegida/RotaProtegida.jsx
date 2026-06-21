import { Navigate } from "react-router-dom";
import { obterUsuarioLogado } from "../../services/authService";

function RotaProtegida({ children }) {
  const usuarioLogado = obterUsuarioLogado();

  if (!usuarioLogado) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RotaProtegida;