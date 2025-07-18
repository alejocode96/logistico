// Importación de librerías necesarias
import React, { useState, useEffect } from 'react';

//contexto
import { LogisticoContext } from '../../Context';

import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer
} from 'recharts';

/**
 * Componente de gráfico de área animado.
 * Muestra diferentes datasets (ventas, tráfico, engagement, etc.)
 * que rotan automáticamente cada 4 segundos.
 * Soporta modo oscuro y claro.
 */
const AnimatedAreaChart = () => {
    const [currentDataset, setCurrentDataset] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { isDark, toggleDarkMode } = React.useContext(LogisticoContext);


    // Conjuntos de datos simulados
    const datasets = [
        {
            name: "Ventas Mensuales",
            data: [
                { mes: 'Ene', ventas: 4000, marketing: 2400, soporte: 2400 },
                { mes: 'Feb', ventas: 3000, marketing: 1398, soporte: 2210 },
                { mes: 'Mar', ventas: 2000, marketing: 9800, soporte: 2290 },
                { mes: 'Abr', ventas: 2780, marketing: 3908, soporte: 2000 },
                { mes: 'May', ventas: 1890, marketing: 4800, soporte: 2181 },
                { mes: 'Jun', ventas: 2390, marketing: 3800, soporte: 2500 },
                { mes: 'Jul', ventas: 3490, marketing: 4300, soporte: 2100 },
            ],
            colors: ['#9CA3AF', '#A1A1AA', '#52525B']
        },
        {
            name: "Tráfico Web",
            data: [
                { mes: 'Ene', ventas: 2400, marketing: 4000, soporte: 1400 },
                { mes: 'Feb', ventas: 1398, marketing: 3000, soporte: 3210 },
                { mes: 'Mar', ventas: 9800, marketing: 2000, soporte: 1290 },
                { mes: 'Abr', ventas: 3908, marketing: 2780, soporte: 4000 },
                { mes: 'May', ventas: 4800, marketing: 1890, soporte: 3181 },
                { mes: 'Jun', ventas: 3800, marketing: 2390, soporte: 1500 },
                { mes: 'Jul', ventas: 4300, marketing: 3490, soporte: 2900 },
            ],
            colors: ['#9CA3AF', '#D1D5DB', '#52525B']
        },
        {
            name: "Engagement Social",
            data: [
                { mes: 'Ene', ventas: 1000, marketing: 3200, soporte: 3200 },
                { mes: 'Feb', ventas: 3200, marketing: 1200, soporte: 4200 },
                { mes: 'Mar', ventas: 4500, marketing: 2800, soporte: 1800 },
                { mes: 'Abr', ventas: 2200, marketing: 4200, soporte: 2800 },
                { mes: 'May', ventas: 3800, marketing: 2200, soporte: 3600 },
                { mes: 'Jun', ventas: 4200, marketing: 3600, soporte: 2200 },
                { mes: 'Jul', ventas: 2800, marketing: 4800, soporte: 3200 },
            ],
            colors: ['#9CA3AF', '#A1A1AA', '#4B5563']
        },
        {
            name: "Revenue Streams",
            data: [
                { mes: 'Ene', ventas: 3500, marketing: 2800, soporte: 1800 },
                { mes: 'Feb', ventas: 2200, marketing: 3800, soporte: 2600 },
                { mes: 'Mar', ventas: 4200, marketing: 1600, soporte: 3400 },
                { mes: 'Abr', ventas: 1800, marketing: 4600, soporte: 2200 },
                { mes: 'May', ventas: 3600, marketing: 2400, soporte: 3800 },
                { mes: 'Jun', ventas: 2800, marketing: 3200, soporte: 2800 },
                { mes: 'Jul', ventas: 4400, marketing: 2600, soporte: 3600 },
            ],
            colors: ['#71717A', '#A1A1AA', '#52525B']
        }
    ];

    // Cambiar dataset cada 4 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDataset((prev) => (prev + 1) % datasets.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const currentData = datasets[currentDataset];



    return (
       
            <ResponsiveContainer width="100%" height={200}>
                <AreaChart
                    data={currentData.data}
                    margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
                >
                    <defs>
                        <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={currentData.colors[0]} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={currentData.colors[0]} stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="colorMarketing" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={currentData.colors[1]} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={currentData.colors[1]} stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="colorSoporte" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={currentData.colors[2]} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={currentData.colors[2]} stopOpacity={0.1} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(55, 65, 81, 0.6)':'#D1D5DB'} />
                    <XAxis
                        dataKey="mes"
                        stroke={isDark ? '#4B5563':'#9CA3AF'}
                        fontSize={14}
                        fontWeight="500"
                    />
                    <YAxis
                         stroke={isDark ? '#4B5563':'#9CA3AF'}
                        fontSize={12}
                    />

                    <Area
                        type="monotone"
                        dataKey="soporte"
                        stackId="1"
                        stroke={currentData.colors[2]}
                        strokeWidth={2}
                        fill="url(#colorSoporte)"
                        animationDuration={2000}
                        animationBegin={0}
                    />
                    <Area
                        type="monotone"
                        dataKey="marketing"
                        stackId="1"
                        stroke={currentData.colors[1]}
                        strokeWidth={2}
                        fill="url(#colorMarketing)"
                        animationDuration={2000}
                        animationBegin={500}
                    />
                    <Area
                        type="monotone"
                        dataKey="ventas"
                        stackId="1"
                        stroke={currentData.colors[0]}
                        strokeWidth={2}
                        fill="url(#colorVentas)"
                        animationDuration={2000}
                        animationBegin={1000}
                    />
                </AreaChart>
            </ResponsiveContainer>
        
    );
};

export default AnimatedAreaChart;
