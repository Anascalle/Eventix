import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../utils/firebaseConfig";
import "./GuesListModal.css";

 interface GuestModalProps {
  eventId: string; 
  closeModal: () => void; 
  invitations: Invitation[]; 
}

interface Invitation {
  id: string;
  username: string;
}

const GuestModal: React.FC<GuestModalProps> = ({ eventId, closeModal }) => {
  const [eventGuests, setEventGuests] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        setLoading(true);
        const invitationsRef = collection(db, "invitations");
        const q = query(invitationsRef, where("eventId", "==", eventId), where("status", "==", "accepted"));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setEventGuests([]);
        } else {
          const guests = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            username: doc.data().username,
          }));
          setEventGuests(guests);
        }
      } catch (err) {
        console.error("Error fetching invitations:", err);
        setError("Error loading the guests.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvitations();
  }, [eventId]);

  return (
    <div className="guest-modal-overlay" onClick={closeModal}>
      <div className="guest-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Event Guests</h2>
        <button onClick={closeModal}>X</button>
        {loading ? (
          <p>Loading guests...</p>
        ) : error ? (
          <p>{error}</p>
        ) : eventGuests.length === 0 ? (
          <p>No accepted guests for this event.</p>
        ) : (
          <ul>
            {eventGuests.map((guest) => (
              <li key={guest.id}>{guest.username}</li>
            ))}
          </ul>
        )}
        
      </div>
    </div>
  );
};

export default GuestModal;
