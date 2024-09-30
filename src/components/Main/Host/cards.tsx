import "./Host.css";
import React, { useEffect, useState } from "react";
import { db } from "../../../utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import HostEvents from "./Host";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css/bundle";
import "swiper/css/pagination";

interface EventProfile {
  id: string;
  name: string;
  eventType: string;
  date: string;
  image: string;
}

const Host: React.FC = () => {
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
    <div id="Host_card">
      <h2 id="host_tittle">You are Host</h2>
      <div id="carousel">
        <Swiper
          spaceBetween={-25}
          slidesPerView={3}
          slidesPerGroup={4}
          navigation={false}
          pagination={{ clickable: true }}
          loop={false}
        >
          {profiles.map((profile, index) => (
            <SwiperSlide key={index}>
              <HostEvents
                key={profile.id}
                id={profile.id}
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

export default Host;
