// ParticleBackground.jsx
// Componente de fondo visual con partículas animadas utilizando la librería react-tsparticles.

import React from 'react';
import Particles from 'react-tsparticles'; // Importa el componente Particles de la librería.
import { loadFull } from 'tsparticles'; // Función para cargar todas las funcionalidades de tsparticles.

/**
 * Componente ParticleBackground
 * Renderiza un fondo animado de partículas con movimiento hacia arriba.
 */
function ParticleBackground() {
  /**
   * Función de inicialización de tsparticles.
   * Carga todas las funcionalidades necesarias usando loadFull.
   * @param {Engine} engine - Instancia del motor de partículas.
   */
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      // Posiciona el canvas de partículas absolutamente en el fondo, sin bloquear eventos del usuario.
      className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none"
      options={{
        fullScreen: { enable: false }, // Desactiva el modo pantalla completa (controlado manualmente).
        background: { color: { value: 'transparent' } }, // Fondo transparente.
        particles: {
          number: { value: 60 }, // Cantidad de partículas.
          size: { value: { min: 0.5, max: 1.5 } }, // Tamaño de partículas (rango aleatorio).
          color: { value: '#929292' }, // Color gris claro de las partículas.
          move: {
            direction: 'top', // Dirección de movimiento: hacia arriba.
            straight: true, // Movimiento en línea recta.
            enable: true, // Habilita el movimiento.
            outModes: 'out', // Las partículas salen del canvas al llegar al borde.
            speed: 1, // Velocidad del movimiento.
          },
          opacity: { value: 0.9 }, // Opacidad de las partículas.
        },
      }}
    />
  );
}

export default ParticleBackground;
