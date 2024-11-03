import React, { useState, useEffect } from "react";
import "./Host.css";
import HostEvents from "../Host/Host";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import useHostEvents from "../../../hooks/useHostEvents";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../utils/firebaseConfig";

const Host: React.FC<{ userId: string }> = ({ userId }) => {
  const { profiles: initialProfiles, slidesPerView, loading, error } = useHostEvents(userId);
  const [profiles, setProfiles] = useState(initialProfiles);

  useEffect(() => {
    setProfiles(initialProfiles); // Actualizamos profiles cuando se cargan los datos
  }, [initialProfiles]);

  // Lógica de eliminación en Firebase y en el estado local
  const handleDeleteEvent = async (id: string) => {
    try {
      await deleteDoc(doc(db, "events", id)); // Elimina el evento en Firebase
      setProfiles(prevProfiles => prevProfiles.filter(profile => profile.id !== id)); // Actualiza el estado local
      console.log(`Event with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div aria-label="carousel host events" id="Host_card">
      <h2 aria-label="carousel host events title" id="host_tittle">You are Host</h2>
      <div aria-label="carousel host events" id="carousel">
        {loading ? (
          <p id="loading" aria-live="polite">Loading events...</p>
        ) : error ? (
          <p id="error" aria-live="assertive">{error}</p>
        ) : (
          <Swiper
            spaceBetween={30}
            slidesPerView={profiles.length < slidesPerView ? profiles.length : slidesPerView}
            navigation={false}
            pagination={{ clickable: true }}
            loop={profiles.length > 1}
          >
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <SwiperSlide key={profile.id} aria-label={`Event ${profile.name} on ${profile.date}`}>
                  <HostEvents
                    id={profile.id}
                    name={profile.name}
                    date={profile.date}
                    url={profile.image}
                    onDelete={() => handleDeleteEvent(profile.id)} // Pasamos la función de eliminación
                  />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <p id="no_events" aria-live="polite">No events available</p>
              </SwiperSlide>
            )}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Host;