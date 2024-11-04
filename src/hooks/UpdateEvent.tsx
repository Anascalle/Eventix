import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

const useUpdateEvent = (eventId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateEvent = async (updatedData: any) => {
    setLoading(true);
    setError(null);
    try {
      const eventDocRef = doc(db, 'events', eventId);
      await updateDoc(eventDocRef, updatedData);
    } catch (err) {
      console.error('Error updating event:', err);
      setError('Failed to update event.');
    } finally {
      setLoading(false);
    }
  };

  return { updateEvent, loading, error };
};

export default useUpdateEvent;
