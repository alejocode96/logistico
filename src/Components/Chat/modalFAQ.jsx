import React, { useState, useEffect } from 'react';
import {
    X, MapPin, Globe, TrendingUp, ShieldQuestionMark, FunnelPlus, TextCursorInput, Search, ChevronDown,
    Calendar, CalendarDays, ChevronRight
} from 'lucide-react';

// Contexto
import { LogisticoContext } from '../../Context';

const ModalFaq = () => {
    const {
        isOpenFAQ, setIsOpenFAQ, selectedFAQ, setSelectedFAQ, handleSlideClick, questions, selectedQuestionOption, setSelectedQuestionOption
    } = React.useContext(LogisticoContext);

    // Datos de ejemplo
    const zonas = ['Norte', 'Centro', 'Noroccidente', 'Suroccidente'];
    const clientes = ['Cliente 1', 'Cliente 2', 'Cliente 3', 'Cliente 4', 'Cliente 5'];
    const plantas = ['Planta 1', 'Planta 2', 'Planta 3', 'Planta 4', 'Planta 5'];
    const vehiculos = ['XXX111', 'XXX222', 'XXX333', 'XXX444', 'XXX555'];
    const regiones = ['Región 1', 'Región 2', 'Región 3', 'Región 4'];

    // Estado para los valores del formulario
    const [formValues, setFormValues] = useState({});

    // Estado para errores de validación
    const [errors, setErrors] = useState({});

    // Estados adicionales para el select múltiple
    const [searchTerms, setSearchTerms] = useState({});
    const [dropdownOpen, setDropdownOpen] = useState({});

    // Estado para el punto de interés temporal (fecha, semana, mes)
    const [puntoInteresTemporal, setPuntoInteresTemporal] = useState('fecha');

    // Obtener la pregunta seleccionada
    const getSelectedQuestion = () => {
        return questions.find(q => q.id === selectedFAQ);
    };

    const selectedQuestion = getSelectedQuestion();

    // Estado para la pregunta formulada
    const [preguntaFormulada, setPreguntaFormulada] = useState('');

    // Manejar cambios en el punto de interés temporal
    const handlePuntoInteresTemporalChange = (tipo) => {
        setPuntoInteresTemporal(tipo);
        // Limpiar valores de fecha relacionados cuando cambie el tipo
        const fieldsToClean = ['fecha_especifica', 'semana', 'mes'];
        const newFormValues = { ...formValues };
        fieldsToClean.forEach(field => {
            delete newFormValues[field];
        });
        setFormValues(newFormValues);
    };

    // Manejar cambios en los inputs del formulario
    const handleInputChange = (fieldName, value) => {
        setFormValues(prev => ({
            ...prev,
            [fieldName]: value
        }));

        // Limpiar error si el campo ahora tiene valor
        if (value && errors[fieldName]) {
            setErrors(prev => ({
                ...prev,
                [fieldName]: null
            }));
        }
    };

    // Función para manejar la búsqueda en selects múltiples
    const handleSearchChange = (fieldName, searchTerm) => {
        setSearchTerms(prev => ({
            ...prev,
            [fieldName]: searchTerm
        }));
    };

    // Función para filtrar opciones basado en el término de búsqueda
    const filterOptions = (options, searchTerm) => {
        if (!searchTerm) return options;
        return options.filter(option =>
            option.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    // Función para manejar selección múltiple
    const handleMultiSelectChange = (fieldName, value, checked) => {
        const currentValues = formValues[fieldName] || [];

        if (value === 'all') {
            // Seleccionar/deseleccionar todas las opciones
            const fieldOptions = getFieldOptions(fieldName,
                selectedQuestion?.questioOptions[selectedQuestionOption]?.formFields
                    .find(f => f.name === fieldName)?.options
            );

            if (checked) {
                handleInputChange(fieldName, fieldOptions);
            } else {
                handleInputChange(fieldName, []);
            }
        } else {
            // Seleccionar/deseleccionar opción individual
            let newValues;
            if (checked) {
                newValues = [...currentValues, value];
            } else {
                newValues = currentValues.filter(v => v !== value);
            }
            handleInputChange(fieldName, newValues);
        }
    };

    // Función para toggle del dropdown
    const toggleDropdown = (fieldName) => {
        setDropdownOpen(prev => ({
            ...prev,
            [fieldName]: !prev[fieldName]
        }));
    };

    // Obtener opciones para campos select
    const getFieldOptions = (fieldName, predefinedOptions) => {
        if (predefinedOptions && predefinedOptions.length > 0) {
            return predefinedOptions;
        }

        switch (fieldName) {
            case 'zona':
                return zonas;
            case 'region':
                return regiones;
            case 'vehiculo':
                return vehiculos;
            case 'cliente':
                return clientes;
            case 'planta':
                return plantas;
            default:
                return [];
        }
    };

    // Validar formulario y enviar datos
    const handleSubmit = () => {
        if (!selectedQuestion || selectedQuestionOption === null) {
            alert('Por favor selecciona una pregunta y opción');
            return;
        }

        const selectedOption = selectedQuestion.questioOptions[selectedQuestionOption];
        const requiredFields = selectedOption.formFields.filter(field => field.required);
        const newErrors = {};

        // Validar campos requeridos
        requiredFields.forEach(field => {
            const fieldValue = formValues[field.name];
            const isEmpty =
                fieldValue === undefined ||
                fieldValue === null ||
                (typeof fieldValue === 'string' && fieldValue.trim() === '') ||
                (Array.isArray(fieldValue) && fieldValue.length === 0 && field.required);

            if (isEmpty) {
                newErrors[field.name] = `${field.label} es requerido`;
            }
        });

        // Validación específica para pregunta id 3 con punto de interés temporal
        if (selectedQuestion.id === 3) {
            if (puntoInteresTemporal === 'fecha' && !formValues['fecha_especifica']) {
                newErrors['fecha_especifica'] = 'La fecha específica es requerida';
            } else if (puntoInteresTemporal === 'semana' && !formValues['semana']) {
                newErrors['semana'] = 'La semana es requerida';
            } else if (puntoInteresTemporal === 'mes' && !formValues['mes']) {
                newErrors['mes'] = 'El mes es requerido';
            }
        }

        // Si hay errores, mostrarlos y no enviar
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Limpiar errores si todo está bien
        setErrors({});

        // Preparar datos para envío
        const dataToSend = {
            questionId: selectedFAQ,
            questionTitle: selectedQuestion.title,
            optionIndex: selectedQuestionOption,
            optionTitle: selectedOption.titleQuestion,
            formData: formValues,
            puntoInteresTemporal: selectedQuestion.id === 3 ? puntoInteresTemporal : undefined,
            generatedQuery: preguntaFormulada
        };

        // Por el momento mostrar en consola y alert
        console.log('Datos a enviar:', dataToSend);
        alert(`Consulta enviada:\n${preguntaFormulada}\n\nDatos: ${JSON.stringify(formValues, null, 2)}`);
    };

    const formatearFecha = (fechaISO) => {
        if (!fechaISO) return '';
        const fecha = new Date(fechaISO);
        const fechaFormateada = fecha.toLocaleString('es-CO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        return fechaFormateada.replace(',', '');
    };

    const formatearSemana = (semanaISO) => {
        if (!semanaISO) return '';
        const [year, week] = semanaISO.split('-W');
        return `Semana ${week} del año ${year}`;
    };

    const formatearMes = (mesISO) => {
        if (!mesISO) return '';
        const [year, month] = mesISO.split('-');
        const meses = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        return `${meses[parseInt(month) - 1]} de ${year}`;
    };

    const formularPregunta = () => {
        const preguntaSeleccionada = getSelectedQuestion();

        if (!preguntaSeleccionada || selectedQuestionOption === null) {
            setPreguntaFormulada('');
            return;
        }

        const selectedOption = preguntaSeleccionada.questioOptions[selectedQuestionOption];
        if (!selectedOption) {
            setPreguntaFormulada('');
            return;
        }

        if (preguntaSeleccionada.id === 1) {
            let pregunta = '¿Cuál es el tiempo promedio de permanencia de ';

            // Buscar el campo principal (zona, región o vehículo)
            const campoZona = selectedOption.formFields.find(field => field.name === 'zona');
            const campoRegion = selectedOption.formFields.find(field => field.name === 'region');
            const campoVehiculo = selectedOption.formFields.find(field => field.name === 'vehiculo');

            let campoPrincipal = null;
            let valorCampo = null;

            if (campoZona) {
                campoPrincipal = 'zona';
                valorCampo = formValues['zona'];
            } else if (campoRegion) {
                campoPrincipal = 'region';
                valorCampo = formValues['region'];
            } else if (campoVehiculo) {
                campoPrincipal = 'vehiculo';
                valorCampo = formValues['vehiculo'];
            }

            if (campoPrincipal && valorCampo) {
                if (Array.isArray(valorCampo)) {
                    // Si es un array (selección múltiple)
                    const fieldOptions = getFieldOptions(campoPrincipal,
                        selectedOption.formFields.find(f => f.name === campoPrincipal)?.options
                    );

                    if (valorCampo.length === fieldOptions.length) {
                        // Todas las opciones seleccionadas
                        if (campoPrincipal === 'zona') {
                            pregunta += 'todas las zonas';
                        } else if (campoPrincipal === 'region') {
                            pregunta += 'todas las regiones';
                        } else if (campoPrincipal === 'vehiculo') {
                            pregunta += 'todos los vehículos';
                        }
                    } else if (valorCampo.length > 1) {
                        // Múltiples opciones pero no todas
                        if (campoPrincipal === 'zona') {
                            pregunta += `las zonas ${valorCampo.join(', ')}`;
                        } else if (campoPrincipal === 'region') {
                            pregunta += `las regiones ${valorCampo.join(', ')}`;
                        } else if (campoPrincipal === 'vehiculo') {
                            pregunta += `los vehículos ${valorCampo.join(', ')}`;
                        }
                    } else if (valorCampo.length === 1) {
                        // Una sola opción
                        if (campoPrincipal === 'zona') {
                            pregunta += `la zona ${valorCampo[0]}`;
                        } else if (campoPrincipal === 'region') {
                            pregunta += `la región ${valorCampo[0]}`;
                        } else if (campoPrincipal === 'vehiculo') {
                            pregunta += `el vehículo ${valorCampo[0]}`;
                        }
                    }
                } else {
                    // Si es un string (selección única)
                    if (campoPrincipal === 'zona') {
                        pregunta += `la zona ${valorCampo}`;
                    } else if (campoPrincipal === 'region') {
                        pregunta += `la región ${valorCampo}`;
                    } else if (campoPrincipal === 'vehiculo') {
                        pregunta += `el vehículo ${valorCampo}`;
                    }
                }

                // Agregar filtros de fecha si existen
                const fechaInicio = formValues['fecha_inicio'];
                const fechaFin = formValues['fecha_fin'];

                if (fechaInicio && fechaFin) {
                    pregunta += ` entre el ${formatearFecha(fechaInicio)} y el ${formatearFecha(fechaFin)}`;
                } else if (fechaInicio) {
                    pregunta += ` el ${formatearFecha(fechaInicio)}`;
                } else if (fechaFin) {
                    pregunta += ` hasta el ${formatearFecha(fechaFin)}`;
                }
            }

            pregunta += '?';
            setPreguntaFormulada(pregunta);
        } else if (preguntaSeleccionada.id === 2) {
            // Buscar el campo principal (zona, región o vehículo)
            const campoZona = selectedOption.formFields.find(field => field.name === 'zona');
            const campoRegion = selectedOption.formFields.find(field => field.name === 'region');

            let pregunta = '¿Top  ';
            pregunta += formValues['Top'] || 0;
            if (selectedOption.id === 1) {
                pregunta += ' de regiones con el mayor tiempo promedio de permanencia en '
            } else if (selectedOption.id === 2) {
                pregunta += ' de vehículos con el mayor tiempo promedio de permanencia en '
            } else {
                pregunta += ' de vehículos con el mayor tiempo promedio de permanencia en '
            }

            let campoPrincipal = null;
            let valorCampo = null;

            if (campoZona) {
                campoPrincipal = 'zona';
                valorCampo = formValues['zona'];
            } else if (campoRegion) {
                campoPrincipal = 'region';
                valorCampo = formValues['region'];
            }

            if (campoPrincipal && valorCampo) {
                if (Array.isArray(valorCampo)) {
                    // Si es un array (selección múltiple)
                    const fieldOptions = getFieldOptions(campoPrincipal,
                        selectedOption.formFields.find(f => f.name === campoPrincipal)?.options
                    );

                    if (valorCampo.length === fieldOptions.length) {
                        // Todas las opciones seleccionadas
                        if (campoPrincipal === 'zona') {
                            pregunta += 'todas las zonas';
                        } else if (campoPrincipal === 'region') {
                            pregunta += 'todas las regiones';
                        }
                    } else if (valorCampo.length > 1) {
                        // Múltiples opciones pero no todas
                        if (campoPrincipal === 'zona') {
                            pregunta += `las zonas ${valorCampo.join(', ')}`;
                        } else if (campoPrincipal === 'region') {
                            pregunta += `las regiones ${valorCampo.join(', ')}`;
                        }
                    } else if (valorCampo.length === 1) {
                        // Una sola opción
                        if (campoPrincipal === 'zona') {
                            pregunta += `la zona ${valorCampo[0]}`;
                        } else if (campoPrincipal === 'region') {
                            pregunta += `la región ${valorCampo[0]}`;
                        }
                    }
                } else {
                    // Si es un string (selección única)
                    if (campoPrincipal === 'zona') {
                        pregunta += ` zona ${valorCampo}`;
                    } else if (campoPrincipal === 'region') {
                        pregunta += `la región ${valorCampo}`;
                    }
                }

                // Agregar filtros de fecha si existen
                const fechaInicio = formValues['fecha_inicio'];
                const fechaFin = formValues['fecha_fin'];

                if (fechaInicio && fechaFin) {
                    pregunta += ` entre el ${formatearFecha(fechaInicio)} y el ${formatearFecha(fechaFin)}`;
                } else if (fechaInicio) {
                    pregunta += ` el ${formatearFecha(fechaInicio)}`;
                } else if (fechaFin) {
                    pregunta += ` hasta el ${formatearFecha(fechaFin)}`;
                }
            }

            pregunta += '?';
            setPreguntaFormulada(pregunta);
        } else if (preguntaSeleccionada.id === 3) {
            let pregunta = '¿';

            // Obtener valores de formulario para pregunta id 3
            const campoZona = selectedOption.formFields.find(field => field.name === 'zona');
            const campoRegion = selectedOption.formFields.find(field => field.name === 'region');
            const campoVehiculo = selectedOption.formFields.find(field => field.name === 'vehiculo');
            const campoCliente = selectedOption.formFields.find(field => field.name === 'cliente');
            const campoPlanta = selectedOption.formFields.find(field => field.name === 'planta');

            // Construir la pregunta base según la opción seleccionada
            pregunta += selectedOption.titleQuestion || 'Consulta';

            // Agregar filtros espaciales si existen
            const filtrosEspaciales = [];

            if (campoZona && formValues['zona']) {
                const valorZona = formValues['zona'];
                if (Array.isArray(valorZona)) {
                    if (valorZona.length === zonas.length) {
                        filtrosEspaciales.push('todas las zonas');
                    } else if (valorZona.length > 1) {
                        filtrosEspaciales.push(`las zonas ${valorZona.join(', ')}`);
                    } else if (valorZona.length === 1) {
                        filtrosEspaciales.push(`la zona ${valorZona[0]}`);
                    }
                } else {
                    filtrosEspaciales.push(`la zona ${valorZona}`);
                }
            }

            if (campoRegion && formValues['region']) {
                const valorRegion = formValues['region'];
                if (Array.isArray(valorRegion)) {
                    if (valorRegion.length === regiones.length) {
                        filtrosEspaciales.push('todas las regiones');
                    } else if (valorRegion.length > 1) {
                        filtrosEspaciales.push(`las regiones ${valorRegion.join(', ')}`);
                    } else if (valorRegion.length === 1) {
                        filtrosEspaciales.push(`la región ${valorRegion[0]}`);
                    }
                } else {
                    filtrosEspaciales.push(`la región ${valorRegion}`);
                }
            }

            if (campoVehiculo && formValues['vehiculo']) {
                const valorVehiculo = formValues['vehiculo'];
                if (Array.isArray(valorVehiculo)) {
                    if (valorVehiculo.length === vehiculos.length) {
                        filtrosEspaciales.push('todos los vehículos');
                    } else if (valorVehiculo.length > 1) {
                        filtrosEspaciales.push(`los vehículos ${valorVehiculo.join(', ')}`);
                    } else if (valorVehiculo.length === 1) {
                        filtrosEspaciales.push(`el vehículo ${valorVehiculo[0]}`);
                    }
                } else {
                    filtrosEspaciales.push(`el vehículo ${valorVehiculo}`);
                }
            }

            if (campoCliente && formValues['cliente']) {
                const valorCliente = formValues['cliente'];
                if (Array.isArray(valorCliente)) {
                    if (valorCliente.length === clientes.length) {
                        filtrosEspaciales.push('todos los clientes');
                    } else if (valorCliente.length > 1) {
                        filtrosEspaciales.push(`los clientes ${valorCliente.join(', ')}`);
                    } else if (valorCliente.length === 1) {
                        filtrosEspaciales.push(`el cliente ${valorCliente[0]}`);
                    }
                } else {
                    filtrosEspaciales.push(`el cliente ${valorCliente}`);
                }
            }

            if (campoPlanta && formValues['planta']) {
                const valorPlanta = formValues['planta'];
                if (Array.isArray(valorPlanta)) {
                    if (valorPlanta.length === plantas.length) {
                        filtrosEspaciales.push('todas las plantas');
                    } else if (valorPlanta.length > 1) {
                        filtrosEspaciales.push(`las plantas ${valorPlanta.join(', ')}`);
                    } else if (valorPlanta.length === 1) {
                        filtrosEspaciales.push(`la planta ${valorPlanta[0]}`);
                    }
                } else {
                    filtrosEspaciales.push(`la planta ${valorPlanta}`);
                }
            }

            if (filtrosEspaciales.length > 0) {
                pregunta += ` en ${filtrosEspaciales.join(', ')}`;
            }

            // Agregar filtro temporal según el tipo seleccionado
            if (puntoInteresTemporal === 'fecha' && formValues['fecha_especifica']) {
                pregunta += ` el ${formatearFecha(formValues['fecha_especifica'])}`;
            } else if (puntoInteresTemporal === 'semana' && formValues['semana']) {
                pregunta += ` en la ${formatearSemana(formValues['semana'])}`;
            } else if (puntoInteresTemporal === 'mes' && formValues['mes']) {
                pregunta += ` en ${formatearMes(formValues['mes'])}`;
            }

            pregunta += '?';
            setPreguntaFormulada(pregunta);
        }
    };

    useEffect(() => {
        formularPregunta();
    }, [selectedFAQ, selectedQuestionOption, formValues, puntoInteresTemporal]);

    // Limpiar valores del formulario cuando cambie la selección
    useEffect(() => {
        const defaults = {};

        // Si la opción seleccionada requiere un campo 'Top', le ponemos un valor por defecto (ej. 3)
        const selectedOption = selectedQuestion?.questioOptions?.[selectedQuestionOption];
        const topField = selectedOption?.formFields?.find(f => f.name === 'Top');
        if (topField) {
            defaults['Top'] = 0;
        }

        setFormValues(defaults);
        setErrors({});
        setSearchTerms({});
        setDropdownOpen({});
        setPuntoInteresTemporal('fecha'); // Reset al valor por defecto
    }, [selectedFAQ, selectedQuestionOption]);

    // Auto-seleccionar la primera opción cuando se selecciona una pregunta
    useEffect(() => {
        if (selectedFAQ && selectedQuestion && selectedQuestion.questioOptions.length > 0 && selectedQuestionOption === null) {
            setSelectedQuestionOption(0);
        }
    }, [selectedFAQ, selectedQuestion, selectedQuestionOption, setSelectedQuestionOption]);

    // Cerrar dropdowns cuando se hace clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Cerrar todos los dropdowns si se hace clic fuera
            if (!event.target.closest('.dropdown-container')) {
                setDropdownOpen({});
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Renderizar campo del formulario
    const renderFormField = (field) => {
        const { name, label, type, required, options, unique } = field;
        const fieldOptions = getFieldOptions(name, options);
        const hasError = errors[name];
        const searchTerm = searchTerms[name] || '';
        const isDropdownOpen = dropdownOpen[name] || false;

        switch (type) {
            case 'date':
                return (
                    <div className="space-y-2">
                        <label htmlFor={name} className={`block text-sm font-medium ${hasError ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>
                            {label} {required && <span className="text-red-500">*</span>}
                        </label>
                        <div className="relative w-full">
                            <input
                                type='datetime-local'
                                id={name}
                                name={name}
                                value={formValues[name] || ''}
                                onChange={(e) => handleInputChange(name, e.target.value)}
                                required={required}
                                className={`w-full h-12 p-3 pr-10 border rounded-lg shadow-sm focus:outline-none bg-gray-50 dark:bg-zinc-800 text-zinc-600 dark:text-white transition-all duration-200 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer ${hasError
                                    ? 'border-red-500 dark:border-red-400'
                                    : 'border-gray-300 dark:border-zinc-700'
                                    }`}
                                style={{
                                    WebkitAppearance: 'none',
                                    MozAppearance: 'textfield'
                                }}
                            />
                            <Calendar
                                className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer ${hasError ? 'text-red-400 dark:text-red-500' : 'text-gray-400 dark:text-zinc-500'
                                    }`}
                                onClick={() => document.getElementById(name).showPicker?.()}
                            />
                        </div>
                        {hasError && (
                            <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                <span className="font-medium">⚠</span>
                                {hasError}
                            </p>
                        )}
                    </div>
                );

            case 'select':
                // Select único con búsqueda
                if (unique === true || unique === undefined) {
                    const filteredOptions = filterOptions(fieldOptions, searchTerm);

                    return (
                        <div className="space-y-2">
                            <label htmlFor={name} className={`block text-sm font-medium ${hasError ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                {label} {required && <span className="text-red-500">*</span>}
                            </label>

                            <div className="relative dropdown-container">
                                {/* Campo de selección única con búsqueda */}
                                <div
                                    onClick={() => toggleDropdown(name)}
                                    className={`w-full h-12 p-3 pr-10 border rounded-lg shadow-sm cursor-pointer bg-gray-50 dark:bg-zinc-800 text-zinc-600 dark:text-white transition-all duration-200 flex items-center justify-between ${hasError
                                        ? 'border-red-500 dark:border-red-400'
                                        : 'border-gray-300 dark:border-zinc-700'
                                        }`}
                                >
                                    <span className="truncate">
                                        {formValues[name] || "-- Selecciona una opción --"}
                                    </span>
                                    <ChevronDown
                                        className={`w-5 h-5 pointer-events-none transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''
                                            } ${hasError ? 'text-red-400 dark:text-red-500' : 'text-gray-400 dark:text-zinc-500'}`}
                                    />
                                </div>

                                {/* Dropdown con opciones */}
                                {isDropdownOpen && (
                                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg shadow-lg max-h-64 overflow-hidden">
                                        {/* Buscador */}
                                        <div className="p-3 border-b border-gray-200 dark:border-zinc-700">
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-zinc-500" />
                                                <input
                                                    type="text"
                                                    placeholder="Buscar opciones..."
                                                    value={searchTerm}
                                                    onChange={(e) => handleSearchChange(name, e.target.value)}
                                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-md text-sm bg-gray-50 dark:bg-zinc-700 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    onClick={(e) => e.stopPropagation()}
                                                    autoFocus
                                                />
                                            </div>
                                        </div>

                                        {/* Lista de opciones */}
                                        <div className="max-h-48 overflow-y-auto">
                                            {/* Opción para limpiar selección */}
                                            {formValues[name] && (
                                                <div
                                                    className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer border-b border-gray-100 dark:border-zinc-700"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleInputChange(name, '');
                                                        toggleDropdown(name);
                                                    }}
                                                >
                                                    <X className="w-4 h-4 text-gray-400 dark:text-zinc-500 mr-3" />
                                                    <span className="text-sm text-gray-500 dark:text-zinc-400 italic">
                                                        Limpiar selección
                                                    </span>
                                                </div>
                                            )}

                                            {/* Opciones filtradas */}
                                            {filteredOptions.length > 0 ? (
                                                filteredOptions.map((option, index) => (
                                                    <div
                                                        key={index}
                                                        className={`flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer ${formValues[name] === option
                                                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                                                : 'text-gray-700 dark:text-white'
                                                            }`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleInputChange(name, option);
                                                            toggleDropdown(name);
                                                        }}
                                                    >
                                                        {formValues[name] === option && (
                                                            <div className="w-4 h-4 mr-3 flex items-center justify-center">
                                                                <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                                                            </div>
                                                        )}
                                                        <span className={`text-sm ${formValues[name] !== option ? 'ml-7' : ''}`}>
                                                            {option}
                                                        </span>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="px-3 py-2 text-sm text-gray-500 dark:text-zinc-400">
                                                    No se encontraron opciones
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {hasError && (
                                <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                    <span className="font-medium">⚠</span>
                                    {hasError}
                                </p>
                            )}
                        </div>
                    );
                }

                // Select múltiple con checkboxes (cuando unique es false)
                const currentValues = formValues[name] || [];
                const filteredOptions = filterOptions(fieldOptions, searchTerm);
                const allSelected = fieldOptions.length > 0 && currentValues.length === fieldOptions.length;
                const someSelected = currentValues.length > 0 && currentValues.length < fieldOptions.length;

                return (
                    <div className="space-y-2">
                        <label className={`block text-sm font-medium ${hasError ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>
                            {label} {required && <span className="text-red-500">*</span>}
                        </label>

                        <div className="relative dropdown-container">
                            {/* Campo de selección múltiple */}
                            <div
                                onClick={() => toggleDropdown(name)}
                                className={`w-full h-12 p-3 pr-10 border rounded-lg shadow-sm cursor-pointer bg-gray-50 dark:bg-zinc-800 text-zinc-600 dark:text-white transition-all duration-200 flex items-center justify-between ${hasError
                                    ? 'border-red-500 dark:border-red-400'
                                    : 'border-gray-300 dark:border-zinc-700'
                                    }`}
                            >
                                <span className="truncate">
                                    {currentValues.length === 0
                                        ? "-- Selecciona opciones --"
                                        : `${currentValues.length} opción${currentValues.length !== 1 ? 'es' : ''} seleccionada${currentValues.length !== 1 ? 's' : ''}`
                                    }
                                </span>
                                <ChevronDown
                                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none ${hasError ? 'text-red-400 dark:text-red-500' : 'text-gray-400 dark:text-zinc-500'
                                        }`}
                                />

                            </div>

                            {/* Dropdown con opciones */}
                            {isDropdownOpen && (
                                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg shadow-lg max-h-64 overflow-hidden">
                                    {/* Buscador */}
                                    <div className="p-3 border-b border-gray-200 dark:border-zinc-700">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-zinc-500" />
                                            <input
                                                type="text"
                                                placeholder="Buscar opciones..."
                                                value={searchTerm}
                                                onChange={(e) => handleSearchChange(name, e.target.value)}
                                                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-md text-sm bg-gray-50 dark:bg-zinc-700 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </div>
                                    </div>

                                    {/* Lista de opciones */}
                                    <div className="max-h-48 overflow-y-auto">
                                        {/* Opción "Seleccionar todas" */}
                                        <div
                                            className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer border-b border-gray-100 dark:border-zinc-700"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleMultiSelectChange(name, 'all', !allSelected);
                                            }}
                                        >
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    checked={allSelected}
                                                    ref={(input) => {
                                                        if (input) input.indeterminate = someSelected;
                                                    }}
                                                    onChange={() => { }} // Manejado por el onClick del div
                                                    className="w-4 h-4 text-blue-600 border-gray-300 dark:border-zinc-600 rounded focus:ring-blue-500"
                                                />
                                            </div>
                                            <span className="ml-3 text-sm font-medium text-gray-700 dark:text-white">
                                                Seleccionar todas
                                            </span>
                                        </div>

                                        {/* Opciones individuales */}
                                        {filteredOptions.length > 0 ? (
                                            filteredOptions.map((option, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleMultiSelectChange(name, option, !currentValues.includes(option));
                                                    }}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={currentValues.includes(option)}
                                                        onChange={() => { }} // Manejado por el onClick del div
                                                        className="w-4 h-4 text-blue-600 border-gray-300 dark:border-zinc-600 rounded focus:ring-blue-500"
                                                    />
                                                    <span className="ml-3 text-sm text-gray-700 dark:text-white">
                                                        {option}
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-3 py-2 text-sm text-gray-500 dark:text-zinc-400">
                                                No se encontraron opciones
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mostrar selecciones actuales */}
                        {currentValues.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {allSelected ? (
                                    // Mostrar solo "Todas" cuando todas las opciones están seleccionadas
                                    <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md">
                                        Todas
                                        <button
                                            type="button"
                                            onClick={() => handleMultiSelectChange(name, 'all', false)}
                                            className="ml-1 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ) : (
                                    // Mostrar opciones individuales cuando no todas están seleccionadas
                                    currentValues.map((value, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md"
                                        >
                                            {value}
                                            <button
                                                type="button"
                                                onClick={() => handleMultiSelectChange(name, value, false)}
                                                className="ml-1 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))
                                )}
                            </div>
                        )}

                        {hasError && (
                            <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                <span className="font-medium">⚠</span>
                                {hasError}
                            </p>
                        )}
                    </div>
                );
            case 'number':
                return (
                    <div className="space-y-2">
                        <label htmlFor={name} className={`block text-sm font-medium ${hasError ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>
                            {label} {required && <span className="text-red-500">*</span>}
                        </label>
                        <div className="relative w-full">
                            <input
                                type='number'
                                id={name}
                                name={name}
                                min="3" max="20" value={formValues[name] ?? 0}
                                onChange={(e) => handleInputChange(name, Number(e.target.value))}
                                required={required}
                                className={`w-full h-12 p-3 pr-10 border rounded-lg shadow-sm focus:outline-none bg-gray-50 dark:bg-zinc-800 text-zinc-600 dark:text-white transition-all duration-200 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer ${hasError
                                    ? 'border-red-500 dark:border-red-400'
                                    : 'border-gray-300 dark:border-zinc-700'
                                    }`}
                                style={{
                                    WebkitAppearance: 'none',
                                    MozAppearance: 'textfield'
                                }}
                            />

                        </div>
                        {hasError && (
                            <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                <span className="font-medium">⚠</span>
                                {hasError}
                            </p>
                        )}
                    </div>
                );

            case 'text':
            default:
                return (
                    <div className="space-y-2">
                        <label htmlFor={name} className={`block text-sm font-medium ${hasError ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>
                            {label} {required && <span className="text-red-500">*</span>}
                        </label>
                        <input
                            type="text"
                            id={name}
                            name={name}
                            value={formValues[name] || ''}
                            onChange={(e) => handleInputChange(name, e.target.value)}
                            required={required}
                            className={`w-full h-12 p-3 border rounded-lg shadow-sm focus:outline-none bg-gray-50 dark:bg-zinc-800 text-zinc-600 dark:text-white transition-all duration-200 ${hasError
                                ? 'border-red-500 dark:border-red-400'
                                : 'border-gray-300 dark:border-zinc-700'
                                }`}
                            placeholder={`Ingresa ${label.toLowerCase()}`}
                        />
                        {hasError && (
                            <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                <span className="font-medium">⚠</span>
                                {hasError}
                            </p>
                        )}
                    </div>
                );
        }
    };

    // Renderizar selector de punto de interés temporal para pregunta id 3
    const renderPuntoInteresTemporalSelector = () => {
        if (selectedQuestion?.id !== 3) return null;

        const hasTemporalError = errors['fecha_especifica'] || errors['semana'] || errors['mes'];

        return (
            <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                    Punto de interés temporal
                </label>
                <div className="flex gap-1 bg-gray-100 border border-gray-200 p-1 rounded-lg shadow-sm dark:bg-zinc-800 dark:border-zinc-700">
                    <button
                        type="button"
                        onClick={() => handlePuntoInteresTemporalChange('fecha')}
                        className={`flex-1 px-4 py-2 text-sm rounded-md transition-all ${puntoInteresTemporal === 'fecha'
                            ? 'bg-white text-gray-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-300'
                            : 'text-gray-600 hover:text-gray-900 hover:dark:text-zinc-300 dark:text-zinc-500'
                            }`}
                    >
                        Fecha
                    </button>
                    <button
                        type="button"
                        onClick={() => handlePuntoInteresTemporalChange('semana')}
                        className={`flex-1 px-4 py-2 text-sm rounded-md transition-all ${puntoInteresTemporal === 'semana'
                            ? 'bg-white text-gray-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-300'
                            : 'text-gray-600 hover:text-gray-900 hover:dark:text-zinc-300 dark:text-zinc-500'
                            }`}
                    >
                        Semana
                    </button>
                    <button
                        type="button"
                        onClick={() => handlePuntoInteresTemporalChange('mes')}
                        className={`flex-1 px-4 py-2 text-sm rounded-md transition-all ${puntoInteresTemporal === 'mes'
                            ? 'bg-white text-gray-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-300'
                            : 'text-gray-600 hover:text-gray-900 hover:dark:text-zinc-300 dark:text-zinc-500'
                            }`}
                    >
                        Mes
                    </button>
                </div>

                {/* Input según el tipo seleccionado */}
                <div className="mt-3">
                    {puntoInteresTemporal === 'fecha' && (
                        <div className="space-y-2">
                            <label htmlFor="fecha_especifica" className={`block text-sm font-medium ${hasTemporalError ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                Fecha específica <span className="text-red-500">*</span>
                            </label>
                            <div className="relative w-full">
                                <input
                                    type="datetime-local"
                                    id="fecha_especifica"
                                    name="fecha_especifica"
                                    value={formValues['fecha_especifica'] || ''}
                                    onChange={(e) => handleInputChange('fecha_especifica', e.target.value)}
                                    className={`w-full h-12 p-3 pr-10 border rounded-lg shadow-sm focus:outline-none bg-gray-50 dark:bg-zinc-800 text-zinc-600 dark:text-white transition-all duration-200 ${errors['fecha_especifica']
                                        ? 'border-red-500 dark:border-red-400'
                                        : 'border-gray-300 dark:border-zinc-700'
                                        }`}
                                />
                                <Calendar
                                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer ${errors['fecha_especifica'] ? 'text-red-400 dark:text-red-500' : 'text-gray-400 dark:text-zinc-500'
                                        }`}
                                    onClick={() => document.getElementById('fecha_especifica').showPicker?.()}
                                />
                            </div>
                            {errors['fecha_especifica'] && (
                                <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                    <span className="font-medium">⚠</span>
                                    {errors['fecha_especifica']}
                                </p>
                            )}
                        </div>
                    )}

                    {puntoInteresTemporal === 'semana' && (
                        <div className="space-y-2">
                            <label htmlFor="semana" className={`block text-sm font-medium ${hasTemporalError ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                Semana <span className="text-red-500">*</span>
                            </label>
                            <div className="relative w-full">
                                <input
                                    type="week"
                                    id="semana"
                                    name="semana"
                                    value={formValues['semana'] || ''}
                                    onChange={(e) => handleInputChange('semana', e.target.value)}
                                    className={`w-full h-12 p-3 pr-10 border rounded-lg shadow-sm focus:outline-none bg-gray-50 dark:bg-zinc-800 text-zinc-600 dark:text-white transition-all duration-200 ${errors['semana']
                                        ? 'border-red-500 dark:border-red-400'
                                        : 'border-gray-300 dark:border-zinc-700'
                                        }`}
                                />
                                <CalendarDays
                                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer ${errors['semana'] ? 'text-red-400 dark:text-red-500' : 'text-gray-400 dark:text-zinc-500'
                                        }`}
                                    onClick={() => document.getElementById('semana').showPicker?.()}
                                />
                            </div>
                            {errors['semana'] && (
                                <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                    <span className="font-medium">⚠</span>
                                    {errors['semana']}
                                </p>
                            )}
                        </div>
                    )}

                    {puntoInteresTemporal === 'mes' && (
                        <div className="space-y-2">
                            <label htmlFor="mes" className={`block text-sm font-medium ${hasTemporalError ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                Mes <span className="text-red-500">*</span>
                            </label>
                            <div className="relative w-full">
                                <input
                                    type="month"
                                    id="mes"
                                    name="mes"
                                    value={formValues['mes'] || ''}
                                    onChange={(e) => handleInputChange('mes', e.target.value)}
                                    className={`w-full h-12 p-3 pr-10 border rounded-lg shadow-sm focus:outline-none bg-gray-50 dark:bg-zinc-800 text-zinc-600 dark:text-white transition-all duration-200 ${errors['mes']
                                        ? 'border-red-500 dark:border-red-400'
                                        : 'border-gray-300 dark:border-zinc-700'
                                        }`}
                                />
                                <Calendar
                                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer ${errors['mes'] ? 'text-red-400 dark:text-red-500' : 'text-gray-400 dark:text-zinc-500'
                                        }`}
                                    onClick={() => document.getElementById('mes').showPicker?.()}
                                />
                            </div>
                            {errors['mes'] && (
                                <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                    <span className="font-medium">⚠</span>
                                    {errors['mes']}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpenFAQ ? "opacity-100 visible backdrop-blur-sm" : "opacity-0 invisible"}`}
            style={{ backgroundColor: isOpenFAQ ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)", }}>
            {/* Modal Container  */}
            <div className={`bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-[95vw] xl:max-w-[90vw] max-h-[90vh] overflow-hidden transition-all duration-300 transform ${isOpenFAQ ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"}`}>
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
                            {/* Seleccionar pregunta */}
                            <div className="bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-600/30 rounded-lg flex items-center justify-center">
                                        <ShieldQuestionMark className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                        Selección de Consulta
                                    </h3>
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="question-select" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                                        Selecciona una pregunta:
                                    </label>
                                    <div className="relative w-full">
                                        <select
                                            id="question-select"
                                            value={selectedFAQ}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setSelectedFAQ(value ? parseInt(value) : null);
                                                setSelectedQuestionOption(null);
                                            }}
                                            className="w-full h-12 p-3 pr-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none appearance-none bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 text-zinc-600 dark:text-white"
                                        >
                                            <option value="">-- Selecciona una opción --</option>
                                            {questions.map((question) => (
                                                <option key={question.id} value={question.id}>
                                                    {question.title}
                                                </option>
                                            ))}
                                        </select>

                                        {/* Ícono de flecha */}
                                        <div className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
                                            <ChevronDown className="w-5 h-5" />
                                        </div>
                                    </div>

                                </div>

                                {selectedFAQ !== null && getSelectedQuestion() && (
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

                                {selectedQuestion && (
                                    <div className="space-y-3 mt-3">
                                        {selectedQuestion.questioOptions.map((option, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedQuestionOption(index)}
                                                className={`w-full p-4 rounded-md text-left transition-all duration-300 group ring-1 hover:transform hover:scale-[1.01] ${selectedQuestionOption === index
                                                    ? 'bg-white dark:bg-zinc-900 text-gray-800 dark:text-white shadow-lg transform scale-[1.02] ring-blue-600'
                                                    : ' bg-gray-50 dark:bg-zinc-800 text-gray-700 dark:text-white hover:bg-white hover:dark:bg-zinc-900 ring-gray-200 dark:ring-zinc-700 shadow-sm hover:shadow-md'
                                                    }`}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className={`p-2 rounded-xl transition-all duration-300 ${selectedQuestionOption === index
                                                        ? 'bg-gray-200 dark:bg-zinc-700'
                                                        : 'bg-gray-200 dark:bg-zinc-700 group-hover:bg-gray-200 group-hover:dark:bg-zinc-600'
                                                        }`}>
                                                        {React.cloneElement(selectedQuestion.icon, {
                                                            className: `w-5 h-5 transition-colors duration-300 ${selectedQuestionOption === index
                                                                ? 'text-gray-600 dark:text-zinc-300'
                                                                : 'text-gray-500 dark:text-zinc-300 group-hover:text-gray-600 dark:group-hover:text-white'
                                                                }`
                                                        })}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-base">{option.titleQuestion}</h3>
                                                        <p className={`text-sm transition-colors duration-300 ${selectedQuestionOption === index
                                                            ? 'text-gray-500 dark:text-zinc-400'
                                                            : 'text-gray-400 dark:text-zinc-400 group-hover:text-gray-500'
                                                            }`}>
                                                            {option.formFields.length} campos disponibles
                                                        </p>
                                                    </div>
                                                    <div className="p-1 rounded-lg transition-all duration-300">
                                                        <ChevronRight className={`w-5 h-5 transition-all duration-300 ${selectedQuestionOption === index
                                                            ? 'text-gray-500 dark:text-zinc-400 opacity-100'
                                                            : 'text-gray-300 dark:text-zinc-500 opacity-60 group-hover:opacity-100 group-hover:text-gray-400'
                                                            }`} />
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sección de Formulación de la pregunta */}
                        <div className="flex-1 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-600/30 rounded-lg flex items-center justify-center">
                                    <TextCursorInput className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                    Formulación de la pregunta
                                </h3>
                            </div>

                            {/* Campos del formulario */}
                            {selectedQuestion && selectedQuestionOption !== null && (
                                <div className="space-y-4 mb-4">
                                    {selectedQuestion.questioOptions[selectedQuestionOption].formFields.map(field => (
                                        <div key={field.name} className="w-full">
                                            {renderFormField(field)}
                                        </div>
                                    ))}

                                    {/* Selector de punto de interés temporal para pregunta id 3 */}
                                    {renderPuntoInteresTemporalSelector()}
                                </div>
                            )}

                            <div className="mt-3 bg-zinc-50 dark:bg-[#131315] ring-1 ring-zinc-200 dark:ring-zinc-800 h-32 sm:h-24 w-full rounded-2xl flex flex-col flex-shrink-0">
                                <div className="w-full flex-1 p-2">
                                    <textarea
                                        className="w-full h-full resize-none outline-none ring-0 focus:ring-0 focus:outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-zinc-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-700 dark:text-zinc-400 bg-transparent text-sm"
                                        value={preguntaFormulada}
                                        placeholder="Selecciona una pregunta y completa los filtros para ver la consulta generada..."
                                        readOnly
                                    ></textarea>
                                </div>
                                <div className="flex justify-end px-2 pb-2 flex-shrink-0">
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={!preguntaFormulada}
                                        className="bg-gradient-to-r from-blue-800 to-blue-600 hover:from-blue-700 hover:to-blue-500 disabled:from-gray-400 disabled:to-gray-300 disabled:cursor-not-allowed text-white rounded-lg p-1.5 transition-all duration-300 hover:scale-105 active:scale-95 disabled:hover:scale-100"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 512 512">
                                            <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                                        </svg>
                                    </button>
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