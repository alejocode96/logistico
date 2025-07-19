// React
import React, { useState } from "react";

// Navegación
import { NavLink } from 'react-router-dom';

// Contexto
import { LogisticoContext } from '../../Context';

//iconos 
import {
    ChevronsRight,
    ChevronsLeft,
    MessageCirclePlus,
    Search,
    MessagesSquare,
    FileChartPie,
    Moon, User, LogOut
} from 'lucide-react';
import logo from '../../../public/logo.png'
import user from '../../../public/user_men.png'
function SideBarChart() {

    const { isDark, toggleDarkMode, isOpenSideBar, toggleSidebar, setIsOpenSideBar } = React.useContext(LogisticoContext);

    return (
        <>
            <div className={`z-10 h-screen hidden lg:flex flex-col bg-zinc-100 dark:bg-[#101014] pt-4 relative ${isOpenSideBar ? 'w-62 p-4' : 'w-18 p-4'} transition-all duration-300 ease-in-out ring-1 ring-zinc-200 dark:ring-zinc-900`}>

                {/* boton sidebar */}

                <button className="cursor-pointer absolute top-12 -right-3 z-50 flex justify-center items-center w-[1.6rem] h-[1.6rem] rounded-md bg-zinc-200 dark:bg-zinc-900/90 text-zinc-400 dark:text-zinc-500 duration-300 ease-in-out hover:text-zinc-600 hover:dark:text-zinc-100 before:absolute before:inset-0 before:w-full before:h-full before:bg-transparent before:cursor-pointer"
                    onClick={() => setIsOpenSideBar(!isOpenSideBar)}  >

                    {isOpenSideBar ? (
                        <ChevronsLeft className="pointer-events-none" size={25} />
                    ) : (
                        <ChevronsRight className="pointer-events-none" size={25} />
                    )}
                </button>




                {/* logo sidebar */}
                <div className="w-[100%] items-center  mb-4 flex select-none ">
                    <img src={logo} alt="Logo" className="w-12 h-12 object-contain cursor-pointer" />
                    <h1 className={` transition-all duration-300 ease-in-out whitespace-nowrap pl-2 bg-gradient-to-br from-gray-600 to-gray-900 bg-clip-text font-bold tracking-tight text-transparent dark:from-white dark:to-zinc-500 text-3xl origin-left  ${isOpenSideBar ? "opacity-100" : "opacity-0"}`}>
                        LOGISTICO
                    </h1>
                </div>

                {/* menu */}
                <div className="flex flex-col justify-between flex-1 mt-4 z-40">
                    <ul className="space-y-2">
                        <li className=" h-10 relative flex items-center justify-center rounded-md cursor-pointer hover:text-zinc-600 hover:dark:text-white text-zinc-400 hover:bg-zinc-300 hover:dark:bg-zinc-800 transition-all ease-in-out duration-500 group">
                            <div className="w-10 h-full flex justify-center items-center">
                                <MessageCirclePlus size={28} strokeWidth={1} />
                            </div>
                            {/* Texto */}
                            <div className="relative flex-1">
                                <p className={`absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out whitespace-nowrap ${isOpenSideBar ? "opacity-100 pl-2" : "opacity-0"}`}>
                                    Nuevo chat
                                </p>
                            </div>
                            {/* Tooltip - solo aparece cuando sidebar está cerrado */}
                            {!isOpenSideBar && (
                                <div className="absolute left-full ml-2 px-2 py-1 bg-zinc-300 dark:bg-zinc-800 text-zinc-600 dark:text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                    Nuevo chat
                                </div>
                            )}
                        </li>

                        <li className=" h-10 relative flex items-center justify-center rounded-md cursor-pointer hover:text-zinc-600 hover:dark:text-white text-zinc-400 hover:bg-zinc-300 hover:dark:bg-zinc-800 transition-all ease-in-out duration-500 group">
                            <div className="w-10 h-full flex justify-center items-center">
                                <Search size={28} strokeWidth={1} />
                            </div>
                            {/* Texto */}
                            <div className="relative flex-1">
                                <p className={`absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out whitespace-nowrap ${isOpenSideBar ? "opacity-100 pl-2" : "opacity-0"}`}>
                                    Buscar chat
                                </p>
                            </div>
                            {/* Tooltip - solo aparece cuando sidebar está cerrado */}
                            {!isOpenSideBar && (
                                <div className="absolute left-full ml-2 px-2 py-1 bg-zinc-300 dark:bg-zinc-800 text-zinc-600 dark:text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                    Buscar chat
                                </div>
                            )}
                        </li>

                        <li className=" h-10 relative flex items-center justify-center rounded-md cursor-pointer hover:text-zinc-600 hover:dark:text-white text-zinc-400 hover:bg-zinc-300 hover:dark:bg-zinc-800 transition-all ease-in-out duration-500 group">
                            <div className="w-10 h-full flex justify-center items-center">
                                <MessagesSquare size={28} strokeWidth={1} />
                            </div>
                            {/* Texto */}
                            <div className="relative flex-1">
                                <p className={`absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out whitespace-nowrap ${isOpenSideBar ? "opacity-100 pl-2" : "opacity-0"}`}>
                                    Mis chats
                                </p>
                            </div>
                            {/* Tooltip - solo aparece cuando sidebar está cerrado */}
                            {!isOpenSideBar && (
                                <div className="absolute left-full ml-2 px-2 py-1 bg-zinc-300 dark:bg-zinc-800 text-zinc-600 dark:text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                    Mis chats
                                </div>
                            )}
                        </li>

                        <li className=" h-10 relative flex items-center justify-center rounded-md cursor-pointer hover:text-zinc-600 hover:dark:text-white text-zinc-400 hover:bg-zinc-300 hover:dark:bg-zinc-800 transition-all ease-in-out duration-500 group">
                            <div className="w-10 h-full flex justify-center items-center">
                                <FileChartPie size={28} strokeWidth={1} />
                            </div>
                            {/* Texto */}
                            <div className="relative flex-1">
                                <p className={`absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out whitespace-nowrap ${isOpenSideBar ? "opacity-100 pl-2" : "opacity-0"}`}>
                                    Informes
                                </p>
                            </div>
                            {/* Tooltip - solo aparece cuando sidebar está cerrado */}
                            {!isOpenSideBar && (
                                <div className="absolute left-full ml-2 px-2 py-1 bg-zinc-300 dark:bg-zinc-800 text-zinc-600 dark:text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                    Informes
                                </div>
                            )}
                        </li>
                    </ul>

                    <ul className="space-y-2">
                        <hr className="text-zinc-300 dark:text-zinc-800 mb-4"></hr>
                        <li className=" h-14 relative flex items-center rounded-md cursor-pointer hover:bg-zinc-300 hover:dark:bg-zinc-800 text-zinc-500 hover:text-zinc-700 hover:dark:text-white  dark:text-zinc-400 transition-all ease-in-out duration-500 group " >
                            <div className="w-10 h-10 mx-1 rounded-full overflow-hidden flex justify-center items-center bg-blue-900">
                                <img src={user} alt="Perfil" className="w-full h-full object-cover" />
                            </div>

                            {/* Texto */}
                            <div className="relative flex-1 ">
                                <p className={`  absolute flex flex-col left-0 top-1/2 -translate-y-1/2  transition-all duration-300 ease-in-out whitespace-nowrap   ${isOpenSideBar ? "opacity-100 pl-2 py-2" : "opacity-0"}  `}  >
                                    <span className="text-base font-semibold leading-tight">
                                        Alejandro Galeano
                                    </span>
                                    <span className="text-sm leading-tight">
                                        alejog@gmail.com
                                    </span>
                                </p>
                            </div>

                            {/* Tooltip */}
                            {!isOpenSideBar && (
                                <div className=" absolute left-full ml-2 px-2 py-1 bg-zinc-300 dark:bg-zinc-800 text-zinc-600 dark:text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200  pointer-events-none whitespace-nowrap z-50  ">
                                    Mi perfil
                                </div>
                            )}
                        </li>





                        <li className=" h-10 relative flex items-center justify-center rounded-md cursor-pointer hover:text-zinc-600 hover:dark:text-white text-zinc-400 hover:bg-zinc-300 hover:dark:bg-zinc-800 transition-all ease-in-out duration-500 group">
                            <div className="w-10 h-full flex justify-center items-center">
                                <LogOut size={28} strokeWidth={1} />
                            </div>
                            {/* Texto */}
                            <div className="relative flex-1">
                                <p className={`absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out whitespace-nowrap ${isOpenSideBar ? "opacity-100 pl-2" : "opacity-0"}`}>
                                    Cerrar sesión
                                </p>
                            </div>
                            {/* Tooltip - solo aparece cuando sidebar está cerrado */}
                            {!isOpenSideBar && (
                                <div className="absolute left-full ml-2 px-2 py-1 bg-zinc-300 dark:bg-zinc-800 text-zinc-600 dark:text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                    Cerrar sesión
                                </div>
                            )}
                        </li>


                    </ul>
                </div>
            </div>
        </>
    );
}

export default SideBarChart;