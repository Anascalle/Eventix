import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../utils/firebaseConfig';
import ProgressBar from '@ramonak/react-progress-bar';

interface ProgressProps {
  eventId: string;
}

const GoalProgress: React.FC<ProgressProps> = ({ eventId }) => {
  const [goalAmount, setGoalAmount] = useState<number>(0);
  const [currentAmount, setCurrentAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fundDocRef = doc(db, 'funds', eventId);

    const unsubscribe = onSnapshot(fundDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setGoalAmount(data?.goalAmount || 0);

        const contributions = data?.currentAmount || [];
        const totalContributions = contributions.reduce((acc: number, curr: number) => acc + curr, 0);
        setCurrentAmount(totalContributions);
      } else {
        setError(`No se encontró la meta para el evento con ID ${eventId}.`);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [eventId]);

  const progress = goalAmount > 0 ? (currentAmount / goalAmount) * 100 : 0;

  return (
    <div>
      <h2>Progreso de la Meta</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <ProgressBar completed={progress} maxCompleted={100} />
          <p>
            ${currentAmount} de ${goalAmount}.
          </p>
        </>
      )}
    </div>
  );
};

export default GoalProgress;
