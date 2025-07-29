// Importaciones de React
import React from 'react';
// src/context/AosContext.js
import { createContext, useContext, useEffect, useCallback } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AosContext = createContext({ refreshAos: () => {} });

export const AosProvider = ({ children, options = {} }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      ...options,
    });
  }, []);

  const refreshAos = useCallback(() => {
    AOS.refresh();
  }, []);

  return (
    <AosContext.Provider value={{ refreshAos }}>
      {children}
    </AosContext.Provider>
  );
};

export const useAos = () => useContext(AosContext);
