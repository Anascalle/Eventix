import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../utils/firebaseConfig';
import './Found.css';
import FundForm from '../../components/Found/GoalForm/FountAmount';
import GoalProgress from '../../components/Found/ProgressGoal/ProgressGoal';
import AddMoneyForm from '../../components/Found/AddMoney/AddMoney';
import Nav2 from '../../components/Main/Nav/Nav.view';
import ContributorList from '../../components/Found/ContributesList/ContributeList';
const FoundScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [fundExists, setFundExists] = useState<boolean | null>(null); // null para indicar carga inicial
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!id) {
      setError('Error: No se encontró el ID del evento en la URL.');
      return;
    }

    const checkFundExists = async () => {
      try {
        const fundDocRef = doc(db, 'funds', id);
        const fundDoc = await getDoc(fundDocRef);

        if (fundDoc.exists()) {
          setFundExists(true);
        } else {
          setFundExists(false);
        }
      } catch (err) {
        console.error('Error al verificar el fondo:', err);
        setError('Hubo un problema al verificar el fondo del evento.');
      }
    };

    checkFundExists();
  }, [id]);

  const handleFundCreated = () => {
    setFundExists(true);
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (fundExists === null) {
    return <p>Cargando...</p>; 
  }

  return (
    <div className="Found-screen">
       <Nav2></Nav2>
 
      {fundExists ? (
        <>
     
          <GoalProgress eventId={id!} />
          <AddMoneyForm eventId={id!} />
          <ContributorList eventId={id!} />

        </>
      ) : (
        <FundForm eventId={id!} onFundCreated={handleFundCreated} />
      )}
    </div>
  );
};

export default FoundScreen;