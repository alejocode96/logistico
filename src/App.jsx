import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            ¡Tailwind CSS funcionando!
          </h1>
          <p className="text-gray-600 mb-4">
            Si ves estos estilos, la configuración está correcta.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors">
            Botón de prueba
          </button>
        </div>
      </div>
    </>
  )
}

export default App
