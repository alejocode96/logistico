//importaciones react
import React from 'react';
import { useState } from 'react'

//Rutas
import { useRoutes, HashRouter } from 'react-router-dom';

//pages
import Home from '../Home';
import Login from '../Login';
import Chat from '../Chat';
//contexto
import { LogisticoProvider } from '../../Context';

//animaciones
import { useAos } from '../../hooks/useAos'


const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/Login', element: <Login /> },
    { path: '/Chat', element: <Chat /> }
  ])
  return routes
}

function App() {
  useAos({ duration: 1500, once: false });

  return (
    <LogisticoProvider>
      <HashRouter>
  <AppRoutes />
</HashRouter>
    </LogisticoProvider>
  )
}

export default App
