import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../utils/firebaseConfig';
import "./ContributeList.css"

interface Contributor {
  username: string;
  amount: number;
  img: string;
}

interface ContributorListProps {
  eventId: string;
}

const ContributorList: React.FC<ContributorListProps> = ({ eventId }) => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fundDocRef = doc(db, 'funds', eventId);

    const unsubscribe = onSnapshot(fundDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const contributions = data?.contributions || [];

        // Mapeamos los datos para obtener el nombre, cantidad, y la imagen
        const contributorsList = contributions.map((contribution: any) => ({
          username: contribution.username,
          amount: contribution.amount,
          img: contribution.img,
        }));

        setContributors(contributorsList);
      } else {
        setError('No se encontró la meta para este evento.');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [eventId]);

  return (
    <div className="contributor-list-container">
      <h3 className="contributors-title">Contributors</h3>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="contributors">
          {contributors.map((contributor, index) => (
            <div className="contributor-item" key={index}>
              <img
                src={contributor.img}
                alt={contributor.username}
                className="contributor-image"
              />
              <div className="contributor-info">
                <p className="contributor-name">{contributor.username}</p>
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContributorList;
