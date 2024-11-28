import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../utils/firebaseConfig';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; // Estilos del componente
import './ProgressGoal.css';

interface ProgressProps {
  eventId: string;
}

const GoalProgress: React.FC<ProgressProps> = ({ eventId }) => {
  const [goalAmount, setGoalAmount] = useState<number>(0);
  const [currentAmount, setCurrentAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>(''); // Descripción del evento
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
        setDescription(data?.description || ''); 
      } else {
        setError(`No se encontró la meta para el evento con ID ${eventId}.`);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [eventId]);

  const progress = goalAmount > 0 ? (currentAmount / goalAmount) * 100 : 0;

  return (
    <div className="goal-progress-container">
      <h2 className="goal-progress-title">Goal Progress</h2>
      {loading ? (
        <p className="loading-text">Cargando...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <div className="circular-progress-wrapper">
            <CircularProgressbar
              value={progress}
              text={`${Math.round(progress)}%`}
              styles={{
                root: { width: '150px', height: '150px' },
                path: { stroke: '#2eae85;', strokeWidth: 10 },
                trail: { stroke: '#2eae85;', strokeWidth: 10 },
                text: { fill: '#2eae85;;', fontSize: '16px' },
              }}
            />
          </div>
          <div className="progress-values">
            <div className="current-amount">
              <p className="amount">${currentAmount}</p>
              <span className="label">Current Amount</span>
            </div>
            <div className="goal-amount">
              <p className="amount">${goalAmount}</p>
              <span className="label">Goal Amount</span>
            </div>
          </div>
          <p className="progress-description">
            {description || 'Sin descripción proporcionada.'}
          </p>
        </>
      )}
    </div>
  );
};

export default GoalProgress;
