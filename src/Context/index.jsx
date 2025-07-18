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

    //Mostrar contraseña
    const [showPassword, setShowPassword] = useState(false);

    // SideBar menu
    const [isOpenSideBar, setIsOpenSideBar] = useState(false);
    const toggleSidebar = () => {
        setIsOpenSideBar((prev) => !prev);

    };


    //nombre del chat actual y menu desplegable
    const [chatName, setChatName] = useState("Nombre del chat");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownConfigOpen, setIsDropdownConfigOpen] = useState(false);

    // Estados para notificaciones
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, title: "Nueva actualización", message: "Se ha actualizado el sistema", time: "hace 2 min", read: false },
        { id: 2, title: "Mensaje recibido", message: "Tienes un nuevo mensaje de usuario", time: "hace 5 min", read: false },
        { id: 3, title: "Backup completado", message: "El backup diario se completó exitosamente", time: "hace 1 hora", read: true }
    ]);

    // Funciones para notificaciones
    const unreadNotifications = notifications.filter(n => !n.read).length;
    const hasNotifications = notifications.length > 0;

    const handleNotificationClick = () => {
        setIsNotificationOpen(!isNotificationOpen);
    };

    const clearAllNotifications = () => {
        setNotifications([]);
        setIsNotificationOpen(false);
    };
    const markAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    // Estado para controlar el modal del sidebar
    const [isModalSidebarOpen, setIsModalSidebarOpen] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && isModalSidebarOpen) {
                setIsModalSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        // Limpiar el listener al desmontar
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isModalSidebarOpen, setIsModalSidebarOpen]);
    // Close modal on overlay click
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setIsModalSidebarOpen(false);
        }
    };
    // Toggle Sidebar Modal
    const handleToggleModalSidebar = () => {
        setIsModalSidebarOpen(!isModalSidebarOpen);
    };
    return (
        <LogisticoContext.Provider value={{

            isDark, setIsDark, toggleDarkMode,

            showPassword, setShowPassword,

            isOpenSideBar, setIsOpenSideBar, toggleSidebar,
            chatName, isDropdownOpen, setIsDropdownOpen,

            isNotificationOpen, setIsNotificationOpen,
            notifications, setNotifications,
            unreadNotifications, hasNotifications, handleNotificationClick, clearAllNotifications, markAsRead,

            isDropdownConfigOpen, setIsDropdownConfigOpen,

            isModalSidebarOpen, setIsModalSidebarOpen,handleOverlayClick,handleToggleModalSidebar
        }}>
            {children}
        </LogisticoContext.Provider>
    )
}

export { LogisticoContext, LogisticoProvider };