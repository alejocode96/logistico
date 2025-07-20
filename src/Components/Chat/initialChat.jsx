import React, { useState, useRef, useEffect } from "react";
import ActiveSlider from "./carousel";

function InitialChat() {
    return (
        <div className="flex items-center justify-center p-4 pt-20" style={{ minHeight: 'calc(100vh - 80px)' }}>
            <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
                {/* titulo */}
                <div className="flex flex-col w-full mb-2">
                    <p className="m-0 text-zinc-400 text-3xl font-extralight leading-none p-0 text-left -mb-4">
                        Buenas tardes,
                    </p>
                    <p className="m-0 bg-gradient-to-br from-gray-600 to-gray-900 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl dark:from-white dark:to-zinc-500 leading-normal p-0 text-left">
                        Alejandro Galeano!
                    </p>
                </div>

                {/* mensaje */}
                <div className="bg-zinc-50 dark:bg-[#131315] ring-1 ring-zinc-200 dark:ring-zinc-800 h-40 w-full rounded-2xl flex flex-col mb-6">
                    <div className="w-full h-30 p-4">
                        <textarea
                            className="w-full h-full resize-none outline-none ring-0 focus:ring-0 focus:outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-zinc-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-700 dark:text-zinc-400 bg-transparent"
                            placeholder="¿Cómo puedo ayudarte hoy?"
                        ></textarea>
                    </div>
                    <div className="flex justify-end pr-2 pb-2">
                        <button className="flex mr-2 text-sm text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 p-2 rounded-md transition-all duration-500 hover:bg-zinc-200 hover:text-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-zinc-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-question-mark-icon lucide-shield-question-mark">
                                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                                <path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" />
                                <path d="M12 17h.01" />
                            </svg>
                            <span>Preguntas Frecuentes</span>
                        </button>
                        <button type="submit"
                            className="bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-700 hover:to-blue-500 text-white rounded-lg p-2 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 512 512">
                                <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* slider */}
                <div className="w-full">
                   <ActiveSlider />
                </div>
            </div>
        </div>
    );
}

export default InitialChat;