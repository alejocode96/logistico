//importaciones react
import React, { useState, useEffect } from 'react';

const LogisticoContext = React.createContext();

function LogisticoProvider({ children }) {
    //estado para el dark mode
    const [isDark, setIsDark] = useState(false);
    const toggleDarkMode = () => { setIsDark(!isDark); };
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme'); // Lee la preferencia guardada en localStorage
        if (savedTheme) {
            setIsDark(savedTheme === 'dark');  // Aplica la preferencia guardada: 'dark' o 'light'
        } else {
            // Si no hay preferencia guardada, detecta la preferencia del sistema operativo
            setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
    }, []);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark'); // Añade la clase 'dark' al <html>
            localStorage.setItem('theme', 'dark');           // Guarda la preferencia en localStorage
        } else {
            document.documentElement.classList.remove('dark'); // Remueve la clase 'dark'
            localStorage.setItem('theme', 'light');             // Guarda la preferencia como 'light'
        }
    }, [isDark]);

    
    return (
        <LogisticoContext.Provider value={{

            isDark, setIsDark, toggleDarkMode,

            
        }}>
            {children}
        </LogisticoContext.Provider>
    )
}

export { LogisticoContext, LogisticoProvider };