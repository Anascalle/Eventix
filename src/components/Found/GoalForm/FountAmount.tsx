import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../utils/firebaseConfig';

import "./FoundAmount.css"
interface FundFormProps {
  eventId: string;
  onFundCreated: () => void; 
}

const FundForm: React.FC<FundFormProps> = ({ eventId, onFundCreated }) => {
  const [goalAmount, setGoalAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventId) {
      setError('El ID del evento no es válido.');
      return;
    }
    if (goalAmount <= 0 || description.trim() === '') {
      setError('Por favor, ingresa una cantidad y una descripción válidas.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const fundDocRef = doc(db, 'funds', eventId);
      await setDoc(fundDocRef, {
        goalAmount,
        description,
        currentAmount: [], 
        createdAt: new Date(),
      });

      setGoalAmount(0);
      setDescription('');
      setSuccessMessage('Meta guardada correctamente.');

      
      onFundCreated();
    } catch (error) {
      setError('Hubo un error al guardar la meta.');
      console.error('Error al guardar la meta:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="fund-form">
      <h1 id='title_wel'>Welcome to group fundraising</h1>
      <div>
        <label htmlFor="goalAmount">Goal:</label>
        <input
          id="goalAmount"
          type="number"
          value={goalAmount}
          onChange={(e) => setGoalAmount(Number(e.target.value))}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Create'}
      </button>
    </form>
  );
};

export default FundForm;