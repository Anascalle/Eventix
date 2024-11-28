import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../utils/firebaseConfig';
//import './LinearProgressBar.css';

interface LinearProgressBarProps {
  eventId: string;
}

const LinearProgressBar: React.FC<LinearProgressBarProps> = ({ eventId }) => {
  const [goalAmount, setGoalAmount] = useState<number | null>(null);
  const [currentAmount, setCurrentAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fundDocRef = doc(db, 'funds', eventId);

    const unsubscribe = onSnapshot(fundDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setGoalAmount(data?.goalAmount || null);

        const contributions = data?.currentAmount || [];
        const totalContributions = contributions.reduce((acc: number, curr: number) => acc + curr, 0);
        setCurrentAmount(totalContributions);
      } else {
        setGoalAmount(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [eventId]);

  const progress = goalAmount && goalAmount > 0 ? (currentAmount / goalAmount) * 100 : 0;

  if (loading || goalAmount === null) return null; // Evitar mostrar nada si aún está cargando

  return (
    <div className="linear-progress-bar-container">
      <p className="progress-label">Funded: {Math.round(progress)}%</p>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};




export default LinearProgressBar;