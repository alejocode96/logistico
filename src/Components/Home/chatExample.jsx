import React, { useEffect, useRef, useState } from "react";
import { Send, Bot, User } from "lucide-react";

/**
 * Componente de chat automatizado que simula una conversación
 * mostrando preguntas y respuestas secuencialmente con animaciones.
 */
function ChatExample() {
  // Estado para los mensajes mostrados en el chat
  const [messages, setMessages] = useState([]);

  // Estado para simular el tipeo de la pregunta actual
  const [currentInput, setCurrentInput] = useState("");

  // Estado para mostrar el indicador de "escribiendo..."
  const [isTyping, setIsTyping] = useState(false);

  // Referencia para hacer scroll automático hacia el último mensaje
  const messagesEndRef = useRef(null);

  // Array de preguntas y respuestas que se mostrarán en el chat
  const qaData = [
    { question: "¿Tiempo de permanencia de planta X ?", answer: "el tiempo es de 1.5 horas." },
    { question: "¿Tiempo de permanencia de Cliente Y ?", answer: "el tiempo es de 3.5 horas." },
    { question: "¿Tiempo de permanencia de zona Centro ?", answer: "el tiempo es de 0.5 horas." },
    { question: "¿Tiempo de permanencia de vehículo XYZ111 ?", answer: "el tiempo es de 6.5 horas." }
  ];

  // Hace scroll automáticamente al último mensaje
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Función auxiliar que retorna una promesa que se resuelve después de X milisegundos
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /**
   * Ejecuta el flujo del chat de forma secuencial e infinita.
   * Simula escritura letra por letra, muestra la pregunta y la respuesta.
   */
  const runChatSequentially = async () => {
    while (true) {
      for (let i = 0; i < qaData.length; i++) {
        const { question, answer } = qaData[i];

        // Simula el tipeo letra por letra de la pregunta
        for (let j = 1; j <= question.length; j++) {
          setCurrentInput(question.slice(0, j));
          await wait(50); // velocidad de escritura
        }

        await wait(300); // pequeña pausa antes de enviar la pregunta

        // Agrega solo la pregunta al estado de mensajes
        setMessages([
          {
            id: Date.now(),
            text: question,
            isUser: true,
            timestamp: new Date(),
          },
        ]);

        setCurrentInput("");
        setIsTyping(true); // muestra el indicador de "escribiendo..."

        await wait(3000); // simula espera por respuesta

        // Agrega la respuesta, manteniendo la pregunta anterior
        setMessages((prev) => [
          prev[0], // mantiene la pregunta anterior
          {
            id: Date.now() + 1,
            text: answer,
            isUser: false,
            timestamp: new Date(),
          },
        ]);

        setIsTyping(false);
        await wait(3000); // pausa antes de la siguiente pregunta
      }
    }
  };

  // Inicia la conversación cuando el componente se monta
  useEffect(() => {
    runChatSequentially();
  }, []);

 

  return (
    <div className="h-56 pb-4 mt-2 mb-4 overflow-hidden relative">
      {/* Área de mensajes */}
      <div className="h-46 overflow-hidden p-4 relative">
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-2 transition-all duration-500 ease-in-out transform ${
                message.isUser ? "justify-end" : "justify-start"
              } animate-slide-in`}
            >
              {/* Ícono de bot si el mensaje no es del usuario */}
              {!message.isUser && (
                <div className="w-7 h-7 bg-gradient-to-br from-gray-400 to-gray-500 dark:from-zinc-600 dark:to-zinc-700 rounded-full flex items-center justify-center shadow-sm dark:border-zinc-600">
                  <Bot className="w-3 h-3 text-white dark:text-zinc-200" />
                </div>
              )}

              {/* Burbuja del mensaje */}
              <div
                className={`max-w-xs lg:max-w-md px-3 py-2 rounded-xl shadow-sm transition-all duration-200 ${
                  message.isUser
                    ? "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-br-sm border border-gray-200 dark:from-zinc-700 dark:to-zinc-800 dark:text-zinc-100 dark:border-zinc-600"
                    : "bg-white text-gray-700 border border-gray-200 rounded-bl-sm hover:shadow-md dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-600"
                }`}
              >
                <p className="text-xs leading-relaxed font-medium">{message.text}</p>
                <p
                  className={`text-xs mt-1 font-light ${
                    message.isUser ? "text-gray-700 dark:text-zinc-300" : "text-gray-700 dark:text-zinc-400"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {/* Ícono de usuario si el mensaje es del usuario */}
              {message.isUser && (
                <div className="w-7 h-7 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-zinc-500 dark:to-zinc-600 rounded-full flex items-center justify-center shadow-sm">
                  <User className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          ))}

          {/* Indicador de que el bot está escribiendo */}
          {isTyping && (
            <div className="flex items-start space-x-2 animate-pulse">
              <div className="w-7 h-7 bg-gradient-to-br from-gray-400 to-gray-500 dark:from-zinc-600 dark:to-zinc-700 rounded-full flex items-center justify-center shadow-sm">
                <Bot className="w-3 h-3 text-white dark:text-zinc-200" />
              </div>
              <div className="bg-white dark:bg-zinc-800 px-3 py-2 rounded-xl border border-gray-50 dark:border-zinc-700 rounded-bl-sm shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-gray-300 dark:bg-zinc-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-1.5 h-1.5 bg-gray-300 dark:bg-zinc-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-1.5 h-1.5 bg-gray-300 dark:bg-zinc-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Referencia para scroll automático */}
        <div ref={messagesEndRef} />
      </div>

      {/* Área de input (solo decorativa en este caso) */}
      <div className="w-full px-4">
        <div className="w-full flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={currentInput}
              placeholder="El chat se ejecuta automáticamente..."
              className="w-full px-3 py-2 text-xs bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 text-gray-600 placeholder-gray-400 dark:text-zinc-200 dark:placeholder-zinc-400 font-light shadow-sm"
              readOnly
            />
            {currentInput && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-0.5 h-3 bg-gray-400 dark:bg-zinc-400 animate-pulse rounded-full"></div>
              </div>
            )}
          </div>
          <button
            className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 text-white dark:from-zinc-600 dark:to-zinc-700 dark:text-zinc-200 rounded-lg flex items-center justify-center hover:from-gray-500 hover:to-gray-600 transition-all duration-200 shadow-sm"
            disabled
          >
            <Send className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatExample;
