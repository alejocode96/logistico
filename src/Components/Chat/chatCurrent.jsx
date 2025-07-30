import React, { useRef, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ActiveSlider from "./carousel";
import { useAos } from '../../Hooks/useAos';
import { LogisticoContext } from '../../Context';

function ChatCurrent() {
    const { refreshAos } = useAos();
    const {
        isDark,
        isOpenFAQ,
        setIsOpenFAQ,
        chatHistoryCurrent,
        setChatHistoryCurrent,
        mensajeInput,
        setMensajeInput
    } = useContext(LogisticoContext);

    const chatEndRef = useRef(null);
    const messagesContainerRef = useRef(null);

    // Scroll automático mejorado con mejor timing
    useEffect(() => {
        if (chatEndRef.current && messagesContainerRef.current) {
            requestAnimationFrame(() => {
                setTimeout(() => {
                    chatEndRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "end"
                    });
                }, 300); // Aumentamos el delay para dar tiempo a la animación
            });
        }
    }, [chatHistoryCurrent]);

    // Refrescar AOS al cambiar historial
    useEffect(() => {
        const raf = requestAnimationFrame(() => {
            setTimeout(() => {
                refreshAos();
            }, 350); // Sincronizamos con el scroll y animación
        });
        return () => cancelAnimationFrame(raf);
    }, [chatHistoryCurrent.length]);

    const handleSubmit = () => {
        if (mensajeInput.trim() !== '') {
            const dataToSend = {
                idgrupo: '',
                idquestionslect: '',
                rol: "usuario",
                formData: '',
                puntoInteresTemporal: '',
                fechaEnvio: new Date().toISOString(),
                preguntaFormulada: mensajeInput.trim()
            };

            const mensajeChatbot = {
                pregunta: dataToSend,
                respuesta: "esta es una respuesta improvisada generada automaticamente"
            };

            setChatHistoryCurrent(prevHistory => [...prevHistory, mensajeChatbot]);
            setMensajeInput('');
        }
    };

    // Manejar Enter para enviar
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    // Variantes de animación para los mensajes
    const messageVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1], // Curva de animación suave
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.2
            }
        }
    };

    // Variantes para el indicador de escritura
    const typingVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    // Variantes para el contenedor de mensajes
    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Retraso entre animaciones de elementos hijos
            }
        }
    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-600">
                <div className="w-full max-w-4xl mx-auto space-y-4 pb-4">
                    {chatHistoryCurrent.map((mensaje, index) => (
                        <div key={`msg-${index}`} className="space-y-3">
                            <AnimatePresence>
                                <motion.div
                                    key={`q-${index}`}
                                    className="flex justify-end"
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={messageVariants}
                                >
                                    <motion.div className="bg-zinc-100 dark:bg-zinc-800 shadow-md text-zinc-800 dark:text-white p-3 rounded-lg max-w-[90%] break-words">
                                        <p className="text-sm">{mensaje.pregunta.preguntaFormulada}</p>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-300 mt-1 block">
                                            {new Date(mensaje.pregunta.fechaEnvio).toLocaleTimeString()}
                                        </span>
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>

                            <AnimatePresence>
                                {mensaje.respuesta && (
                                    <motion.div
                                        key={`r-${index}`}
                                        className="flex justify-start"
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={messageVariants}
                                    >
                                        <motion.div className="text-zinc-800 dark:text-zinc-200 p-3 rounded-lg max-w-[90%] break-words">
                                            <p className="text-sm">{mensaje.respuesta}</p>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                    <div ref={chatEndRef} className="h-1" />
                </div>
            </div>
            {/* input textarea y demás componentes sin modificar */}


            {/* Input area fija en la parte inferior */}
            <motion.div
                className="flex-shrink-0 p-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="w-full max-w-4xl mx-auto">
                    <motion.div
                        className="bg-zinc-50 shadow-md dark:bg-[#131315] ring-1 ring-zinc-200 dark:ring-zinc-800 min-h-[6rem] sm:min-h-[8rem] w-full rounded-2xl flex flex-col"

                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex-1 p-2 sm:p-3 md:p-4">
                            <textarea
                                value={mensajeInput}
                                onChange={(e) => setMensajeInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full min-h-[3rem] max-h-[12rem] resize-none overflow-y-auto p-2 rounded h-full outline-none ring-0 focus:ring-0 focus:outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-zinc-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-700 dark:text-zinc-400 bg-transparent text-sm"
                                placeholder="¿Cómo puedo ayudarte hoy?"
                                rows={2}
                            />
                        </div>
                        <div className="flex justify-end px-2 pb-1.5 sm:pr-2 sm:pb-2 flex-shrink-0 gap-1 sm:gap-2">
                            <motion.button
                                onClick={() => setIsOpenFAQ(true)}
                                className="cursor-pointer flex items-center text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-1 sm:p-2 rounded-md transition-all duration-500 hover:bg-zinc-200 hover:text-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                                    <path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" />
                                    <path d="M12 17h.01" />
                                </svg>
                                <span className="hidden sm:inline ml-1">Preguntas Frecuentes</span>
                                <span className="sm:hidden ml-1">FAQ</span>
                            </motion.button>
                            <motion.button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={!mensajeInput.trim()}
                                className="bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-700 hover:to-blue-500 disabled:from-zinc-400 disabled:to-zinc-400 disabled:cursor-not-allowed text-white rounded-lg px-1.5 py-1 sm:p-2 transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                animate={mensajeInput.trim() ? {
                                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                                } : {}}
                            >
                                <motion.svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5 sm:h-5 sm:w-5"
                                    fill="currentColor"
                                    viewBox="0 0 512 512"
                                    animate={{ rotate: mensajeInput.trim() ? [0, 5, 0] : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                                </motion.svg>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div >
    );
}

export default ChatCurrent;