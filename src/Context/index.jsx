//importaciones react
import React, { useState, useEffect } from 'react';

const LogisticoContext = React.createContext();

import { Clock, Medal, TrendingUp } from 'lucide-react';

function LogisticoProvider({ children }) {

    //estado para el dark mode
    const [isDark, setIsDark] = useState(true);
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

    //modal de preguntas frecuentes
    const questions = [
        {
            id: 1,
            title: "Tiempos de Espera y Permanencia",
            icon: <Clock className="text-blue-700 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 group-hover:text-white" />,
            description: "Consultas relacionadas con el tiempo promedio que los vehículos permanecen en distintas regiones o zonas, segmentadas por fechas específicas o periodos definidos.",
            detailedInfo: "Esta sección te permite analizar en profundidad los tiempos de permanencia de vehículos en diferentes zonas geográficas. Puedes filtrar por fechas específicas, tipos de vehículo, y obtener métricas detalladas sobre patrones de comportamiento.",
            questioOptions: [
                {
                    id: 1, titleQuestion: 'Tiempo promedio de permanencia por zona', formFields: [
                        { name: "zona", label: "Zona", type: "select", options: ["Norte", "Centro", "Noroccidente", "Suroccidente"], required: true, unique: true },
                        { name: "fecha_inicio", label: "Fecha de Inicio", type: "date", required: false },
                        { name: "fecha_fin", label: "Fecha de Fin", type: "date", required: false },

                    ]
                },
                {
                    id: 2, titleQuestion: 'Tiempo promedio de permanencia por Región', formFields: [
                        { name: "region", label: "Región", type: "select", options: [], required: true, unique: false },
                        { name: "fecha_inicio", label: "Fecha de Inicio", type: "date", required: false },
                        { name: "fecha_fin", label: "Fecha de Fin", type: "date", required: false },
                    ]
                },
                {
                    id: 3, titleQuestion: 'Tiempo promedio de permanencia por Vehículo', formFields: [
                        { name: "vehiculo", label: "Vehículo", type: "select", options: [], required: true, unique: false },
                        { name: "fecha_inicio", label: "Fecha de Inicio", type: "date", required: false },
                        { name: "fecha_fin", label: "Fecha de Fin", type: "date", required: false },
                    ]
                }
            ],

        },
        {
            id: 2,
            title: "Ranking de tiempos críticos",
            icon: <Medal className="text-blue-700 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 group-hover:text-white" />,
            description: "Preguntas que permiten analizar rankings críticos de tiempos de permanencia de los vehículos, segmentados por tipo de vehículo, zona, región y periodos definidos.",
            detailedInfo: "Genera rankings de rendimiento basados en tiempos críticos de permanencia. Identifica las zonas y vehículos con mejor y peor desempeño, estableciendo benchmarks para optimización operativa.",
            questioOptions: [
                {
                    id: 1, titleQuestion: 'Top N de regiones por zona', formFields: [
                        { name: "Top", label: "Top", type: "number", required: true, },
                        { name: "zona", label: "Zona", type: "select", options: ["Norte", "Centro", "Noroccidente", "Suroccidente"], required: true, unique: false },
                        { name: "fecha_inicio", label: "Fecha de Inicio", type: "date", required: false },
                        { name: "fecha_fin", label: "Fecha de Fin", type: "date", required: false },

                    ]
                },
                {
                    id: 2, titleQuestion: 'Top N de vehículos por por zona', formFields: [
                        { name: "Top", label: "Top", type: "number", required: true, },
                        { name: "zona", label: "Zona", type: "select", options: ["Norte", "Centro", "Noroccidente", "Suroccidente"], required: true, unique: false },
                        { name: "fecha_inicio", label: "Fecha de Inicio", type: "date", required: false },
                        { name: "fecha_fin", label: "Fecha de Fin", type: "date", required: false },

                    ]
                },
                {
                    id: 3, titleQuestion: 'Top N de vehículos por por region', formFields: [
                        { name: "Top", label: "Top", type: "number", required: true, },
                        { name: "region", label: "Región", type: "select", options: [], required: true, unique: false },
                        { name: "fecha_inicio", label: "Fecha de Inicio", type: "date", required: false },
                        { name: "fecha_fin", label: "Fecha de Fin", type: "date", required: false },

                    ]
                }
            ],
        },
        {
            id: 3,
            title: "Tendencias y Cumplimiento",
            icon: <TrendingUp className="text-blue-700 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 group-hover:text-white" />,
            description: "Preguntas enfocadas en analizar la evolución del comportamiento operativo y el cumplimiento de tiempos por región, zona o vehículo, a lo largo de distintos periodos.",
            detailedInfo: "Analiza la evolución temporal del comportamiento operativo y mide el cumplimiento de objetivos de tiempo. Identifica tendencias, patrones estacionales y áreas de mejora en el rendimiento operacional.",
            questioOptions: [
                {
                    id: 1, titleQuestion: 'Tiempo promedio de permanencia por zona', formFields: [
                        { name: "fecha_inicio", label: "Fecha de Inicio", type: "date", required: false },
                        { name: "fecha_fin", label: "Fecha de Fin", type: "date", required: false },
                        { name: "zona", label: "Zona", type: "select", options: ["Norte", "Centro", "Noroccidente", "Suroccidente"], required: true, unique: true },
                    ]
                },
                {
                    id: 2, titleQuestion: 'Tiempo promedio de permanencia por Región', formFields: [
                        { name: "fecha_inicio", label: "Fecha de Inicio", type: "date", required: false },
                        { name: "fecha_fin", label: "Fecha de Fin", type: "date", required: false },
                        { name: "region", label: "Región", type: "select", options: [], required: true, unique: false },
                    ]
                },
                {
                    id: 3, titleQuestion: 'Tiempo promedio de permanencia por Vehículo', formFields: [
                        { name: "fecha_inicio", label: "Fecha de Inicio", type: "date", required: false },
                        { name: "fecha_fin", label: "Fecha de Fin", type: "date", required: false },
                        { name: "vehiculo", label: "Vehículo", type: "select", options: [], required: true, unique: false },
                    ]
                }
            ],
        },
    ];
    const [isOpenFAQ, setIsOpenFAQ] = useState(false);
    const [selectedFAQ, setSelectedFAQ] = useState(1);
    const [selectedQuestionOption, setSelectedQuestionOption] = useState(null); // Opción de pregunta seleccionada

    const handleSlideClick = (questionId) => {
        setSelectedFAQ(questionId);  // Establece la pregunta seleccionada
        setIsOpenFAQ(true);              // Abre el modal

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

            isModalSidebarOpen, setIsModalSidebarOpen, handleOverlayClick, handleToggleModalSidebar,

            questions, isOpenFAQ, setIsOpenFAQ, selectedFAQ, setSelectedFAQ, handleSlideClick, selectedQuestionOption, setSelectedQuestionOption
        }}>
            {children}
        </LogisticoContext.Provider>
    )
}

export { LogisticoContext, LogisticoProvider };