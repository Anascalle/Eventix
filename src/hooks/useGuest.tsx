import { useEffect, useState, useCallback } from "react";
import { db } from "../utils/firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore"; 
import { EventProfile } from "../Types/types";

const useGuestEvents = (userId: string) => {
  const [profiles, setProfiles] = useState<EventProfile[]>([]);
  const [invitations, setInvitations] = useState<any[]>([]); 
  const [slidesPerView, setSlidesPerView] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleResize = useCallback(() => {
    if (window.innerWidth < 768) {
      setSlidesPerView(1); 
    } else if (window.innerWidth < 1024) {
      setSlidesPerView(2); 
    } else {
      setSlidesPerView(4); 
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    if (!userId) {
      setError("User ID is required");
      setLoading(false);
      return;
    }

      setLoading(true);
    
      const fetchInvitations = async () => {
        try {
          const invitationsQuery = query(
            collection(db, "invitations"),
            where("userId", "==", userId),
            where("status", "==", "accepted") 
          );
    
          const unsubscribeInvitations = onSnapshot(invitationsQuery, (querySnapshot) => {
            const invitationData = querySnapshot.docs.map(doc => doc.data());
            setInvitations(invitationData);
    
            const eventIds = [...new Set(invitationData.map(inv => inv.eventId))];
            if (eventIds.length > 0) {
              // Consulta eventos
              const eventsQuery = query(
                collection(db, "events"),
                where("__name__", "in", eventIds)
              );
    
              const unsubscribeEvents = onSnapshot(eventsQuery, (eventsSnapshot) => {
                const data: EventProfile[] = eventsSnapshot.docs.map(doc => ({
                  id: doc.id,
                  ...doc.data(),
                } as EventProfile));
                setProfiles(data);
                setLoading(false);
              });
    
              // Consulta TODAS las invitaciones de los eventos
              const fetchEventInvitations = async () => {
                const invitationsQuery = query(
                  collection(db, "invitations"),
                  where("eventId", "in", eventIds),
                  where("status", "==", "accepted")
                );
    
                onSnapshot(invitationsQuery, (snapshot) => {
                  const allInvitations = snapshot.docs.map(doc => doc.data());
                  setInvitations(allInvitations); // Incluye todas las invitaciones asociadas
                });
              };
    
              fetchEventInvitations();
    
              return () => {
                unsubscribeEvents();
              };
            } else {
              setProfiles([]);
              setLoading(false);
            }
          });
    
          return () => unsubscribeInvitations();
        } catch (error) {
          console.error("Error fetching events: ", error);
          setError("Error loading events. Please try again later.");
          setLoading(false);
        }
      };
    
      fetchInvitations();
    }, [userId]);
    

  return { profiles, invitations, slidesPerView, loading, error };
};

export default useGuestEvents;
