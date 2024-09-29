import React, { useEffect, useState } from "react";
import "./guest.css";
import { db } from "../../../utils/firebaseConfig"; // Importa tu configuración de Firebase
import { collection, getDocs } from "firebase/firestore";
import GuestEventes from "./guest";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css/bundle"
import "swiper/css/pagination"

interface EventProfile {
  id: string; 
  name: string;
  eventType: string;
  date: string;
  image: string;
}

const Guest: React.FC = () => {
  const [profiles, setProfiles] = useState<EventProfile[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "events")); 
      const data: EventProfile[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EventProfile));
      setProfiles(data); 
    };

    fetchData();
  }, []);

  return (
    <div id="Guest_card">
      <h2 id="Guest_tittle">You are Guest</h2>
      <div id="carousel">
        <Swiper
          spaceBetween={0}
          slidesPerView={3}
          slidesPerGroup={3}
          navigation={false}
          pagination={{ clickable: true }}
          loop={false}
        >
          {profiles.map((profile) => (
            <SwiperSlide key={profile.id}> {/* Usa profile.id como key */}
              <GuestEventes
                name={profile.name}
                ocation={profile.eventType}
                date={profile.date}
                url={profile.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Guest;
