import React, { useState, useEffect } from 'react';
import { X, Clock, Medal, TrendingUp  } from 'lucide-react';

// Contexto
import { LogisticoContext } from '../../Context';

const ModalFaq = () => {
    const {
        isOpenFAQ, setIsOpenFAQ, selectedFAQ, setSelectedFAQ, formData, setFormData, handleSlideClick,questions
    } = React.useContext(LogisticoContext);


 // Obtener la pregunta seleccionada


    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpenFAQ ? "opacity-100 visible backdrop-blur-sm" : "opacity-0 invisible"}`}
            style={{ backgroundColor: isOpenFAQ ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)", }}  onClick={() => setIsOpenFAQ(false)}>
            {/* Modal Container  */}
            <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-[90vw]  max-h-[90vh] overflow-hidden transition-all duration-300 transform ${isOpenFAQ ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"}`}>
                {/* Header del Modal */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 pr-6 pl-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl sm:text-2xl font-bold">
                            Preguntas Frecuentes
                        </h2>
                        <button onClick={() => setIsOpenFAQ(false)} className="p-2 hover:bg-white hover:bg-opacity-20 hover:text-zinc-500 rounded-full transition-colors duration-200">
                            <X></X>
                        </button>
                    </div>
                </div>

                {/* Contenido del Modal */}
                <div className="p-4 sm:p-6 overflow-y-auto max-h-[70vh]">
                    <div className="p-4 sm:p-6 overflow-y-auto max-h-[70vh]">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* Panel Izquierdo - Lista de Opciones */}
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                                    Tipos de Consulta
                                </h3>

                                {questions.map((question) => (
                                    <div></div>
                                ))}

                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalFaq;