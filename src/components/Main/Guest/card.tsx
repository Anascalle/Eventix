import React, { useEffect, useState } from "react";
import { db } from "../../../utils/firebaseConfig"; 
import { collection, onSnapshot } from "firebase/firestore"; 
import GuestEventes from "./guest";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface EventProfile {
  id: string; 
  name: string;
  eventType: string;
  date: string;
  image: string;
  userId: string;
}

const Guest: React.FC<{ userId: string }> = ({ userId }) => {
  const [profiles, setProfiles] = useState<EventProfile[]>([]);
  const [slidesPerView, setSlidesPerView] = useState<number>(3);  // Valor por defecto

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(1); 
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2); 
      } else {
        setSlidesPerView(3); 
      }
    };

  
    handleResize();
    window.addEventListener('resize', handleResize);

    // Limpieza del evento cuando el componente se desmonta
    return () => window.removeEventListener('resize', handleResize);
  }, []);  
  
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "events"), (querySnapshot) => {
      const data: EventProfile[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EventProfile));
      // Filtrar eventos para que no incluyan los del userId actual
      const filteredData = data.filter(profile => profile.userId !== userId);
      setProfiles(filteredData); 
    });

    return () => unsubscribe(); 
  }, [userId]);

  return (
    <div id="Guest_card">
      <h2 id="Guest_tittle">You are Guest</h2>
      <div id="carousel">
        <Swiper
          spaceBetween={30}
          slidesPerView={profiles.length < slidesPerView ? profiles.length : slidesPerView}
          navigation={false}
          pagination={{ clickable: true }}
          loop={profiles.length > 1}
          
          
        >
          {profiles.length > 0 ? (
            profiles.map((profile) => (
              <SwiperSlide key={profile.id}> 
                <GuestEventes
                  key={profile.id}
                  id={profile.id}
                  ocation={profile.eventType}
                  name={profile.name}
                  date={profile.date}
                  url={profile.image}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <p>No events available</p>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default Guest;
