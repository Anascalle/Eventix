import React, { useEffect, useState } from "react";
import "./Host.css";
import { db } from "../../../utils/firebaseConfig"; 
import { collection, query, where, onSnapshot } from "firebase/firestore"; // Importar onSnapshot
import HostEvents from "./Host";
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
}

const Host: React.FC<{ userId: string }> = ({ userId }) => {
  const [profiles, setProfiles] = useState<EventProfile[]>([]); 
  const [slidesPerView, setSlidesPerView] = useState<number>(3);  

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
    const fetchData = () => {
      const eventsRef = collection(db, "events");
      const q = query(eventsRef, where("userId", "==", userId)); // Filtrar por userId

      // Usar onSnapshot para escuchar cambios en tiempo real
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data: EventProfile[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EventProfile));
        setProfiles(data); 
      });

      return () => unsubscribe(); // Cleanup del listener
    };

    fetchData();
  }, [userId]); // Ejecutar cuando userId cambie

  return (
    <div id="Host_card">
      <h2 id="host_tittle">You are Host</h2>
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
                <HostEvents
                 key={profile.id}
                 id={profile.id}
                 
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

export default Host;
