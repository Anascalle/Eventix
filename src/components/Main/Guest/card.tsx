import React, { useEffect, useState, useCallback } from "react";
import { db } from "../../../utils/firebaseConfig"; 
import { collection, onSnapshot } from "firebase/firestore"; 
import GuestEventes from "./guest";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "./guest.css";

interface EventProfile {
  id: string; 
  name: string;
  eventType: string;
  date: string;
  image: string;
  userId: string;
}

const Guest: React.FC<{ userId: string }> = React.memo(({ userId }) => {
  const [profiles, setProfiles] = useState<EventProfile[]>([]);
  const [slidesPerView, setSlidesPerView] = useState<number>(3);  // Valor por defecto

  const handleResize = useCallback(() => {
    if (window.innerWidth < 768) {
      setSlidesPerView(1); 
    } else if (window.innerWidth < 1024) {
      setSlidesPerView(2); 
    } else {
      setSlidesPerView(3); 
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);  
  
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "events"), (querySnapshot) => {
      const data: EventProfile[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EventProfile));
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
          slidesPerView={Math.min(profiles.length, slidesPerView)}
          navigation={false}
          pagination={{ clickable: true }}
          loop={profiles.length > 1}
        >
          {profiles.length > 0 ? (
            profiles.map((profile) => (
              <SwiperSlide key={profile.id}> 
                <GuestEventes
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
              <p id="no_events">No events available</p>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
});

export default Guest;
