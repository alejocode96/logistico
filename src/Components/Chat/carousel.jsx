import React from 'react';
import { useRef } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/swiper-bundle.css';



// Contexto
import { LogisticoContext } from '../../Context';



const ActiveSlider = () => {
  const swiperRef = useRef(null);
  const {
    isOpenFAQ, setIsOpenFAQ, selectedFAQ, setSelectedFAQ, formData, setFormData, handleSlideClick, questions
  } = React.useContext(LogisticoContext);


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
            <div className="cursor-pointer w-[99%] bg-zinc-100 dark:bg-[#1a1a1c] rounded-2xl px-4 py-5 m-1 shadow-md group hover:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200"
                 onClick={() => handleSlideClick(pr.id)}>
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