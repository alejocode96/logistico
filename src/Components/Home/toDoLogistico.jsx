//react
import { useState } from 'react'
import React from 'react'
//icon
import { DatabaseZap, ShieldCheck, MessagesSquare, ChartLine } from 'lucide-react';


//contexto
import { LogisticoContext } from '../../Context';

//componentes
import AnimatedAreaChart from './AnimatedAreaChart';
import ChatExample from './chatExample';

//imagenes
import md_black from '../../../public/medellin_negro.jpg';
import md_white from '../../../public/medellin blanco.jpg';

function ToDoLogistico() {
    const { isDark, toggleDarkMode } = React.useContext(LogisticoContext);
    return (
        <section className='pt-16 pb-16 w-[90%] mx-auto' data-aos="fade-up">
            <div className='lg:flex items-center justify-between'>
                <div className='flex lg:flex-1 w-[100%] lg:w-[90%]'>
                    <div className='font-bold text-5xl/[1.07] md:text-6xl/[1.07] tracking-tight'>
                        <p className='pr-4 bg-clip-text bg-gradient-to-br from-gray-600 to-gray-900 text-transparent
                                     font-bold tracking-tight dark:from-white dark:to-zinc-500'>
                            ¿TODO LO QUE PUEDES HACER CON LOGISTICO?
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-2 pt-16 " >
                <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-6">
                    {/* Card 1 - 30% width */}
                    <div className="lg:col-span-4 " data-aos="fade-up">
                        <div className="relative w-full  h-full rounded-xl bg-white dark:bg-zinc-900 shadow-[0_0_5px_0_rgba(0,0,0,0.1),_0_0_1px_0_rgba(0,0,0,0.1)] dark:shadow-[0_0_5px_0_rgba(255,255,255,0.06),_0_0_1px_0_rgba(255,255,255,0.04)]  overflow-hidden flex flex-col">
                            {/* Parte superior con imagen de fondo */}
                            <div className="relative w-full h-[100px]">
                                {isDark ? <img src={md_black } alt="Map" className="w-full h-full object-cover opacity-55 " /> :
                                    <img src={md_white} alt="Map" className="w-full h-full object-cover opacity-55 " />}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white dark:from-zinc-900/0 dark:to-zinc-900" />
                                <div className="absolute inset-0 bg-gradient-to-r from-white to-white/0 dark:from-zinc-900 dark:to-zinc-900/0" />

                                {/* Ícono alineado a la izquierda */}
                                <div className="absolute inset-0 flex items-center justify-start z-10 px-4">
                                    <DatabaseZap className="w-9 h-9 text-gray-700 dark:text-gray-400" strokeWidth={0.5} />
                                </div>
                            </div>

                            {/* Contenido inferior */}
                            <div className="relative z-10 px-6 pt-4 pb-6 flex-1 flex flex-col justify-start">
                                <h3 className="font-semibold text-gray-900 dark:text-gray-300 mb-2">OBTENER DATOS PRECISOS EN TIEMPO REAL</h3>
                                <p className="text-sm text-gray-700 dark:text-gray-500 text-justify">
                                    Obtén información confiable y constantemente actualizada que te permite monitorear tus operaciones minuto a minuto. Nuestra plataforma captura, procesa y visualiza datos logísticos, ofreciéndote una visión clara y detallada del estado de tu operación. Así, puedes reaccionar de forma oportuna, optimizar recursos y tomar decisiones estratégicas con total confianza y respaldo de la información.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-8" data-aos="fade-up">
                        <div className="relative w-full h-full rounded-xl bg-white dark:bg-zinc-900 shadow-[0_0_5px_0_rgba(0,0,0,0.1),_0_0_1px_0_rgba(0,0,0,0.1)] dark:shadow-[0_0_5px_0_rgba(255,255,255,0.06),_0_0_1px_0_rgba(255,255,255,0.04)]  overflow-hidden flex flex-col">
                            {/* Parte superior con imagen de fondo */}
                            <div className="relative w-full h-[100px]">
                                {isDark ?
                                    <img src={md_black} alt="Map" className="w-full h-full object-cover opacity-55" /> :
                                    <img src={md_white} alt="Map" className="w-full h-full object-cover opacity-55" />
                                }
                                <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white dark:from-zinc-900/0 dark:to-zinc-900" />
                                <div className="absolute inset-0 bg-gradient-to-r from-white to-white/0 dark:from-zinc-900 dark:to-zinc-900/0" />

                                {/* Ícono alineado a la izquierda */}
                                <div className="absolute inset-0 flex items-center justify-start z-10 px-4">
                                    <ShieldCheck className="w-10 h-10 text-gray-700 dark:text-gray-400" strokeWidth={0.5} />
                                </div>
                            </div>

                            {/* Contenido inferior - Posicionamiento relativo para el Globe */}

                            <div className="relative z-10 flex-1 flex flex-col">
                                <div className="flex flex-col  md:flex-row flex-1 relative">
                                    {/* Columna del texto */}
                                    <div className="w-full md:w-3/5 py-4 px-6 flex flex-col justify-center">
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-300 mb-2">
                                            MEJORAR EFICIENCIA EN PROCESOS LOGÍSTICOS
                                        </h3>
                                        <p className="text-sm text-gray-700 dark:text-gray-500 text-justify">
                                            Identifica con precisión cuellos de botella en tus procesos, detecta zonas críticas con alta concentración de tiempos muertos y analiza patrones que afectan la eficiencia operativa. Nuestra plataforma te permite visualizar ineficiencias en tiempo real, facilitar el análisis de causas y tomar decisiones estratégicas para optimizar el flujo logístico, reducir costos y fortalecer la competitividad de tu operación.
                                        </p>
                                    </div>

                                    {/* Globe posicionado en esquina inferior derecha */}
                                    <div className="flex relative w-full md:w-2/5 h-[200px] md:h-auto justify-center items-center lg:mt-6 ">
                                        <div className="md:left-0 w-full h-full ">
                                            <AnimatedAreaChart />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

            <div className="flex flex-col lg:flex-row w-full gap-2 pt-4">
                <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-6">
                    <div className="lg:col-span-8 " data-aos="fade-up">
                        <div className="relative w-full  h-full rounded-xl bg-white dark:bg-zinc-900 shadow-[0_0_5px_0_rgba(0,0,0,0.1),_0_0_1px_0_rgba(0,0,0,0.1)] dark:shadow-[0_0_5px_0_rgba(255,255,255,0.06),_0_0_1px_0_rgba(255,255,255,0.04)]  overflow-hidden flex flex-col">
                            {/* Parte superior con imagen de fondo */}
                            <div className="relative w-full h-[100px]">
                                {isDark ? <img src={md_black} alt="Map" className="w-full h-full object-cover opacity-55 " /> :
                                    <img src={md_white} alt="Map" className="w-full h-full object-cover opacity-55 " />}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white dark:from-zinc-900/0 dark:to-zinc-900" />
                                <div className="absolute inset-0 bg-gradient-to-r from-white to-white/0 dark:from-zinc-900 dark:to-zinc-900/0" />

                                {/* Ícono alineado a la izquierda */}
                                <div className="absolute inset-0 flex items-center justify-start z-10 px-4">
                                    <MessagesSquare className="w-10 h-10 text-gray-700 dark:text-gray-400" strokeWidth={0.5} />
                                </div>
                            </div>

                            {/* Contenido inferior */}
                            <div className="relative z-10 px-6 pb-0 mb-0 flex flex-wrap md:flex-nowrap justify-between items-start gap-4">                                {/* Columna de texto */}
                                <div className="w-full md:w-1/2 pt-4 pb-4">
                                    <h3 className="font-semibold text-gray-900 dark:text-gray-300 mb-2">
                                        REALIZA CONSULTAS EN LENGUAJE NATURAL
                                    </h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-500 text-justify">
                                        Interactúa con el sistema de forma sencilla y natural, sin necesidad de conocimientos técnicos o comandos complejos. Solo tienes que escribir tus preguntas como lo harías al hablar con una persona.
                                        Por ejemplo: “¿Cuál es el tiempo promedio de permanencia en la zona X?”
                                        La plataforma entiende tu consulta, interpreta la intención y te entrega una respuesta clara, precisa y respaldada por datos en tiempo real.
                                    </p>
                                </div>

                                {/* Columna del chat */}
                                <div className="w-full md:w-1/2 relative">
                                    <ChatExample />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="lg:col-span-4 " data-aos="fade-up">
                        <div className="relative w-full  h-full rounded-xl bg-white dark:bg-zinc-900 shadow-[0_0_5px_0_rgba(0,0,0,0.1),_0_0_1px_0_rgba(0,0,0,0.1)] dark:shadow-[0_0_5px_0_rgba(255,255,255,0.06),_0_0_1px_0_rgba(255,255,255,0.04)] overflow-hidden flex flex-col">
                            {/* Parte superior con imagen de fondo */}
                            <div className="relative w-full h-[100px]">
                                {isDark ? <img src={md_black} alt="Map" className="w-full h-full object-cover opacity-55 " /> :
                                    <img src={md_white} alt="Map" className="w-full h-full object-cover opacity-55 " />}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white dark:from-zinc-900/0 dark:to-zinc-900" />
                                <div className="absolute inset-0 bg-gradient-to-r from-white to-white/0 dark:from-zinc-900 dark:to-zinc-900/0" />

                                {/* Ícono alineado a la izquierda */}
                                <div className="absolute inset-0 flex items-center justify-start z-10 px-4">
                                    <ChartLine className="w-10 h-10 text-gray-700 dark:text-gray-400" strokeWidth={0.5} />
                                </div>
                            </div>

                            {/* Contenido inferior */}
                            <div className="relative z-10 px-6 pt-4 pb-6 flex-1 flex flex-col justify-start">
                                <h3 className="font-semibold text-gray-900 dark:text-gray-300 mb-2">ANALIZAR TIEMPOS DE PERMANENCIA</h3>
                                <p className="text-sm text-gray-700 dark:text-gray-500 text-justify">
                                    Supervisa con precisión los tiempos de permanencia de vehículos en puntos clave como plantas, centros de distribución o zonas de cargue y descargue.
                                    Genera reportes por región, cliente o unidad operativa, detecta patrones que afectan la eficiencia y toma decisiones informadas para optimizar la rotación de recursos y mejorar el flujo logístico.                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default ToDoLogistico
