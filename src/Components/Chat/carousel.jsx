import React from 'react';
import { useRef } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/swiper-bundle.css';

import { Clock,Medal,TrendingUpDown  } from 'lucide-react';

const questions = [
  {
    id: 1,
    title: "Tiempos de Espera y Permanencia",
    icon: <Clock className="text-blue-700 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 group-hover:text-white" />,
    description: "Consultas relacionadas con el tiempo promedio que los vehículos permanecen en distintas regiones o zonas, segmentadas por fechas específicas o periodos definidos."
  },
  {
    id: 2,
    title: "Ranking de tiempos críticos",
    icon: <Medal className="text-blue-700 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 group-hover:text-white" />,
    description: "Preguntas que permiten analizar rankings críticos de tiempos de permanencia de los vehículos, segmentados por tipo de vehículo, zona, región y periodos definidos."
  },
  {
    id: 3,
    title: "Tendencias y Cumplimiento",
    icon: <TrendingUpDown  className="text-blue-700 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 group-hover:text-white" />,
    description: "Preguntas enfocadas en analizar la evolución del comportamiento operativo y el cumplimiento de tiempos por región, zona o vehículo, a lo largo de distintos periodos."
  },
];

const ActiveSlider = () => {
  const swiperRef = useRef(null);
  
  return (
    <div className="w-full mx-auto">
      <Swiper
        className="w-full"
        modules={[A11y, Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1} // Por defecto 1 slide en móviles
        breakpoints={{
          768: {
            slidesPerView: 2, // Exactamente 2 slides en pantallas grandes
            spaceBetween: 20,
          }
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
        }}
        loop={true} // Loop habilitado
        centeredSlides={false}
        watchOverflow={true} // Previene overflow
      >
        {[...questions, ...questions].map((pr, index) => (
          <SwiperSlide key={index}>
            <div className="w-full bg-zinc-100 dark:bg-[#0f0f10] rounded-2xl px-4 py-5 shadow-md group hover:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200">
              <div className="flex items-center w-full text-left">
                {/* Icono */}
                <div className="w-1/5 flex justify-center">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-600/10 dark:bg-blue-950/40 text-blue-400 group-hover:bg-white/20 group-hover:text-white transition-colors duration-200">
                    {pr.icon}
                  </div>
                </div>
                                
                {/* Texto */}
                <div className="w-4/5 flex flex-col pl-3 justify-center">
                  <p className="text-sm text-zinc-400 font-medium leading-none group-hover:text-blue-100 transition-colors duration-200">
                    <span className="font-bold text-blue-400 group-hover:text-white">Preguntas</span> Frecuentes
                  </p>
                  <p className="text-xl uppercase text-zinc-600 dark:text-zinc-300 leading-none group-hover:text-white transition-colors duration-200">
                    {pr.title}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Paginación personalizada */}
      <div className="custom-pagination flex justify-center mt-4"></div>
    </div>
  );
};

export default ActiveSlider;