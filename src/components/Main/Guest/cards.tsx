import React from "react";
import "./guest.css";
import profiles from "../data/data";
import GuestEventes from "./guest";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css/bundle"
import "swiper/css/pagination"


const Guest: React.FC = () => {

  const extendedProfiles = [...profiles, ...profiles];  // Duplicar el array para más slides
  return (
    <div id="Guest_card">
      <h2 id="Guest_tittle">You are Guest</h2>
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
         <GuestEventes
           key={index}
           name={profile.name}
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

export default Guest
