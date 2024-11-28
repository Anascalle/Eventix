import { useEffect, useState, useMemo, useCallback } from "react";
import { db } from "../utils/firebaseConfig";
import { collection, query, where, onSnapshot, getDocs } from "firebase/firestore";
import { EventProfile, Invitation } from "../Types/types";

const useHostEvents = (userId: string) => {
  const [profiles, setProfiles] = useState<EventProfile[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const saveToLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const loadFromLocalStorage = (key: string) => {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : null;
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slidesPerView = useMemo(() => {
    if (windowWidth < 768) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  }, [windowWidth]);

  const fetchData = useCallback(async () => {
    setLoading(true);

    const eventsRef = collection(db, "events");
    const invitationsRef = collection(db, "invitations");
    const eventsQuery = query(eventsRef, where("userId", "==", userId));
    const invitationsQuery = query(invitationsRef, where("creatorId", "==", userId), where("status", "==", "accepted"));

    const cachedEvents = loadFromLocalStorage(`events_${userId}`);
    const cachedInvitations = loadFromLocalStorage(`invitations_${userId}`);
    
    if (cachedEvents) setProfiles(cachedEvents);
    if (cachedInvitations) setInvitations(cachedInvitations);

    try {
      // Fetch events
      const eventSnapshot = await getDocs(eventsQuery);
      const eventData: EventProfile[] = eventSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EventProfile));
      setProfiles(eventData);
      saveToLocalStorage(`events_${userId}`, eventData);

      // Fetch accepted invitations
      const invitationSnapshot = await getDocs(invitationsQuery);
      const invitationData: Invitation[] = invitationSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Invitation));
      setInvitations(invitationData);
      saveToLocalStorage(`invitations_${userId}`, invitationData);
    } catch (err) {
      setError("Error loading data");
    } finally {
      setLoading(false);
    }

    const unsubscribeEvents = onSnapshot(eventsQuery, (snapshot) => {
      const liveEventData: EventProfile[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EventProfile));
      setProfiles(liveEventData);
      saveToLocalStorage(`events_${userId}`, liveEventData);
    });

    const unsubscribeInvitations = onSnapshot(invitationsQuery, (snapshot) => {
      const liveInvitationData: Invitation[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Invitation));
      setInvitations(liveInvitationData);
      saveToLocalStorage(`invitations_${userId}`, liveInvitationData);
    });

    return () => {
      unsubscribeEvents();
      unsubscribeInvitations();
    };
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { profiles, invitations, slidesPerView, loading, error };
};

export default useHostEvents;
