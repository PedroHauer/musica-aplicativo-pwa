import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import PaginaInicial from "./paginas/PaginaInicial/PaginaInicial";
import CadastroMusicas from "./paginas/CadastroMusicas/CadastroMusicas";
import ListaMusicas from "./paginas/ListaMusicas/ListaMusicas";

const roteador = createBrowserRouter([
  {
    path: "",
    element: <PaginaInicial />,
  },
  {
    path: "cadastro-musicas",
    element: <CadastroMusicas />,
  },
  {
    path: "cadastro-musicas/:id",
    element: <CadastroMusicas />,
  },
  {
    path: "lista-musicas",
    element: <ListaMusicas />,
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