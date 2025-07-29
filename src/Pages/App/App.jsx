// Importaciones de React
import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom'; // Asegúrate de importar useRoutes
import { AosProvider } from '../../Hooks/useAos';
// Pages
import Home from '../Home';
import Login from '../Login';
import Chat from '../Chat';


//contexto
import { LogisticoProvider } from '../../Context';

// Definición de las rutas
const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/chat', element: <Chat /> },
    { path: '*', element: <div>Página no encontrada</div> } // Ruta comodín para 404
  ]);

  return routes;
}


function App() {
 

  return (
   <LogisticoProvider>
      <AosProvider>
        <BrowserRouter basename="/logistico">
          <AppRoutes />
        </BrowserRouter>
      </AosProvider>
    </LogisticoProvider>

  );
}

export default App;
