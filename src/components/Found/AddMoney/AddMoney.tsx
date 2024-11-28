import React, { useState } from 'react';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../../utils/firebaseConfig';

interface AddMoneyFormProps {
  eventId: string;
}

const AddMoneyForm: React.FC<AddMoneyFormProps> = ({ eventId }) => {
  const [amountToAdd, setAmountToAdd] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (amountToAdd <= 0) {
      setError('Por favor, ingresa una cantidad válida.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const fundDocRef = doc(db, 'funds', eventId);
      await updateDoc(fundDocRef, {
        currentAmount: arrayUnion(amountToAdd), // Agregar la contribución al array
      });

      setAmountToAdd(0);
      setSuccessMessage('Dinero agregado correctamente a la meta.');
    } catch (err) {
      console.error('Error al agregar dinero:', err);
      setError('Hubo un error al agregar dinero a la meta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="amountToAdd">Cantidad a agregar:</label>
        <input
          id="amountToAdd"
          type="number"
          value={amountToAdd}
          onChange={(e) => setAmountToAdd(Number(e.target.value))}
          required
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Agregando...' : 'Agregar Dinero'}
      </button>
    </form>
  );
};

export default AddMoneyForm;
