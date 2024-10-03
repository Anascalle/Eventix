
import React, { useEffect, useState } from "react";
import "./guest.css";
import { db } from "../../../utils/firebaseConfig"; // Asegúrate de que esta ruta sea correcta
import { collection, getDocs } from "firebase/firestore";
import GuestEventes from "./guest";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface EventProfile {
  id: string; 
  name: string;
  eventType: string;
  date: string;
  image: string;
}

const Guest: React.FC = () => {
  const [profiles, setProfiles] = useState<EventProfile[]>([]); 
  console.log(profiles); 
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
          spaceBetween={10}
          slidesPerView={1}
          navigation ={false}
          pagination={true}
          loop={true}
          breakpoints={{
            // when window width is >= 768px
            800: {
              slidesPerView: 3,
              spaceBetween: -25
            },
          }}  
        >
          {profiles.map((profile) => (
            <SwiperSlide key={profile.id}> 
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
