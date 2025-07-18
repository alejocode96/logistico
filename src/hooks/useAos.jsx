// src/hooks/useAos.js
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const useAos = (options = {}) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      ...options,
    });

    // Re-inicializa si el contenido cambia dinámicamente
    AOS.refresh();
  }, [options]);
};
