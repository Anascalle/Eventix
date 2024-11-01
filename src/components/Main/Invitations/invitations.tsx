import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./invitations.css";
import InvitationsCards from "./cards";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "./../../../utils/firebaseConfig";

const Invitations: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [invitations, setInvitations] = useState<any[]>([]);
  const { userId } = useParams<{ userId: string }>();
  
 
  const [visibleCount] = useState(4);

  useEffect(() => {
    const fetchInvitations = () => {
      try {
        const q = query(
          collection(db, "invitations"),
          where("userId", "==", userId)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const invitationsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setInvitations(invitationsData);
        });

        return unsubscribe;
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
            {invitations.slice(0, visibleCount).map((invitation) => ( 
              <SwiperSlide key={invitation.id}>
                <InvitationsCards
                  creator={invitation.creatorName}
                  ocation={invitation.eventType} 
                  eventDate={invitation.eventDate} 
                  hour={invitation.startTime}
                  creatorImg={invitation.creatorImg} 
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <>
            {invitations.slice(0, visibleCount).map((invitation) => ( 
              <InvitationsCards
                key={invitation.id}
                creator={invitation.creatorName}
                ocation={invitation.eventType} 
                eventDate={invitation.eventDate} 
                hour={invitation.startTime}
                creatorImg={invitation.creatorImg} 
              />
            ))}
            
          </>
        )}
      </div>
    </div>
  );
};

export default Invitations;
