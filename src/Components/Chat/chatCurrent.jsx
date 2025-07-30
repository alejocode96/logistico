import React, { useState, useRef, useEffect } from "react";
import ActiveSlider from "./carousel";
import { useAos } from '../../Hooks/useAos';
// Contexto
import { LogisticoContext } from '../../Context';

function ChatCurrent() {
    const { refreshAos } = useAos();
    const {
        isDark,
        isOpenFAQ,
        setIsOpenFAQ,
        chatHistoryCurrent,
        setChatHistoryCurrent, mensajeInput, setMensajeInput
    } = React.useContext(LogisticoContext);

    // Ref para hacer scroll al final
    const chatEndRef = useRef(null);

    // Efecto para hacer scroll cada vez que cambia el historial del chat
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatHistoryCurrent]);

    const handleSubmit = () => {
        if (mensajeInput != '') {
            // Preparar datos para envío
            const dataToSend = {
                idgrupo: '',
                idquestionslect: '',
                rol: "usuario",
                formData: '',
                puntoInteresTemporal: '',
                fechaEnvio: new Date().toISOString(),
                preguntaFormulada: mensajeInput
            };

            // Estructura JSON para el chatbot
            const mensajeChatbot = {
                pregunta: dataToSend,
                respuesta: "esta es una respuesta improvisada generada automaticamente"
            };

            setChatHistoryCurrent(prevHistory => [...prevHistory, mensajeChatbot]);
            setMensajeInput('')
            console.log(chatHistoryCurrent)
        }
    };

    // Refresca AOS cuando cambia la longitud del historial
    useEffect(() => {
        const raf = requestAnimationFrame(() => {
            setTimeout(() => {
                refreshAos(); // se llama una vez que el DOM esté actualizado
            }, 50);
        });

        return () => cancelAnimationFrame(raf);
    }, [chatHistoryCurrent.length]);


    return (
        <div className="h-screen flex flex-col overflow-hidden"> {/* Pantalla completa */}
            {/* MENSAJES */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="w-full max-w-4xl mx-auto space-y-4">
                    {chatHistoryCurrent.map((mensaje, index) => (
                        <div key={index} className="space-y-3">
                            {/* Pregunta del usuario */}
                            <div className="flex justify-end">
                                <div className="bg-zinc-100 dark:bg-zinc-800 shadow-md text-zinc-800 dark:text-white p-3 rounded-lg w-[90%]">
                                    <p className="text-sm">{mensaje.pregunta.preguntaFormulada}</p>
                                    <span className="text-xs text-zinc-500 dark:text-zinc-300 mt-1 block">
                                        {new Date(mensaje.pregunta.fechaEnvio).toLocaleTimeString()}
                                    </span>
                                </div>
                            </div>

                            {/* Respuesta del bot */}
                            {mensaje.respuesta && (
                                <div className="flex justify-start">
                                    <div className="text-zinc-800 dark:text-zinc-200 p-3 rounded-lg w-full">
                                        <p className="text-sm">{mensaje.respuesta}</p>
                                    </div>
                                </div>
                            )}

                            {/* Indicador escribiendo */}
                            {!mensaje.respuesta && (
                                <div className="flex justify-start" data-aos="fade-up">
                                    <div className="text-zinc-500 dark:text-zinc-400 p-3 rounded-lg w-full">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-100"></div>
                                            <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-200"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>
            </div>

            {/* INPUT */}
            <div className="p-4 flex-shrink-0 bg-white dark:bg-black">
                <div className="w-full max-w-4xl mx-auto">
                    <div className="bg-zinc-50 dark:bg-[#131315] ring-1 ring-zinc-200 dark:ring-zinc-800 rounded-2xl flex flex-col">
                        <div className="p-2 sm:p-3 md:p-4">
                            <textarea
                                value={mensajeInput}
                                onChange={(e) => setMensajeInput(e.target.value)}
                                className="w-full resize-none h-16 sm:h-20 bg-transparent text-sm text-zinc-500 dark:text-zinc-400 outline-none"
                                placeholder="¿Cómo puedo ayudarte hoy?"
                            />
                        </div>
                        <div className="flex justify-end px-2 pb-2 gap-2">
                            <button onClick={() => setIsOpenFAQ(true)} className="text-sm text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-md">
                                FAQ
                            </button>
                            <button onClick={handleSubmit} className="bg-gradient-to-r from-blue-800 to-blue-600 text-white px-4 py-1 rounded-lg">
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}

export default ChatCurrent;