import React, { useState, useEffect } from 'react';



function ChatModel() {

    const questions = [
        "¿Cuál fue el tiempo promedio de permanencia en la región planta XX?",
        "¿Cuáles son las regiones con el promedio de tiempo de permanencia más alto durante el mes de enero en la zona norte?",
        "¿Top 10 de las regiones con el promedio de tiempo de permanencia mas alto durante el mes de marzo de 2025?",
        "¿Cuáles vehículos estuvieron más de 5 horas en la zona norte para la operación ensacado?",
        "¿Cuál es el vehículo con el tiempo de permanencia mas alto entre el 01/02/2025 y el 07/02/2025 y en qué región fue ?"
    ];
    // Estado para el texto que se está mostrando actualmente
    const [currentText, setCurrentText] = useState('');
    // Índice de la pregunta actual en el array
    const [questionIndex, setQuestionIndex] = useState(0);
    // Estado que indica si estamos borrando el texto
    const [isDeleting, setIsDeleting] = useState(false);
    // Índice de caracter actual (cuántas letras mostrar o borrar)
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        // Pregunta actual basada en el índice
        const currentQuestion = questions[questionIndex];
        // Velocidad de escritura/borrado
        let typingSpeed = isDeleting ? 50 : 100;

        const timeout = setTimeout(() => {
            if (isDeleting) {
                // Si estamos borrando, quitar una letra
                setCurrentText(currentQuestion.substring(0, charIndex - 1));
                setCharIndex((prev) => prev - 1);
            } else {
                // Si estamos escribiendo, agregar una letra
                setCurrentText(currentQuestion.substring(0, charIndex + 1));
                setCharIndex((prev) => prev + 1);
            }

            // Si terminamos de escribir, esperar 2 segundos antes de borrar
            if (!isDeleting && charIndex === currentQuestion.length) {
                setTimeout(() => setIsDeleting(true), 2000);
            }
            // Si terminamos de borrar, pasar a la siguiente pregunta
            else if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setQuestionIndex((prev) => (prev + 1) % questions.length); // Volver al inicio si se termina el array
            }
        }, typingSpeed);

        // Limpiar el timeout para evitar bugs o múltiples ejecuciones
        return () => clearTimeout(timeout);

    }, [charIndex, isDeleting, questionIndex]);



    return (
        <>

            <div className="absolute  right-6 h-2 w-20 [mask-image:linear-gradient(to_right,rgba(217,217,217,0)_0%,#d9d9d9_25%,#d9d9d9_75%,rgba(217,217,217,0)_100%)] md:w-32 lg:w-64">
                <div className="h-px w-full animate-starlight-right  bg-gradient-to-r from-zinc-800/0 via-zinc-800 to-zinc-800/0 dark:from-cyan-400/0 dark:via-cyan-400 dark:to-cyan-400/0">
                </div>
            </div>
            <div className='relative flex h-full w-full transform-gpu items-center justify-center overflow-hidden'>
                <div className='absolute inset-0 h-full w-full [mask:radial-gradient(50%_50%_at_50%,rgba(0,0,0,0.7)_35%,rgba(0,0,0,0)_100%)]'>
                    <div className='absolute inset-0 -z-10 h-full w-full text-zinc-200 dark:text-zinc-800 [mask:linear-gradient(black,black_60%,transparent)]'>
                        <svg className="h-full w-full" aria-hidden="true">
                            <defs>
                                <pattern id="genius-pattern" width="44" height="44" x="50%" y="100%" patternUnits="userSpaceOnUse">
                                    <path d="M.5 200V.5H200" fill="none" stroke="currentColor"></path>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" strokeWidth="0" fill="url(#genius-pattern)">
                            </rect>
                        </svg>
                    </div>
                </div>
                <div className='relative flex h-full w-full flex-col items-center justify-end px-4 pb-12 sm:px-8 lg:pb-16'>

                    <div className="rounded-xl bg-cyan-400/10 p-2 mt-14">
                        <div className="select-none rounded-md bg-cyan-600 px-3 py-2 text-sm font-medium text-zinc-200 shadow-[inset_0px_1px_1px_theme(colors.white/30%),0px_1px_3px_theme(colors.cyan.500/35%),0px_0px_0px_1px_theme(colors.cyan.500)] text-center">
                            Hola! Soy LOGISTICO en que puedo ayudarte?
                        </div>
                    </div>
                    <div className='h-auto mt-10 flex w-full items-center justify-between rounded-md bg-zinc-200 dark:bg-zinc-900 px-3 py-2 shadow-md ring-1 ring-zinc-300 dark:ring-zinc-200/10'>
                        <div className='items-center  text-sm text-zinc-800 dark:text-zinc-400 flex'>✨
                            <div className=''>
                                <p className='pl-2'>
                                    {currentText}
                                    <span className="blinking-cursor">|</span>
                                </p>
                            </div>
                        </div>

                        <button className="relative inline-flex shrink-0 text-sm font-medium text-zinc-600 dark:text-zinc-200">
                            <span className="z-10 inline-flex h-full w-full items-center justify-center rounded-md bg-zinc-200 dark:bg-zinc-950 px-3 py-1.5 ring-1 ring-zinc-400/10 transition hover:ring-zinc-400/40 max-md:hidden">
                                Enviar
                            </span>

                            {/* Icono Mobile */}
                            <span className="z-10 inline-flex h-full w-full items-center justify-center rounded-md bg-zinc-200 dark:bg-zinc-950 px-2 py-1.5 ring-1 ring-zinc-400/10 transition hover:ring-zinc-400/40 md:hidden">
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"   fill="none"  stroke="currentColor" strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" className="lucide lucide-chevron-right"  >
                                    <path d="m9 18 6-6-6-6"></path>
                                </svg>
                            </span>

                            {/* Fondo animado */}
                            <span
                                className="absolute h-full w-full blur-[1rem] motion-safe:animate-pulse"
                                style={{ background: `linear-gradient(  90deg,  rgba(255,214,0,0.2) 0%,  rgba(255,46,0,0.3) 10%, rgba(219,0,255,0.5) 25%,  rgb(97,0,255) 45%,  rgb(0,255,117) 65%,  rgb(0,255,255) 80%,  rgba(20,0,255,0.3) 100%  )`  }}
                            />
                        </button>

                    </div>

                </div>
            </div>
            <div className='mt-auto w-full space-y-4 px-4 pb-4 sm:px-8 sm:pb-8'>
                <h3 className='text-lg/none font-medium text-zinc-700 dark:text-zinc-200 uppercase'>
                    Algunos ejemplos de buenas preguntas
                </h3>
                <p className=" text-sm text-zinc-600 dark:text-zinc-400/80">
                    &bull; "¿Cuál fue el tiempo promedio de permanencia en la región planta XX?"
                </p>
                <p className=" text-sm text-zinc-600 dark:text-zinc-400/80">
                    &bull; "¿Cuáles son las regiones con el promedio de tiempo de permanencia más alto durante el mes de enero en la zona norte?"
                </p>
                <p className=" text-sm text-zinc-600 dark:text-zinc-400/80">
                    &bull; "¿Top 10 de las regiones con el promedio de tiempo de permanencia mas alto durante el mes de marzo de 2025?"
                </p>
                <p className=" text-sm text-zinc-600 dark:text-zinc-400/80">
                    &bull; "¿Cuáles vehículos estuvieron más de 5 horas en la zona norte para la operación ensacado?"
                </p>
                <p className=" text-sm text-zinc-600 dark:text-zinc-400/80">
                    &bull; "¿Cuál es el vehículo con el tiempo de permanencia mas alto entre el 01/02/2025 y el 07/02/2025 y en qué región fue ?"
                </p>
            </div>
            <div className="absolute bottom-[-7px] lg:bottom-[-7px] left-20 h-2 w-20 [mask-image:linear-gradient(to_right,rgba(217,217,217,0)_0%,#d9d9d9_25%,#d9d9d9_75%,rgba(217,217,217,0)_100%)] md:w-32 lg:w-64">
                <div className="h-px w-full animate-starlight-left bg-gradient-to-r from-zinc-800/0 via-zinc-800 to-zinc-800/0 dark:from-cyan-400/0 dark:via-cyan-400 dark:to-cyan-400/0">
                </div>
            </div>

        </>
    )
}

export default ChatModel
