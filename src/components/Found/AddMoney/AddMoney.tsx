import React, { useState } from 'react'; 
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore'; 
import { db } from '../../../utils/firebaseConfig'; 
import { useUser } from '../../../context/useContext'; 
import './AddMoneyForm.css'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AddMoneyFormProps { 
  eventId: string; 
}

const AddMoneyForm: React.FC<AddMoneyFormProps> = ({ eventId }) => { 
  const [amountToAdd, setAmountToAdd] = useState<number>(0); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string>(''); 
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 
  const { user } = useUser(); 


  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault();

    if (amountToAdd <= 0) { 
      setError('Please enter a valid amount.'); 
      return; 
    }

    setLoading(true); 
    setError('');

    try {
      if (!user) {
        throw new Error('User is not logged in.');
      }

      // Obtener el documento de fondos
      const fundDocRef = doc(db, 'funds', eventId);
      const fundDocSnapshot = await getDoc(fundDocRef);

      if (!fundDocSnapshot.exists()) {
        throw new Error('Event not found');
      }

      // Obtener el array actual de contribuciones (currentAmount)
      const currentAmounts: number[] = fundDocSnapshot.data()?.currentAmount || [];

      // Agregar el nuevo monto al array
      currentAmounts.push(amountToAdd);

      // Detalles de la contribución
      const contributionDetails = { 
        amount: amountToAdd, 
        uid: user.uid, 
        username: user.username || 'Guest', 
        img: user.img || '', 
        timestamp: new Date().toISOString(), 
      };

      // Actualizar el documento con el nuevo array de montos
      await updateDoc(fundDocRef, { 
        currentAmount: currentAmounts, // Actualiza el array de montos
        contributions: arrayUnion(contributionDetails), // Mantiene un historial completo
      });

      setAmountToAdd(0);
      toast.success('Money added successfully!'); 
      setIsModalOpen(false); // Cerrar el modal después de submit
    } catch (err) {
      console.error('Error adding money:', err);
      setError('There was an error adding money to the goal.');
      toast.error('There was an error adding money.'); 
    } finally {
      setLoading(false); 
    }
  };

  const toggleModal = () => { 
    setIsModalOpen(!isModalOpen); 
  };

  return (
    <>
      <button onClick={toggleModal}>Contribute</button>

      {isModalOpen && (
        <div className="modal_thank">
          <div className="modal-content_thank">
            <button onClick={toggleModal} className="close-button">X</button>
            
            <form onSubmit={handleSubmit}>
              <div>
                <h2 id='thanks_message'>Thank you for your contribution!</h2>
                <label htmlFor="amountToAdd">Amount:</label>
                <input
                  id="amountToAdd"
                  type="number"
                  value={amountToAdd}
                  onChange={(e) => setAmountToAdd(Number(e.target.value))}
                  required
                  className="input-field"
                />
              </div>

              {error && <p className="error-message">{error}</p>}

              <button type="submit" disabled={loading} className="submit-button">
                {loading ? 'Adding...' : 'Add Money'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddMoneyForm;
