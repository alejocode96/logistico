import { useState } from 'react'
import React from 'react'

//contexto
import { LogisticoContext } from '../../Context';

//navegacion
import { NavLink } from 'react-router-dom'

import { Rocket, TextCursorInput, TimerReset, ShieldAlert } from "lucide-react";
import { useId } from "react";

//components
import ChatModel from './chatModel';


export const Grid = ({ pattern, size }) => {
    const p =
        pattern ??
        Array.from({ length: 5 }, () => [
            Math.floor(Math.random() * 4) + 7,
            Math.floor(Math.random() * 6) + 1,
        ]);

    return (
        <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 w-full h-[40%] [mask-image:linear-gradient(white,transparent)]">
            <div className="absolute inset-0 bg-gradient-to-b [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
                <GridPattern
                    width={size ?? 20}
                    height={size ?? 20}
                    x="-12"
                    y="4"
                    squares={p}
                    className="absolute inset-0 h-full w-full mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
                />
            </div>
        </div>
    );
};

export function GridPattern({ width, height, x, y, squares, ...props }) {
    const patternId = useId();

    return (
        <svg aria-hidden="true" {...props}>
            <defs>
                <pattern
                    id={patternId}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                >
                    <path d={`M.5 ${height}V.5H${width}`} fill="none" />
                </pattern>
            </defs>
            <rect
                width="100%"
                height="100%"
                strokeWidth={0}
                fill={`url(#${patternId})`}
            />
            {squares && (
                <svg x={x} y={y} className="overflow-visible">
                    {squares.map(([sx, sy], idx) => (
                        <rect
                            key={`${sx}-${sy}-${idx}`}
                            x={sx * width}
                            y={sy * height}
                            width={width + 1}
                            height={height + 1}
                            strokeWidth="0"
                        />
                    ))}

                </svg>
            )}
        </svg>
    );
}


