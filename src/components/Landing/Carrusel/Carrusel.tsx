import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const CarouselBanner = () => {
  const slides = [
    {
      title: 'Eventix',
      text: 'Organize, create, and manage',
      buttonLabel: 'Learn More',
    },
    {
      title: 'Eventix',
      text: 'Organize, create, and manage',
      buttonLabel: 'Get Started',
    },
    {
      title: 'Eventix',
      text: 'Organize, create, and manage',
      buttonLabel: 'Discover',
    },
  ];

  return (
    <Swiper
      pagination={{ clickable: true }}
      navigation={true}
      autoplay={{
        delay: 3000, // 3 segundos
        disableOnInteraction: false,
      }}
      modules={[Pagination, Navigation, Autoplay]}
      className="mySwiper"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="banner-slide">
            <h1>{slide.title}</h1>
            <p>{slide.text}</p>
            <button>{slide.buttonLabel}</button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CarouselBanner;
