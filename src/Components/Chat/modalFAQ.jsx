import React, { useState, useEffect } from 'react';
import { X, MapPin, Globe, TrendingUp } from 'lucide-react';

// Contexto
import { LogisticoContext } from '../../Context';

const ModalFaq = () => {
    const {
        isOpenFAQ, setIsOpenFAQ, selectedFAQ, setSelectedFAQ, handleSlideClick, questions
    } = React.useContext(LogisticoContext);

    const [puntoInteres, setPuntoInteres] = useState('ninguno');
    const [filtroTemporal, setFiltroTemporal] = useState('unico');
    const [advanceChecks, setAdvanceChecks] = useState({
        operacion: false,
        tipoOperacion: false,
        tipoVehiculo: false
    });

    // Obtener la pregunta seleccionada
    const handleQuestionChange = (e) => {
        setSelectedFAQ(e.target.value);
    };

    const getSelectedQuestion = () => {
        return questions.find(q => q.id.toString() === selectedFAQ.toString());
    };

    const handleCheckboxChange = (key) => {
        setAdvanceChecks(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpenFAQ ? "opacity-100 visible backdrop-blur-sm" : "opacity-0 invisible"}`}
            style={{ backgroundColor: isOpenFAQ ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)", }}>
            {/* Modal Container  */}
            <div className={`bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-[90vw] max-h-[90vh] overflow-hidden transition-all duration-300 transform ${isOpenFAQ ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"}`}>
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
                <div className="p-4 sm:p-6 overflow-y-auto max-h-[75vh]">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-600/30 rounded-lg flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                        Selección de Consulta
                                    </h3>

                                </div>
                                <div className="mb-6">
                                    <label htmlFor="question-select" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                                        Selecciona una pregunta:
                                    </label>
                                    <select id="question-select" value={selectedFAQ} onChange={handleQuestionChange} className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 text-zinc-600 dark:text-white" >
                                        <option value="">-- Selecciona una opción --</option>
                                        {questions.map((question) => (
                                            <option key={question.id} value={question.id}>
                                                {question.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {selectedFAQ && (
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-white">

                                        <div className="">
                                            <div>
                                                <h4 className="text-md font-medium text-gray-700 dark:text-zinc-300 mb-0 leading-tight">Descripción:</h4>
                                                <p className="text-sm text-gray-600 dark:text-zinc-300 leading-tight">
                                                    {getSelectedQuestion()?.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 border  border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-indigo-100 dark:bg-blue-600/30 rounded-lg flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                            Filtros de Consulta
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Configure los parámetros de su análisis
                                        </p>
                                    </div>
                                </div>
                                {/* selecionar preguntas */}
                                <div className="flex-1 ">
                                    <div className="mt-6">
                                        <div className="space-y-0">
                                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Filtros</h2>
                                            <p className="text-gray-600 dark:text-gray-400">Seleccione los parámetros con los cuales desea estructurar su consulta</p>
                                        </div>
                                        <hr className='text-gray-200 mt-2 mb-2 dark:text-gray-600'></hr>


                                        {/* Punto de Interés Geográfico */}
                                        <div className='mt-3'>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                                                Punto de interés geográfico
                                            </label>
                                            <div className="flex gap-1 bg-gray-100 border border-gray-200 p-1 rounded-lg shadow-sm dark:bg-zinc-800 dark:border-zinc-700">
                                                <button
                                                    onClick={() => setPuntoInteres('ninguno')}
                                                    className={`flex-1 px-4 py-2 text-sm rounded-md transition-all ${puntoInteres === 'ninguno'
                                                        ? 'bg-white text-gray-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-300 '
                                                        : 'text-gray-600 hover:text-gray-900 hover:dark:text-zinc-300 dark:text-zinc-500 '
                                                        }`}
                                                >
                                                    Ninguno
                                                </button>

                                                <button
                                                    onClick={() => setPuntoInteres('zona')}
                                                    className={`flex-1 px-4 py-2 text-sm rounded-md transition-all ${puntoInteres === 'zona'
                                                        ? 'bg-white text-gray-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-300'
                                                        : 'text-gray-600 hover:text-gray-900 hover:dark:text-zinc-300 dark:text-zinc-500'
                                                        }`}
                                                >
                                                    Zona
                                                </button>

                                                <button
                                                    onClick={() => setPuntoInteres('region')}
                                                    className={`flex-1 px-4 py-2 text-sm rounded-md transition-all ${puntoInteres === 'region'
                                                        ? 'bg-white text-gray-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-300'
                                                        : 'text-gray-600 hover:text-gray-900 hover:dark:text-zinc-300 dark:text-zinc-500'
                                                        }`}
                                                >
                                                    Región
                                                </button>
                                            </div>
                                        </div>

                                        {/* Filtro Temporal */}
                                        <div className='mt-3'>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300 ">
                                                Filtro temporal
                                            </label>
                                            <div className="flex gap-1 bg-gray-100 border border-gray-200 p-1 rounded-lg shadow-sm dark:bg-zinc-800 dark:border-zinc-700">
                                                <button
                                                    onClick={() => setFiltroTemporal('unico')}
                                                    className={`flex-1 px-4 py-2 text-sm rounded-md transition-all ${filtroTemporal === 'unico'
                                                        ? 'bg-white text-gray-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-300'
                                                        : 'text-gray-600 hover:text-gray-900 hover:dark:text-zinc-300 dark:text-zinc-500'
                                                        }`}
                                                >
                                                    Único
                                                </button>

                                                <button
                                                    onClick={() => setFiltroTemporal('segmentacion')}
                                                    className={`flex-1 px-4 py-2 text-sm rounded-md transition-all ${filtroTemporal === 'segmentacion'
                                                        ? 'bg-white text-gray-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-300'
                                                        : 'text-gray-600 hover:text-gray-900 hover:dark:text-zinc-300 dark:text-zinc-500'
                                                        }`}
                                                >
                                                    Rango
                                                </button>
                                            </div>
                                        </div>


                                        <div className='mt-3'>
                                            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                                                Segmentación avanzada
                                            </label>
                                            <div className="flex gap-1 bg-gray-100 border border-gray-200 p-1 rounded-lg shadow-sm dark:bg-zinc-800 dark:border-zinc-700">
                                                <button
                                                    onClick={() => handleCheckboxChange('tipoOperacion')}
                                                    className={`flex-1 px-4 py-2 text-sm rounded-md transition-all ${advanceChecks.tipoOperacion
                                                        ? 'bg-white text-gray-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-300'
                                                        : 'text-gray-600 hover:text-gray-900 hover:dark:text-zinc-300 dark:text-zinc-500'
                                                        }`}
                                                >
                                                    Tipo de operación
                                                </button>
                                                <button
                                                    onClick={() => handleCheckboxChange('operacion')}
                                                    className={`flex-1 px-4 py-2 text-sm rounded-md transition-all ${advanceChecks.operacion
                                                        ? 'bg-white text-gray-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-300'
                                                        : 'text-gray-600 hover:text-gray-900 hover:dark:text-zinc-300 dark:text-zinc-500'
                                                        }`}
                                                >
                                                    Operación
                                                </button>
                                                <button
                                                    onClick={() => handleCheckboxChange('tipoVehiculo')}
                                                    className={`flex-1 px-4 py-2 text-sm rounded-md transition-all ${advanceChecks.tipoVehiculo
                                                        ? 'bg-white text-gray-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-300'
                                                        : 'text-gray-600 hover:text-gray-900 hover:dark:text-zinc-300 dark:text-zinc-500'
                                                        }`}
                                                >
                                                    Tipo vehículo
                                                </button>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>


                        </div>



                        {/* Sección de Cobertura - Mantiene el mismo estilo */}
                        <div className="flex-1 p-6 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 border  border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
                            <div>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">Seleccione la cobertura (solo una opción):</p>
                                <div className="flex gap-3">
                                    <div className="grid grid-cols-3 gap-2">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalFaq;