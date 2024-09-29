import React from "react";
import "./Host.css";
import profiles from "../data/data";
import HostEvents from "./Host";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css/bundle"
import "swiper/css/pagination"


const Host: React.FC = () => {

  const extendedProfiles = [...profiles, ...profiles];  // Duplicar el array para más slides
  return (
    <div id="Host_card">
      <h2 id="host_tittle">You are Host</h2>
      <div id="carousel">
      <Swiper
          spaceBetween={0}   
          slidesPerView={3}  
          slidesPerGroup={3}   
          navigation ={false}     
          pagination={{ clickable: true }}  
          loop={false}         
        >{extendedProfiles.map((profile, index) => (
          <SwiperSlide key={index}>
         <HostEvents
           key={index}
           ocation={profile.Ocation}
           date={profile.Date}
           url={profile.EventImg}
         />
         </SwiperSlide>
       ))}
  </Swiper>
      </div>
    </div>
  );
};

export default Host;