function HowToAsk() {

    //preguntas dinamicas

    const {
        currentText, isDark
    } = React.useContext(LogisticoContext);


    return (
        <>

            <section className='pt-16 pb-16 w-[90%] mx-auto'>
                {/* titulo */}
                <div className='lg:flex items-center justify-between' data-aos="fade-up">
                    <div className='flex lg:flex-1 w-full lg:w-1/2'>

                        <div className="font-bold text-5xl/[1.07] md:text-7xl/[1.07] tracking-tight">
                            <span className="pr-4 bg-clip-text  bg-gradient-to-br from-gray-600 to-gray-900 text-transparent dark:from-white dark:to-zinc-500">
                                COMO REALIZAR PREGUNTAS
                                <br />EN LOGISTICO</span>
                        </div>
                    </div>
                    <div className='w-full lg:w-1/2 pr-4 pl-0 lg:pl-16 pt-8 lg:pt-0'>
                        <p className='text-justify text-zinc-600  dark:text-zinc-400 pb-4'><span className='font-semibold'>Puedes hacerme todo tipo de preguntas relacionadas con los tiempos logísticos,
                            ya sea sobre vehículos, regiones, zonas, operaciones u otros aspectos del sistema.</span> Sin embargo, para que la respuesta que recibas sea
                            precisa, clara y verdaderamente útil, es fundamental que formules tu pregunta de manera adecuada.Utilizar los términos correctos y ser específico en lo que deseas consultar le permitirá al sistema comprender
                            con mayor exactitud tu intención, y así generar una respuesta ajustada a tus necesidades.
                        </p>
                        <p className='text-justify text-zinc-600  dark:text-zinc-400 pb-4'></p>
                        <p className='text-justify text-zinc-600 pb-4 dark:text-zinc-400'>A continuación, encontrarás algunas pautas y ejemplos prácticos que te ayudarán a formular mejores preguntas y a obtener
                            resultados más relevantes.</p>
                    </div>
                </div>

                {/* cards */}
                <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8 lg:pt-14'>
                    {/* card 1 */}
                    <div className="h-auto lg:h-full relative bg-gradient-to-b from-white to-white dark:to-zinc-900 dark:from-zinc-900 p-6 rounded-3xl overflow-hidden shadow-[0_0_5px_0_rgba(0,0,0,0.1),_0_0_1px_0_rgba(0,0,0,0.1)] dark:shadow-[0_0_5px_0_rgba(255,255,255,0.06),_0_0_1px_0_rgba(255,255,255,0.04)] mt-2 lg:mt-14" data-aos="fade-up">

                        {/* Fondo de líneas */}
                        <Grid size={20} />

                        {/* Contenido de la card */}
                        <div className="space-y-4 mt-auto  px-4 pb-8 w-full text-left">

                            {/* Ícono arriba */}
                            <div className='pt-4'>
                                <TextCursorInput className="w-10 h-10 text-gray-700 dark:text-gray-400" strokeWidth={0.5} />
                            </div>

                            <div className='pt-6 w-full'>
                                <h3 className="font-medium text-lg/none text-gray-900 dark:text-gray-300 mb-1 pb-1 uppercase">
                                    Usa las palabras claves correctas
                                </h3>

                                <hr className='w-[85%] text-zinc-400/10 pb-2'></hr>

                                <p className="text-sm text-gray-700 dark:text-gray-500 w-full pb-2">
                                    &bull; Para obtener resultados precisos, utiliza palabras clave como: "placa", "vehículo", "región", "geocerca", "operación", "tipo de vehículo" o "tipo de tráiler", según el enfoque de tu consulta.
                                </p>
                                <p className="text-sm text-gray-700 dark:text-gray-500 w-full pb-2">
                                    &bull; Ejemplos: ¿Cuál es el promedio de tiempo del vehículo AGC345?, ¿Cuál el tiempo promedio de la región X?, ¿Cuál es el tiempo promedio para la operación de ensacado?, ¿Cuál es el tiempo promedio para el cargue en la región X?. ¿Cuáles son las regiones con el promedio de tiempo de permanencia más alto?.
                                </p>
                                <p className="text-sm text-gray-700 dark:text-gray-500 w-full pb-2">
                                    &bull; Recuerda: cuanto más específica sea tu pregunta, mejor será la respuesta.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* card 2 */}
                    <div className="h-auto lg:h-full relative bg-gradient-to-b from-white to-white dark:to-zinc-900 dark:from-zinc-900 p-6 rounded-3xl overflow-hidden shadow-[0_0_5px_0_rgba(0,0,0,0.1),_0_0_1px_0_rgba(0,0,0,0.1)] dark:shadow-[0_0_5px_0_rgba(255,255,255,0.06),_0_0_1px_0_rgba(255,255,255,0.04)] mt-2 lg:mt-1" data-aos="fade-up">

                        {/* Fondo de líneas */}
                        <Grid size={20} />

                        {/* Contenido de la card */}
                        <div className="space-y-4 mt-auto  px-4 pb-8 w-full text-left">

                            {/* Ícono arriba */}
                            <div className='pt-4'>
                                <TimerReset className="w-10 h-10 text-gray-700 dark:text-gray-400" strokeWidth={0.5} />
                            </div>

                            <div className='pt-6 w-full'>
                                <h3 className="font-medium text-lg/none text-gray-900 dark:text-gray-300 mb-1 pb-1 uppercase">
                                    ¿Quieres hacer cálculos de tiempo?
                                </h3>

                                <hr className='w-[85%] text-zinc-400/10 pb-2'></hr>

                                <p className="text-sm text-gray-700 dark:text-gray-500 w-full pb-2">
                                    &bull; Puedes incluir fechas específicas o rangos de fechas en tu consulta para obtener comparaciones útiles y detectar oportunidades de mejora en los resultados.
                                </p>
                                <p className="text-sm text-gray-700 dark:text-gray-500 w-full pb-2">
                                    &bull; Puedes hacer preguntas sobre promedios de permanencia:
                                    Ejemplo: ¿Cuál es el promedio del tiempo de permanencia en la región X (en horas o minutos)?, ¿Cuál es el promedio de tiempo de permanencia para la región x en los meses de enero y febrero del 2025?.
                                </p>
                                <p className="text-sm text-gray-700 dark:text-gray-500 w-full pb-2">
                                    &bull; Puedes hacer preguntas sobre Filtros por tiempo específico:
                                    Ejemplo: ¿Qué vehículos estuvieron más de 2 horas en la región norte?
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* card 3 */}
                    <div className="h-auto lg:h-full relative bg-gradient-to-b from-white to-white dark:to-zinc-900 dark:from-zinc-900 p-6 rounded-3xl overflow-hidden shadow-[0_0_5px_0_rgba(0,0,0,0.1),_0_0_1px_0_rgba(0,0,0,0.1)] dark:shadow-[0_0_5px_0_rgba(255,255,255,0.06),_0_0_1px_0_rgba(255,255,255,0.04)] mt-2 lg:mt-14" data-aos="fade-up">

                        {/* Fondo de líneas */}
                        <Grid size={20} />

                        {/* Contenido de la card */}
                        <div className="space-y-4 mt-auto  px-4 pb-8 w-full text-left">

                            {/* Ícono arriba */}
                            <div className='pt-4'>
                                <ShieldAlert className="w-10 h-10 text-gray-700 dark:text-gray-400" strokeWidth={0.5} />
                            </div>

                            <div className='pt-6 w-full'>
                                <h3 className="font-medium text-lg/none text-gray-900 dark:text-gray-300 mb-1 pb-1 uppercase">
                                    Evita hacer preguntas generales o ambiguas
                                </h3>

                                <hr className='w-[85%] text-zinc-400/10 pb-2'></hr>

                                <p className="text-sm text-gray-700 dark:text-gray-500 w-full pb-2">
                                    &bull; Es importante evitar preguntas
                                    demasiado amplias o ambiguas como: “Dame toda la información.”, “Muéstrame los datos.”, “Quiero ver todo lo que hay de los tiempos en región.”,
                                    Este tipo de consultas no dan suficiente contexto y dificultan obtener resultados útiles.                                </p>
                                <p className="text-sm text-gray-700 dark:text-gray-500 w-full pb-2">
                                    &bull; Sé específico y claro, formula preguntas que respondan a:
                                    ¿Qué información necesitas? (ejemplo: tiempo, vehículos, región, promedio)
                                    ¿Sobre qué aspecto estás preguntando? (ejemplo: región, tipo de operación, vehículo)
                                    ¿Deseas aplicar algún filtro? (ejemplo: “solo los vehículos que estuvieron más de 5 horas”, “durante marzo”, “en la zona centro”)
                                </p>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative  mt-10 lg:mt-20 col-span-full flex h-min-[200px] flex-col overflow-hidden rounded-2xl bg-white dark:bg-zinc-900/50 ring-1 ring-zinc-200 dark:ring-zinc-100/10 lg:col-span-1 shadow-[0_0_5px_0_rgba(0,0,0,0.1),_0_0_1px_0_rgba(0,0,0,0.1)] dark:shadow-[0_0_5px_0_rgba(255,255,255,0.06),_0_0_1px_0_rgba(255,255,255,0.04)]" data-aos="fade-up">
                    <ChatModel></ChatModel>
                </div>


            </section >
            <div className={`pt-6 h-auto relative `} data-aos="fade-up">
                <div className='relative mx-auto mt-16 max-w-full p-6 pb-12 pt-20 lg:px-8 '>
                    {/* Línea superior fina */}
                    <div aria-hidden="true" className="user-select-none center pointer-events-none absolute -top-0.5 left-1/2 h-px w-4/5 max-w-[500px] -translate-x-1/2 -translate-y-1/2 transform-gpu [background:linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(2,132,199,0.65)_50%,rgba(0,0,0,0)_100%)]"></div>

                    {/* efecto linea */}
                    <div aria-hidden="true" className="user-select-none center pointer-events-none absolute -top-1 left-1/2 h-[200px] w-full max-w-[300px] -translate-x-1/2 -translate-y-1/2 transform-gpu bg-[conic-gradient(from_90deg_at_50%_50%,#52525b00_50%,white_50%),radial-gradient(rgba(82,82,91,0.06)_0%,transparent_70%)]  dark:[background:conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#09090b_50%),radial-gradient(rgba(200,200,200,0.05)_0%,transparent_70%)] md:max-w-[600px]"></div>

                    <div className="relative isolate bg-white dark:bg-[#09090B]">
                        {/* Patrón SVG de fondo */}
                        <svg className="absolute inset-0 -z-10 h-full w-full dark:stroke-white/50 stroke-zinc-400 [mask-image:radial-gradient(40%_80%_at_center,black,transparent)]" aria-hidden="true">
                            <defs>
                                <pattern id="cta" width="80" height="80" x="50%" y="-1" patternUnits="userSpaceOnUse">
                                    <path d="M.5 200V.5H200" fill="none"></path>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" strokeWidth="0" fill="url(#cta)" />
                        </svg>
                        {/* Fondo de figura decorativa */}
                        <div
                            className="absolute inset-x-0 top-10 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl bg-white dark:bg-[#09090B]"
                            aria-hidden="true"
                        >
                            <div
                                className="aspect-[1108/532] h-auto w-[69.25rem] flex-none bg-gradient-to-r from-cyan-500 to-blue-800 opacity-20 dark:opacity-20"
                                style={{
                                    clipPath:
                                        "polygon(77.5% 40.13%, 90% 10%, 100% 50%, 95% 80%, 92% 85%, 75% 65%, 61.26% 54.7%, 50% 54.7%, 47.24% 65.81%, 50% 85%, 26.16% 73.91%, 0.1% 100%, 1% 40.13%, 20% 48.75%, 60% 0.25%, 67.5% 32.63%)",
                                }}
                            ></div>
                        </div>


                        {/* Contenido principal */}
                        <div className="mx-auto max-w-xl text-center">
                            <h2 className="leading-tight  bg-gradient-to-br from-gray-600 to-gray-900 dark:from-white dark:to-zinc-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                                Tu nuevo aliado para decisiones logísticas rápidas y precisas.
                            </h2>

                            <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-700 dark:text-zinc-400/80">
                                LOGISTICO es el nuevo asistente inteligente que responde todas tus preguntas sobre tiempos logísticos.
                            </p>
                            {/* Botón */}
                            <div className="mt-12 flex items-center justify-center">
                                <button className=" group relative rounded-full p-px text-sm/6 shadow-glow text-zinc-500 duration-300 hover:text-zinc-800 dark:hover:text-zinc-100 hover:shadow-glow">
                                    <span className="absolute inset-0 overflow-hidden rounded-full"><span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span></span>
                                    <NavLink to='/login'>
                                        <div className="relative  rounded-full bg-zinc-200 dark:bg-black bg-opacity-20 backdrop-blur-xl px-4 py-1.5 ring-1 ring-zinc-300 dark:ring-white/10">
                                            Iniciar sesión
                                        </div>
                                    </NavLink>

                                    <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-cyan-400/0 via-cyan-400/90 to-cyan-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HowToAsk
