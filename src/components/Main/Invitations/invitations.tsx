import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importa useParams
import "./invitations.css";
import InvitationsCards from "./cards";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Importa los estilos de Swiper

import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "./../../../utils/firebaseConfig"; // Importa tu configuración de Firebase

const Invitations: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [invitations, setInvitations] = useState<any[]>([]);
  
  const { userId } = useParams<{ userId: string }>(); // Obtén el ID del usuario desde la URL

  useEffect(() => {
    const fetchInvitations = () => {
      try {
        const q = query(
          collection(db, "invitations"),
          where("userId", "==", userId) // Usa el ID del usuario desde la URL
        );

        // Escucha en tiempo real los cambios
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const invitationsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setInvitations(invitationsData);
        });

        return unsubscribe; // Desuscribirse cuando el componente se desmonta
      } catch (error) {
        console.error("Error fetching invitations: ", error);
      }
    };

    if (userId) {
      fetchInvitations();
    }
  }, [userId]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="invitations_div_shadow">
      <div id="invitations_div">
        <h2 id="invitations_tittle">Invitations</h2>

        {isMobile ? (
          <Swiper
            spaceBetween={5}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={false}
          >
            {invitations.map((invitation) => (
              <SwiperSlide key={invitation.id}>
                <InvitationsCards
                  name={invitation.senderName}
                  ocation={invitation.Ocation}
                  date={invitation.dateSent}
                  url={invitation.img}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          invitations.map((invitation) => (
            <InvitationsCards
              key={invitation.id}
              name={invitation.senderName}
              ocation={invitation.Ocation}
              date={invitation.dateSent}
              url={invitation.img}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Invitations;
