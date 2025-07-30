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
        <div className="h-full flex flex-col overflow-hidden">
            {/* chat messages - CAMBIO CLAVE: altura controlada y overflow específico */}
            <div className="flex-1 min-h-0 overflow-y-auto px-4">
                <div className="w-full max-w-4xl mx-auto space-y-4 py-4">
                    {chatHistoryCurrent.map((mensaje, index) => (
                        <div key={index} className="space-y-3">
                            {/* Pregunta del usuario */}
                            <div className="flex justify-end" >
                                <div className="bg-zinc-100 dark:bg-zinc-800 shadow-md text-zinc-800 dark:text-white p-3 rounded-lg w-[90%]">
                                    <p className="text-sm">{mensaje.pregunta.preguntaFormulada}</p>
                                    <span className="text-xs text-zinc-500 dark:text-zinc-300 mt-1 block">
                                        {new Date(mensaje.pregunta.fechaEnvio).toLocaleTimeString()}
                                    </span>
                                </div>
                            </div>

                            {/* Respuesta del bot (si existe) */}
                            {mensaje.respuesta && (
                                <div className="flex justify-start" >
                                    <div className="text-zinc-800 dark:text-zinc-200 p-3 rounded-lg w-full">
                                        <p className="text-sm">{mensaje.respuesta}</p>
                                    </div>
                                </div>
                            )}

                            {/* Indicador de escritura si no hay respuesta */}
                            {!mensaje.respuesta && (
                                <div className="flex justify-start" data-aos="fade-up">
                                    <div className="text-zinc-500 dark:text-zinc-400 p-3 rounded-lg w-full">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {/* Este div invisible asegura que el scroll llegue al final */}
                    <div ref={chatEndRef} />
                </div>
            </div>

            {/* input mensaje - CAMBIO: altura fija más compacta */}
            <div className="flex-shrink-0 p-4">
                <div className="w-full max-w-4xl mx-auto">
                    <div className="bg-zinc-50 dark:bg-[#131315] shadow-md ring-1 ring-zinc-200 dark:ring-zinc-800 h-[120px] w-full rounded-2xl flex flex-col">
                        <div className="w-full flex-1 p-3">
                            <textarea
                                value={mensajeInput}
                                onChange={(e) => {
                                    setMensajeInput(e.target.value);
                                }}
                                className="w-full h-full resize-none outline-none ring-0 focus:ring-0 focus:outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-zinc-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-700 dark:text-zinc-400 bg-transparent text-sm"
                                placeholder="¿Cómo puedo ayudarte hoy?"
                            ></textarea>
                        </div>
                        <div className="flex justify-end p-2 flex-shrink-0">
                            <button onClick={() => setIsOpenFAQ(true)} className="cursor-pointer flex mr-2 text-sm text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 p-2 rounded-md transition-all duration-500 hover:bg-zinc-200 hover:text-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-zinc-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-question-mark-icon lucide-shield-question-mark">
                                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                                    <path d="M9.1 9a3 3 ots 0 1 5.82 1c0 2-3 3-3 3" />
                                    <path d="M12 17h.01" />
                                </svg>
                                <span>Preguntas Frecuentes</span>
                            </button>
                            <button type="submit" onClick={() => handleSubmit()}
                                className="bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-700 hover:to-blue-500 text-white rounded-lg p-2 transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 512 512">
                                    <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatCurrent;