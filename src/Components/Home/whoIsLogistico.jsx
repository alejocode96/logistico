//componentes react
import { useState } from 'react'
import React from 'react'

//contexto
import { LogisticoContext } from '../../Context';

//componente
import ParticleBackground from './ParticleBackground';

//imagenes
import pageDark from '../../../public/page_dark.jpg'
import page from '../../../public/page.jpg'
function WhoIsLogistico() {
    const { isDark, toggleDarkMode } = React.useContext(LogisticoContext);
    return (
        <>
            <div id='tsparticles' className='pointer-events-none absolute left-1/2 h-[62rem] w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden lg:w-[60rem]'>
                <ParticleBackground></ParticleBackground>
            </div>
            <section className={`pt-16 pb-16 w-[90%] mx-auto relative`} id='Section_WhoIsLogistico'>
                <div className='w-full'>
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8" data-aos="fade-up">
                        {/* Columna izquierda */}
                        <div className="w-full lg:w-1/2 flex justify-start">
                            <div>
                                <p className="text-justify text-zinc-400 text-5xl font-extralight">CONOCÉ A</p>
                                <p className="bg-gradient-to-br from-gray-600 to-gray-900 bg-clip-text text-7xl/[1.07] font-bold tracking-tight text-transparent md:text-8xl/[1.07] dark:from-white dark:to-zinc-500">
                                    LOGISTICO
                                </p>
                            </div>
                        </div>

                        {/* Columna derecha */}
                        <div className="w-full lg:w-1/2 pt-4 lg:pt-0">
                            <p className="text-justify text-zinc-600 pb-4 dark:text-zinc-400">
                                <span className="font-semibold">Logístico </span>
                                <span>es nuestro asistente virtual especializado en procesos logísticos. Está diseñado para brindarte información precisa, en tiempo real y basada en datos operativos confiables.</span>
                            </p>
                            <p className="text-justify text-zinc-600 pb-4 dark:text-zinc-400">
                                Conectado directamente a nuestros sistemas, te ofrece respuestas inmediatas que te ayudan a tomar decisiones más ágiles, seguras y eficientes.
                            </p>
                        </div>
                    </div>

                    <div className="relative  mt-16" style={{ transform: 'none' }} >
                        <div className="absolute -top-[2px] right-20 h-2 w-20 [mask-image:linear-gradient(to_right,rgba(217,217,217,0)_0%,#d9d9d9_25%,#d9d9d9_75%,rgba(217,217,217,0)_100%)] md:w-32 lg:w-64">
                            <div className="h-px w-full animate-starlight-right bg-gradient-to-r from-zinc-800/0 via-zinc-800 to-zinc-800/0 dark:from-cyan-400/0 dark:via-cyan-400 dark:to-cyan-400/0">
                            </div>
                        </div>
                        <div className="rounded-md bg-zinc-950 ring-1 ring-zinc-200 dark:ring-white/10 lg:rounded-2xl" data-aos="fade-up">
                            <div className="" style={{ opacity: 1 }}>
                                {isDark ? <img alt="App screenshot" fetchPriority="high" width="4200" height="2490" decoding="async" data-nimg="1" className="rounded-md lg:rounded-2xl" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw" src={pageDark} /> :
                                    <img alt="App screenshot" fetchPriority="high" width="4200" height="2490" decoding="async" data-nimg="1" className="rounded-md lg:rounded-2xl" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw" src={page} />}
                            </div>
                        </div>
                        <div className="absolute -bottom-[7px] left-20 h-2 w-20 [mask-image:linear-gradient(to_right,rgba(217,217,217,0)_0%,#d9d9d9_25%,#d9d9d9_75%,rgba(217,217,217,0)_100%)] md:w-32 lg:w-64">
                            <div className="h-px w-full animate-starlight-left bg-gradient-to-r from-zinc-800/0 via-zinc-800 to-zinc-800/0 dark:from-cyan-400/0 dark:via-cyan-400 dark:to-cyan-400/0">
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default WhoIsLogistico