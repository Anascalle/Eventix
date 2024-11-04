import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./invitations.css";
import InvitationsCards from "./cards";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../utils/firebaseConfig";

const Invitations: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [invitations, setInvitations] = useState<any[]>([]);
  const { userId } = useParams<{ userId: string }>();

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

  const handleDeleteFromState = (id: string) => {
    setInvitations((prevInvitations) =>
      prevInvitations.filter((invitation) => invitation.id !== id)
    );
  };

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
                  id={invitation.id}
                  name={invitation.senderName}
                  ocation={invitation.type}
                  date={invitation.eventTime}
                  url={invitation.img}
                  onDelete={handleDeleteFromState} // Pasamos el callback
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          invitations.map((invitation) => (
            <InvitationsCards
              key={invitation.id}
              id={invitation.id}
              name={invitation.senderName}
              ocation={invitation.type}
              date={invitation.eventTime}
              url={invitation.img}
              onDelete={handleDeleteFromState}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Invitations;