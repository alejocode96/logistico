// React
import React, { useState, useRef, useEffect } from "react";

// Navegación
import { NavLink } from 'react-router-dom';

// Contexto
import { LogisticoContext } from '../../Context';

// Iconos
import {
    ChevronDown, Settings, Bell, Moon, Sun, Edit3, Trash2, CircleX,
    MessageCirclePlus, Search, MessagesSquare, FileChartPie, User, LogOut, FileDown, Logs,
} from 'lucide-react';
import logo from '../../../public/logo.png'
import user from '../../../public/user_men.png'

function NavBarChat() {

    const {
        isDark, toggleDarkMode, chatName, isDropdownOpen, setIsDropdownOpen, isNotificationOpen, setIsNotificationOpen,
        notifications, unreadNotifications, hasNotifications, handleNotificationClick, clearAllNotifications,
        markAsRead, isDropdownConfigOpen, setIsDropdownConfigOpen, isModalSidebarOpen, setIsModalSidebarOpen,
        handleOverlayClick, handleToggleModalSidebar
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
            <div className="mt-5 pb-5 flex items-center justify-center  mx-4 ">
                <div className="relative flex-1 " ref={dropdownRef}>

                    <div className="flex items-center p-1 rounded-md group cursor-pointer transition-all duration-200 w-fit" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <img src={logo} alt="Logo" className="w-10 h-10 object-contain lg:hidden" />
                        <h1 className={`pl-2 bg-gradient-to-br from-gray-600 to-gray-900 bg-clip-text font-bold tracking-tight text-transparent dark:from-white dark:to-zinc-500  text-3xl origin-left lg:hidden`}>
                            LOGISTICO
                        </h1>
                     
                    </div>

                   
                </div>

                {/* Contenedor de iconos */}
                <div className="bg-zinc-100 dark:bg-[#101014] ring-1 ring-zinc-300 dark:ring-zinc-900/70 items-center justify-center flex rounded-xl  shadow-sm px-2 py-1 pt-2 ">
                    <div className="flex gap-1 lg:gap-2">
                        {/* Configuración */}
                        <div className="relative" ref={dropdownConfigRef}>
                            <button className="rounded-md transition-all duration-200 hover:scale-110 hover:bg-zinc-300 hover:dark:bg-zinc-900 p-1 text-zinc-500 hover:text-zinc-700 hover:dark:text-zinc-200" aria-label="Configuración" onClick={() => setIsDropdownConfigOpen(!isDropdownConfigOpen)}>
                                <Settings size={20} strokeWidth={1} />
                            </button>
                            {isDropdownConfigOpen && (
                                <div className="absolute top-full right-0 mt-2 w-46 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg z-50 py-1">
                                    <button className="w-full px-3 sm:px-4 py-2 text-left text-zinc-500 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-600 dark:hover:text-white transition-colors duration-200 flex items-center gap-2">
                                        <FileDown size={14} className="sm:w-4 sm:h-4" strokeWidth={1.5} />
                                        <span>Descargar</span>
                                    </button>
                                    <button className="w-full px-3 sm:px-4 py-2 text-left text-zinc-500 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-600 dark:hover:text-white transition-colors duration-200 flex items-center gap-2 lg:hidden">
                                        <Edit3 size={14} className="sm:w-4 sm:h-4" strokeWidth={1.5} />
                                        <span>Renombrar chat</span>
                                    </button>
                                    <button className="w-full px-3 sm:px-4 py-2 text-left text-zinc-500 dark:text-zinc-300 hover:bg-red-600 hover:text-white transition-colors duration-200 flex items-center gap-2 lg:hidden">
                                        <Trash2 size={14} className="sm:w-4 sm:h-4" strokeWidth={1.5} />
                                        <span className="">Eliminar</span>
                                    </button>
                                </div>
                            )}
                        </div>


                        {/* Notificaciones */}
                        <div className="relative" ref={notificationRef}>
                            <button onClick={handleNotificationClick}
                                className="rounded-md transition-all duration-200 hover:scale-110 hover:bg-zinc-300 hover:dark:bg-zinc-900 p-1 text-zinc-500 hover:text-zinc-700 hover:dark:text-zinc-200"
                                aria-label="Notificaciones" >
                                <Bell size={20} strokeWidth={1} />
                                <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${unreadNotifications > 0 ? 'bg-red-500 text-white' : 'bg-green-700 text-white'}`}>
                                    {unreadNotifications > 0 ? unreadNotifications : '0'}
                                </div>
                            </button>
                            {isNotificationOpen && (
                                <div className="absolute top-full right-0 mt-2 w-64 sm:w-72 md:w-80 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg z-50 py-2">
                                    <div className="px-3 sm:px-4 py-2 border-b border-zinc-300 dark:border-zinc-800 flex justify-between items-center">
                                        <h3 className="text-zinc-500 dark:text-white font-medium text-sm sm:text-base">Notificaciones</h3>
                                        {notifications.length > 0 && (
                                            <button onClick={clearAllNotifications}
                                                className="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors" >
                                                Limpiar todo
                                            </button>
                                        )}
                                    </div>

                                    <div className="max-h-80 sm:max-h-96 overflow-y-auto">
                                        {notifications.length === 0 ? (
                                            <div className="px-3 sm:px-4 py-6 sm:py-8 text-center text-zinc-400 text-sm">
                                                No tienes notificaciones
                                            </div>
                                        ) : (
                                            notifications.map((notification) => (
                                                <div
                                                    key={notification.id}
                                                    className={`px-3 sm:px-4 py-2 sm:py-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer border-l-4 ${notification.read ? 'border-l-transparent' : 'border-l-blue-500'}`}
                                                    onClick={() => markAsRead(notification.id)}  >
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex-1">
                                                            <h4 className={`text-xs sm:text-sm font-medium ${notification.read ? 'dark:text-zinc-300 text-zinc-500' : 'dark:text-white text-zinc-600'}`}>
                                                                {notification.title}
                                                            </h4>
                                                            <p className="text-xs text-zinc-500 mt-1">
                                                                {notification.message}
                                                            </p>
                                                            <span className="text-xs text-zinc-600 mt-1 sm:mt-2 block">
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

                        {/* Separador */}
                        <div className="h-6 w-px bg-zinc-300 dark:bg-zinc-700 mx-3 my-1" />

                        {/* Botón Modo Oscuro */}
                        <button onClick={toggleDarkMode}
                            className={`relative w-20 h-[30px] rounded-full transition-all duration-300 dark:hover:text-zinc-100 ${isDark
                                ? 'bg-black/5 ring-1 ring-zinc-800' : 'bg-zinc-200 dark:bg-zinc-900 ring-1 ring-zinc-300'}`}   >
                            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 flex items-center justify-center ${isDark ? 'left-12' : 'left-1'}`}   >
                                <div className="relative w-4 h-4">
                                    <Sun className={`absolute inset-0 w-4 h-4 text-yellow-500 transition-all duration-300 ${isDark
                                        ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
                                    <Moon className={`absolute inset-0 w-4 h-4 text-indigo-900 transition-all duration-300 ${isDark
                                        ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
                                </div>
                            </div>
                        </button>

                        <button className="lg:hidden ml-1 rounded-md transition-all duration-200 hover:scale-110 hover:bg-zinc-300 hover:dark:bg-zinc-900 p-1 text-zinc-500 hover:text-zinc-700 hover:dark:text-zinc-200" aria-label="Menu" onClick={handleToggleModalSidebar}>
                            <Logs size={20} strokeWidth={1} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal Sidebar siempre presente con transición */}
            <div className={`fixed inset-0 z-50 bg-zinc-300/40 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isModalSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} `}
                onClick={handleOverlayClick}  >
                <div className={`fixed top-0 left-0 h-full min-h-screen flex flex-col bg-zinc-100 dark:bg-zinc-900/95 backdrop-blur-md border-r border-zinc-300 dark:border-zinc-700/50 w-68 transform transition-transform duration-300 ease-in-out ${isModalSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    
                    {/* Header del sidebar */}
                    <div className="flex-shrink-0 p-4 pt-6">
                        <div className="w-full items-center mb-4 flex cursor-pointer">
                            <img src={logo}  alt="Logo" className="w-10 h-10 object-contain" />
                            <h1 className={`transition-all duration-300 ease-in-out whitespace-nowrap pl-2 bg-gradient-to-br from-gray-600 to-gray-900 bg-clip-text font-bold tracking-tight text-transparent dark:from-white dark:to-zinc-500 text-3xl origin-left`}>
                                LOGISTICO
                            </h1>
                            <button className="ml-4 mt-1 rounded-md transition-all duration-200 hover:scale-110 hover:bg-red-600 p-1 text-zinc-500 hover:text-zinc-100" aria-label="Cerrar" onClick={() => setIsModalSidebarOpen(!isModalSidebarOpen)}>
                                <CircleX size={20} strokeWidth={2} />
                            </button>
                        </div>
                    </div>

                    {/* Contenido scrolleable del menu */}
                    <div className="flex-1 flex flex-col justify-between px-4 pb-4 overflow-y-auto">
                        <div className="flex-1">
                            <ul className="space-y-2">
                                <li className="h-10 relative flex items-center justify-center rounded-md cursor-pointer hover:text-zinc-600 hover:dark:text-white text-zinc-400 hover:bg-zinc-300 hover:dark:bg-zinc-800 transition-all ease-in-out duration-500 group">
                                    <div className="w-10 h-full flex justify-center items-center">
                                        <MessageCirclePlus size={28} strokeWidth={1} />
                                    </div>
                                    <div className="relative flex-1">
                                        <p className={`absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out whitespace-nowrap `}>
                                            Nuevo chat
                                        </p>
                                    </div>
                                </li>

                                <li className="h-10 relative flex items-center justify-center rounded-md cursor-pointer hover:text-zinc-600 hover:dark:text-white text-zinc-400 hover:bg-zinc-300 hover:dark:bg-zinc-800 transition-all ease-in-out duration-500 group">
                                    <div className="w-10 h-full flex justify-center items-center">
                                        <Search size={28} strokeWidth={1} />
                                    </div>
                                    <div className="relative flex-1">
                                        <p className={`absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out whitespace-nowrap `}>
                                            Buscar chat
                                        </p>
                                    </div>
                                </li>

                                <li className="h-10 relative flex items-center justify-center rounded-md cursor-pointer hover:text-zinc-600 hover:dark:text-white text-zinc-400 hover:bg-zinc-300 hover:dark:bg-zinc-800 transition-all ease-in-out duration-500 group">
                                    <div className="w-10 h-full flex justify-center items-center">
                                        <MessagesSquare size={28} strokeWidth={1} />
                                    </div>
                                    <div className="relative flex-1">
                                        <p className={`absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out whitespace-nowrap `}>
                                            Mis chats
                                        </p>
                                    </div>
                                </li>

                                <li className="h-10 relative flex items-center justify-center rounded-md cursor-pointer hover:text-zinc-600 hover:dark:text-white text-zinc-400 hover:bg-zinc-300 hover:dark:bg-zinc-800 transition-all ease-in-out duration-500 group">
                                    <div className="w-10 h-full flex justify-center items-center">
                                        <FileChartPie size={28} strokeWidth={1} />
                                    </div>
                                    <div className="relative flex-1">
                                        <p className={`absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out whitespace-nowrap `}>
                                            Informes
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Footer del sidebar */}
                        <div className="flex-shrink-0">
                            <ul className="space-y-4">
                                <hr className="text-zinc-400 dark:text-zinc-800 mb-4" />
                                
                                <li className="h-14 relative flex items-center rounded-md cursor-pointer hover:bg-zinc-300 hover:dark:bg-zinc-800 text-zinc-500 hover:text-zinc-700 hover:dark:text-white dark:text-zinc-400 transition-all ease-in-out duration-500 group">
                                    <div className="w-8 h-8 mx-1 rounded-full overflow-hidden flex justify-center items-center bg-blue-900">
                                        <img src={user} alt="Perfil" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="relative flex-1 ml-2">
                                        <p className={`absolute flex flex-col left-0 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out whitespace-nowrap`}>
                                            <span className="text-base font-semibold leading-tight">
                                                Alejandro Galeano
                                            </span>
                                            <span className="text-sm leading-tight">
                                                alejog@gmail.com
                                            </span>
                                        </p>
                                    </div>
                                </li>

                                <li className="h-10 relative flex items-center justify-center rounded-md cursor-pointer hover:text-zinc-600 hover:dark:text-white text-zinc-400 hover:bg-zinc-300 hover:dark:bg-zinc-800 transition-all ease-in-out duration-500 group">
                                    <div className="w-10 h-full flex justify-center items-center">
                                        <LogOut size={28} strokeWidth={1} />
                                    </div>
                                    <div className="relative flex-1">
                                        <p className={`absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out whitespace-nowrap `}>
                                            Cerrar sesión
                                        </p>
                                    </div>
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