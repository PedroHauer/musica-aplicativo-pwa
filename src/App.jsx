import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import PaginaInicial from "./paginas/PaginaInicial/PaginaInicial";
import CadastroMusicas from "./paginas/CadastroMusicas/CadastroMusicas";
import ListaMusicas from "./paginas/ListaMusicas/ListaMusicas";
import CadastroUsuario from "./paginas/CadastroUsuario/CadastroUsuario";
import Login from "./paginas/Login/Login";

import RotaProtegida from "./componentes/RotaProtegida/RotaProtegida";

const roteador = createBrowserRouter([
  {
    path: "",
    element: (
      <RotaProtegida>
        <PaginaInicial />
      </RotaProtegida>
    ),
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "cadastro-usuario",
    element: <CadastroUsuario />,
  },
  {
    path: "cadastro-musicas",
    element: (
      <RotaProtegida>
        <CadastroMusicas />
      </RotaProtegida>
    ),
  },
  {
    path: "cadastro-musicas/:id",
    element: (
      <RotaProtegida>
        <CadastroMusicas />
      </RotaProtegida>
    ),
  },
  {
    path: "lista-musicas",
    element: (
      <RotaProtegida>
        <ListaMusicas />
      </RotaProtegida>
    ),
  },
  {
    path: "*",
    element: <h3>Página não encontrada!</h3>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={roteador} />
      <ToastContainer />
    </>
  );
}

export default App;