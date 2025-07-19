// React
import React from 'react';

// Navegación
import { NavLink } from 'react-router-dom';

// Contexto
import { LogisticoContext } from '../../Context';

//imagenes
import logo from '../../../public/logo.png'
// Iconos
import { Sun, Moon } from 'lucide-react';

function Header() {

    const { isDark, toggleDarkMode } = React.useContext(LogisticoContext);

    return (
        <header className={`relative ${isDark ? '' : ''}  z-20`}>
            <nav className="z-10 relative flex justify-between items-center pt-4 w-[90%] mx-auto">

                {/* Logo y Título */}
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="w-10 mr-2 " />
                    <span className='text-3xl font-bold text-gray-800 dark:text-gray-300'>LOGISTICO<span className="text-gray-500 dark:text-gray-400">.AI</span></span>

                </div>

                {/* Botones */}
                <div className="flex items-center space-x-4 text-sm font-medium text-zinc-300 sm:space-x-6">
                    {/* Botón de inicio de sesión */}

                    <button className="hidden lg:block group relative rounded-full p-px text-sm/6 text-zinc-400 duration-300 dark:hover:text-zinc-100 hover:text-zinc-600 shadow-glow">
                        <span className="absolute inset-0 overflow-hidden rounded-full"><span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span></span>
                        <NavLink to='/login'>
                            <div className="relative  rounded-full bg-white/80 dark:bg-black bg-opacity-20 backdrop-blur-xl px-4 py-1.5 ring-1 ring-white/10 ">
                                Iniciar sesión
                            </div>
                        </NavLink>

                        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-cyan-400/0 via-cyan-400/90 to-cyan-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
                    </button>

                    {/* Botón de modo oscuro */}
                    <button onClick={toggleDarkMode}
                        className={`relative w-20 h-[35px] rounded-full transition-all duration-300  dark:hover:text-zinc-100 shadow-glow ${isDark
                            ? 'bg-black shadow-lg shadow-gray-500/30 ring-1 ring-white/10'
                            : 'bg-white/80 dark:bg-gray-600'
                            }`}>
                        {/* Círculo deslizante */}
                        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 flex items-center justify-center ${isDark ? 'left-12' : 'left-1'}`}>
                            {/* Iconos con transición */}
                            <div className="relative w-4 h-4">
                                <Sun className={`absolute inset-0 w-4 h-4 text-yellow-500 transition-all duration-300 ${isDark
                                    ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
                                <Moon className={`absolute inset-0 w-4 h-4 text-indigo-900 transition-all duration-300 ${isDark
                                    ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}
                                />
                            </div>
                        </div>
                    </button>

                </div>
            </nav>

            <div className=" relative w-full h-[600px] flex items-center justify-center text-center pt-4" data-aos="fade-up">
                <div className='w-[90%] max-w-6xl flex flex-col items-center'>
                    <div className=''>
                        <h1 className='text-6xl  md:text-7xl lg:text-8xl font-black text-gray-800 leading-none mb-2 float-animation'>
                            <span className='bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent dark:from-white dark:to-zinc-500'>LOGISTICO CHATBOT</span>
                        </h1>
                        <p className='w-[80%] mx-auto text-gray-700 dark:text-zinc-400 text-justify'>
                            Deja atrás la complejidad en la gestión logística. Ahora, cualquier miembro de tu organización puede acceder a información precisa y actualizada sobre tus procesos logísticos en segundos. Eficiente. Confiable. Diseñado para tomar decisiones inteligentes.
                        </p>
                    </div>
                    <div className=" pt-6 flex flex-1 items-center justify-end space-x-4 text-sm font-medium text-zinc-300 transition hover:text-zinc-100  sm:space-x-6">
                        {/* Botón de inicio de sesión */}

                        <button className="block lg:hidden group relative rounded-full p-px text-sm/6 shadow-glow text-zinc-500 duration-300 hover:text-zinc-800 dark:hover:text-zinc-100 hover:shadow-glow">
                            <span className="absolute inset-0 overflow-hidden rounded-full"><span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span></span>
                            <NavLink to='/login'>
                                <div className="relative  rounded-full bg-zinc-200 dark:bg-black bg-opacity-20 backdrop-blur-xl px-4 py-1.5 ring-1 ring-zinc-300 dark:ring-white/10">
                                    Iniciar sesión
                                </div>
                            </NavLink>

                            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-cyan-400/0 via-cyan-400/90 to-cyan-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
                        </button>
                    </div>
                    <div className='group pt-16 '>
                        <a className='flex flex-col items-center gap-1' href='#Section_WhoIsLogistico'>
                            <p className='text-sm/6 text-zinc-400 duration-300 group-hover:text-zinc-700 dark:group-hover:text-zinc-100'>Obtener más información</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-down text-zinc-400 duration-300 group-hover:translate-y-1.5 group-hover:text-zinc-700 dark:group-hover:text-zinc-100">
                                <path d="M12 5v14" />
                                <path d="m19 12-7 7-7-7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
