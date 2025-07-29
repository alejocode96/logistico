// React
import React, { useState, useRef, useEffect } from "react";

// Navegación
import { NavLink } from 'react-router-dom';

// Contexto
import { LogisticoContext } from '../../Context';

// Iconos
import {
    Settings, Bell, Moon, Sun, Edit3, Trash2, CircleX,
    MessageCirclePlus, Search, MessagesSquare, FileChartPie, User, LogOut, FileDown, Logs,
} from 'lucide-react';
import logo from '../../../public/logo.png'
import user from '../../../public/user_men.png'

function NavBarChat() {
    const {
        isDark, toggleDarkMode, chatName, isDropdownOpen, setIsDropdownOpen, isNotificationOpen, setIsNotificationOpen,
        notifications, unreadNotifications, hasNotifications, handleNotificationClick, clearAllNotifications,
        markAsRead, isDropdownConfigOpen, setIsDropdownConfigOpen, isModalSidebarOpen, setIsModalSidebarOpen,
        handleOverlayClick, handleToggleModalSidebar, isOpenSideBar
    } = React.useContext(LogisticoContext);

    const dropdownRef = useRef(null);
    const notificationRef = useRef(null);
    const dropdownConfigRef = useRef(null);

    // Cerrar dropdown cuando se hace clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsNotificationOpen(false);
            }
            if (dropdownConfigRef.current && !dropdownConfigRef.current.contains(event.target)) {
                setIsDropdownConfigOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            {/* Navbar Principal - Cambiado a relative para que no se superponga */}
            <div className={`relative w-full  z-30`}>
                <div className="h-16 flex items-center justify-between lg:justify-end px-3 sm:px-4 lg:px-6 max-w-full">
                    
                    {/* Logo y título - Solo visible en pantallas medianas y pequeñas */}
                    <div className="flex items-center min-w-0 flex-shrink-0 lg:hidden" ref={dropdownRef}>
                        <div className="flex items-center cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            <img src={logo} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                            <h1 className="ml-2 bg-gradient-to-br from-gray-600 to-gray-900 bg-clip-text font-bold tracking-tight text-transparent dark:from-white dark:to-zinc-500 text-lg sm:text-2xl truncate">
                                LOGISTICO
                            </h1>
                        </div>
                    </div>

                    {/* Controles - Siempre visibles y responsive, centrados en pantallas grandes */}
                    <div className="flex items-center bg-zinc-100 dark:bg-[#101014] ring-1 ring-zinc-300 dark:ring-zinc-900/70 rounded-xl shadow-sm px-2 py-1 ml-2 lg:ml-0 flex-shrink-0">
                        <div className="flex items-center gap-1 sm:gap-2">
                            
                            {/* Configuración */}
                            <div className="relative" ref={dropdownConfigRef}>
                                <button 
                                    className="rounded-md transition-all duration-200 hover:scale-110 hover:bg-zinc-300 hover:dark:bg-zinc-900 p-1.5 sm:p-2 text-zinc-500 hover:text-zinc-700 hover:dark:text-zinc-200" 
                                    aria-label="Configuración" 
                                    onClick={() => setIsDropdownConfigOpen(!isDropdownConfigOpen)}
                                >
                                    <Settings size={18} className="sm:w-5 sm:h-5" strokeWidth={1} />
                                </button>
                                
                                {isDropdownConfigOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-44 sm:w-48 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg z-50 py-1">
                                        <button className="w-full px-3 py-2 text-left text-zinc-500 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-600 dark:hover:text-white transition-colors duration-200 flex items-center gap-2 text-sm">
                                            <FileDown size={14} strokeWidth={1.5} />
                                            <span>Descargar</span>
                                        </button>
                                        <button className="w-full px-3 py-2 text-left text-zinc-500 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-600 dark:hover:text-white transition-colors duration-200 flex items-center gap-2 lg:hidden text-sm">
                                            <Edit3 size={14} strokeWidth={1.5} />
                                            <span>Renombrar chat</span>
                                        </button>
                                        <button className="w-full px-3 py-2 text-left text-zinc-500 dark:text-zinc-300 hover:bg-red-600 hover:text-white transition-colors duration-200 flex items-center gap-2 lg:hidden text-sm">
                                            <Trash2 size={14} strokeWidth={1.5} />
                                            <span>Eliminar</span>
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Notificaciones */}
                            <div className="relative" ref={notificationRef}>
                                <button 
                                    onClick={handleNotificationClick}
                                    className="relative rounded-md transition-all duration-200 hover:scale-110 hover:bg-zinc-300 hover:dark:bg-zinc-900 p-1.5 sm:p-2 text-zinc-500 hover:text-zinc-700 hover:dark:text-zinc-200"
                                    aria-label="Notificaciones"
                                >
                                    <Bell size={18} className="sm:w-5 sm:h-5" strokeWidth={1} />
                                    <div className={`absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-xs font-bold ${unreadNotifications > 0 ? 'bg-red-500 text-white' : 'bg-green-700 text-white'}`}>
                                        {unreadNotifications > 9 ? '9+' : (unreadNotifications > 0 ? unreadNotifications : '0')}
                                    </div>
                                </button>
                                
                                {isNotificationOpen && (
                                    <div className="absolute top-full -right-20 mt-2 w-64 sm:w-72 md:w-80 max-w-[90vw] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg z-50 py-2">
                                        <div className="px-3 py-2 border-b border-zinc-300 dark:border-zinc-800 flex justify-between items-center">
                                            <h3 className="text-zinc-500 dark:text-white font-medium text-sm">Notificaciones</h3>
                                            {notifications.length > 0 && (
                                                <button 
                                                    onClick={clearAllNotifications}
                                                    className="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                                                >
                                                    Limpiar todo
                                                </button>
                                            )}
                                        </div>

                                        <div className="max-h-60 sm:max-h-80 overflow-y-auto">
                                            {notifications.length === 0 ? (
                                                <div className="px-3 py-6 text-center text-zinc-400 text-sm">
                                                    No tienes notificaciones
                                                </div>
                                            ) : (
                                                notifications.map((notification) => (
                                                    <div
                                                        key={notification.id}
                                                        className={`px-3 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer border-l-4 ${notification.read ? 'border-l-transparent' : 'border-l-blue-500'}`}
                                                        onClick={() => markAsRead(notification.id)}
                                                    >
                                                        <div className="flex justify-between items-start">
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className={`text-sm font-medium truncate ${notification.read ? 'dark:text-zinc-300 text-zinc-500' : 'dark:text-white text-zinc-600'}`}>
                                                                    {notification.title}
                                                                </h4>
                                                                <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                                                                    {notification.message}
                                                                </p>
                                                                <span className="text-xs text-zinc-600 mt-1 block">
                                                                    {notification.time}
                                                                </span>
                                                            </div>
                                                            {!notification.read && (
                                                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 ml-2 flex-shrink-0"></div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Separador - Oculto en pantallas muy pequeñas */}
                            <div className="hidden xs:block h-6 w-px bg-zinc-300 dark:bg-zinc-700 mx-1 sm:mx-2" />

                            {/* Toggle Dark Mode - Más compacto en móviles */}
                            <button 
                                onClick={toggleDarkMode}
                                className={`relative w-16 h-6 sm:w-20 sm:h-8 rounded-full transition-all duration-300 ${isDark
                                    ? 'bg-black/5 ring-1 ring-zinc-800' : 'bg-zinc-200 dark:bg-zinc-900 ring-1 ring-zinc-300'}`}
                            >
                                <div className={`absolute top-0.5 sm:top-1 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full transition-all duration-300 flex items-center justify-center ${isDark ? 'left-10 sm:left-12' : 'left-0.5 sm:left-1'}`}>
                                    <div className="relative w-3 h-3 sm:w-4 sm:h-4">
                                        <Sun className={`absolute inset-0 w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 transition-all duration-300 ${isDark
                                            ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
                                        <Moon className={`absolute inset-0 w-3 h-3 sm:w-4 sm:h-4 text-indigo-900 transition-all duration-300 ${isDark
                                            ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
                                    </div>
                                </div>
                            </button>

                            {/* Menú hamburguesa - Solo móvil */}
                            <button 
                                className="lg:hidden ml-1 rounded-md transition-all duration-200 hover:scale-110 hover:bg-zinc-300 hover:dark:bg-zinc-900 p-1.5 sm:p-2 text-zinc-500 hover:text-zinc-700 hover:dark:text-zinc-200" 
                                aria-label="Menu" 
                                onClick={handleToggleModalSidebar}
                            >
                                <Logs size={18} className="sm:w-5 sm:h-5" strokeWidth={1} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay y Modal Sidebar */}
            <div 
                className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out lg:hidden ${
                    isModalSidebarOpen 
                        ? 'bg-zinc-300/40 dark:bg-black/60 backdrop-blur-sm opacity-100 pointer-events-auto' 
                        : 'opacity-0 pointer-events-none'
                }`}
                onClick={handleOverlayClick}
            >
                {/* Sidebar Panel */}
                <div className={`h-full flex flex-col bg-zinc-100/95 dark:bg-zinc-900/95 backdrop-blur-md border-r border-zinc-300 dark:border-zinc-700/50 w-72 sm:w-80 max-w-[85vw] p-4 transform transition-transform duration-300 ease-in-out ${
                    isModalSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                    
                    {/* Header del sidebar */}
                    <div className="flex items-center justify-between mb-6 pt-2">
                        <div className="flex items-center">
                            <img src={logo} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                            <h1 className="ml-2 bg-gradient-to-br from-gray-600 to-gray-900 bg-clip-text font-bold tracking-tight text-transparent dark:from-white dark:to-zinc-500 text-2xl sm:text-3xl">
                                LOGISTICO
                            </h1>
                        </div>
                        <button 
                            className="rounded-md transition-all duration-200 hover:scale-110 hover:bg-red-600 p-1.5 text-zinc-500 hover:text-zinc-100" 
                            aria-label="Cerrar" 
                            onClick={() => setIsModalSidebarOpen(false)}
                        >
                            <CircleX size={20} strokeWidth={2} />
                        </button>
                    </div>

                    {/* Contenido del sidebar */}
                    <div className="flex flex-col justify-between flex-1 overflow-hidden">
                        
                        {/* Menú principal */}
                        <div className="flex-1 overflow-y-auto">
                            <ul className="space-y-2">
                                <li className="h-12 flex items-center rounded-lg cursor-pointer hover:text-zinc-600 hover:dark:text-white text-zinc-400 hover:bg-zinc-300 hover:dark:bg-zinc-800 transition-all duration-200 px-3">
                                    <MessageCirclePlus size={24} strokeWidth={1} className="flex-shrink-0" />
                                    <span className="ml-3 text-sm sm:text-base font-medium">Nuevo chat</span>
                                </li>

                                <li className="h-12 flex items-center rounded-lg cursor-pointer hover:text-zinc-600 hover:dark:text-white text-zinc-400 hover:bg-zinc-300 hover:dark:bg-zinc-800 transition-all duration-200 px-3">
                                    <Search size={24} strokeWidth={1} className="flex-shrink-0" />
                                    <span className="ml-3 text-sm sm:text-base font-medium">Buscar chat</span>
                                </li>

                                <li className="h-12 flex items-center rounded-lg cursor-pointer hover:text-zinc-600 hover:dark:text-white text-zinc-400 hover:bg-zinc-300 hover:dark:bg-zinc-800 transition-all duration-200 px-3">
                                    <MessagesSquare size={24} strokeWidth={1} className="flex-shrink-0" />
                                    <span className="ml-3 text-sm sm:text-base font-medium">Mis chats</span>
                                </li>

                                <li className="h-12 flex items-center rounded-lg cursor-pointer hover:text-zinc-600 hover:dark:text-white text-zinc-400 hover:bg-zinc-300 hover:dark:bg-zinc-800 transition-all duration-200 px-3">
                                    <FileChartPie size={24} strokeWidth={1} className="flex-shrink-0" />
                                    <span className="ml-3 text-sm sm:text-base font-medium">Informes</span>
                                </li>
                            </ul>
                        </div>

                        {/* Sección inferior */}
                        <div className="border-t border-zinc-300 dark:border-zinc-700 pt-4 mt-4">
                            <ul className="space-y-3">
                                {/* Perfil de usuario */}
                                <li className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-zinc-300 hover:dark:bg-zinc-800 text-zinc-500 hover:text-zinc-700 hover:dark:text-white dark:text-zinc-400 transition-all duration-200">
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-900 flex-shrink-0">
                                        <img src={user} alt="Perfil" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="ml-3 flex-1 min-w-0">
                                        <p className="text-sm sm:text-base font-semibold truncate">Alejandro Galeano</p>
                                        <p className="text-xs sm:text-sm text-zinc-400 truncate">alejog@gmail.com</p>
                                    </div>
                                </li>

                                {/* Cerrar sesión */}
                                <li className="h-12 flex items-center rounded-lg cursor-pointer hover:text-red-600 hover:dark:text-red-400 text-zinc-400 hover:bg-red-50 hover:dark:bg-red-900/20 transition-all duration-200 px-3">
                                    <LogOut size={24} strokeWidth={1} className="flex-shrink-0" />
                                    <span className="ml-3 text-sm sm:text-base font-medium">Cerrar sesión</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NavBarChat;