import React from 'react';


//componentes
import Header from '../../Components/Home/header';
import WhoIsLogistico from '../../Components/Home/whoIsLogistico';
import ToDoLogistico from '../../Components/Home/toDoLogistico';
import HowToAsk from '../../Components/Home/howToAsk';

function Home() {

    return (
        <>

            <main className='bg-white dark:bg-[#09090B] w-full'>
                {/* Header */}
                <Header />

                {/* fondo azul */}
                <div className="h-[200%] absolute inset-0 z-10 bg-[image:radial-gradient(80%_50%_at_50%_-20%,hsl(206,81.9%,65.3%,0.5),rgba(255,255,255,0))]"></div>
                {/* svg a cuadros */}
                <svg className="absolute inset-0 z-10 h-[200%] w-full text-zinc-900/15 dark:text-white/10 
                            [mask-image:radial-gradient(90%_50%_at_top_center,white,transparent)]"
                    width="100%" height="100%" aria-hidden="true">

                    <defs>
                        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>

                        <pattern id="highlightGrid" width="560" height="480" patternUnits="userSpaceOnUse">

                            <rect x="160" y="80" width="80" height="80" fill="rgba(100,100,100,0.2)" />
                            <rect x="400" y="240" width="80" height="80" fill="rgba(100,100,100,0.15)" />
                            <rect x="80" y="320" width="80" height="80" fill="rgba(100,100,100,0.1)" />
                            <rect x="320" y="160" width="80" height="80" fill="rgba(100,100,100,0.12)" />
                            <rect x="480" y="0" width="80" height="80" fill="rgba(100,100,100,0.14)" />
                            <rect x="0" y="240" width="80" height="80" fill="rgba(100,100,100,0.11)" />
                            <rect x="240" y="400" width="80" height="80" fill="rgba(100,100,100,0.13)" />
                        </pattern>

                        <radialGradient id="fade" cx="50%" cy="0%" r="75%">
                            <stop offset="0%" stopColor="white" stopOpacity="1" />
                            <stop offset="100%" stopColor="white" stopOpacity="0" />
                        </radialGradient>

                        <mask id="fadeMask">
                            <rect width="100%" height="100%" fill="url(#fade)" />
                        </mask>
                    </defs>

                    <rect width="100%" height="100%" fill="url(#highlightGrid)" mask="url(#fadeMask)" opacity="0.6" className="animate-pulse" />

                    <rect width="100%" height="100%" fill="url(#grid)" mask="url(#fadeMask)" />
                </svg>


                {/* Conece a logistico */}
                <WhoIsLogistico />

                {/* lo que puedes hacer con  logistico */}
                <ToDoLogistico />


                <HowToAsk />
            </main>
            {/* footer */}
            <footer className="w-full isolate mx-auto max-w-7xl p-6 pb-12 pt-16 lg:px-8 " data-aos="fade-up">
                <div className="border-t border-zinc-300 dark:border-white/10 pt-4 md:flex md:items-center md:justify-between">
                    {/* <div className="flex justify-center space-x-6 md:order-2">
                        <a target="_blank" rel="noopener noreferrer" aria-label="Follow on X (formerly Twitter)" className="group flex h-6 w-6 items-center justify-center text-zinc-700  dark:text-zinc-400 transition dark:hover:text-zinc-300 hover:text-zinc-900" href="https://twitter.com/joincobalt">
                            <svg fill="currentColor" viewBox="0 0 24 24" aria-label="Twitter" className="hidden h-5 w-5 group-hover:block" aria-hidden="true">
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84">
                                </path>
                            </svg>
                            <svg fill="currentColor" viewBox="0 0 16 16" aria-label="X" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 group-hover:hidden" aria-hidden="true">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.5 0.5H5.75L9.48421 5.71053L14 0.5H16L10.3895 6.97368L16.5 15.5H11.25L7.51579 10.2895L3 15.5H1L6.61053 9.02632L0.5 0.5ZM12.0204 14L3.42043 2H4.97957L13.5796 14H12.0204Z">
                                </path>
                            </svg>
                        </a>
                        <a target="_blank" rel="noopener noreferrer" aria-label="Follow on LinkedIn" className="group flex h-6 w-6 items-center justify-center text-zinc-700  dark:text-zinc-400  transition-colors dark:hover:text-zinc-300 hover:text-zinc-900" href="https://www.linkedin.com/company/cobaltfinancial">
                            <svg fill="currentColor" viewBox="0 0 24 24" aria-label="LinkedIn" className="h-5 w-5" aria-hidden="true">
                                <path d="M21 1.5H3c-.83 0-1.5.68-1.5 1.51V21c0 .83.67 1.51 1.5 1.51h18c.82 0 1.5-.68 1.5-1.51V3c0-.83-.68-1.51-1.5-1.51Zm-13.15 18H4.73V9.48h3.12V19.5ZM6.29 8.1a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6Zm13.22 11.4h-3.1v-4.88c0-1.16-.03-2.65-1.63-2.65-1.62 0-1.87 1.26-1.87 2.57v4.96h-3.1V9.48h2.98v1.37h.04a3.28 3.28 0 0 1 2.95-1.62c3.15 0 3.73 2.08 3.73 4.78v5.49Z">
                                </path>
                            </svg>
                        </a>
                        <a target="_blank" rel="noopener noreferrer" aria-label="Follow on Facebook" className="group flex h-6 w-6 items-center justify-center text-zinc-700  dark:text-zinc-400  transition-colors dark:hover:text-zinc-300 hover:text-zinc-900" href="https://www.facebook.com/joincobalt">
                            <svg fill="currentColor" viewBox="0 0 24 24" aria-label="Facebook" className="h-5 w-5" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd">
                            </path>
                            </svg>
                        </a>
                    </div> */}
                    <div className="mt-8 flex items-center gap-4 text-xs font-medium leading-5 text-zinc-700 dark:text-zinc-400 max-md:flex-col md:order-1 md:mt-0">
                        <div className="order-2 md:order-1">
                            <p className="">© 2025 by Alejandro Galeano Madrigal.</p>
                        </div>
                        <div className="order-1 flex gap-4 md:order-2">
                            <a className="transition-colors duration-200 dark:hover:text-zinc-300 hover:text-zinc-900" href="/legal/privacy">Privacy Policy</a>
                            <a className="transition-colors duration-200 dark:hover:text-zinc-300 hover:text-zinc-900" href="/legal/terms">Terms of Use</a>
                        </div>
                    </div>
                </div>
                <div className="mt-4 w-full text-xs leading-5 dark:text-zinc-500 text-zinc-600 max-md:text-center md:max-w-[60%]">
                    <p>Logitico es una marca no comercial. Cualquier otra marca mencionada pertenece a sus respectivos propietarios. Salvo que se indique lo contrario, el uso de logotipos de terceros no implica respaldo, patrocinio ni afiliación con Logistico.</p>
                    <p className="mt-2">Logitico es un asistente conversacional especializado en logística, y no una empresa dedicada al transporte. Ciertas funcionalidades pueden estar integradas con servicios de terceros autorizados, según los requerimientos del usuario.</p>
                </div>
            </footer>

        </>
    )
}

export default Home