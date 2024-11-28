import React, { useEffect } from 'react'; 
import { useParams } from 'react-router-dom'; 
import Nav2 from '../../components/Main/Nav/Nav.view';
import Invitations from '../../components/Main/Invitations/invitations';
import Host from '../../components/Main/Host/CardH';
import Guest from '../../components/Main/Guest/CardG';
import CreateEventForm from '../../components/Main/CreateEventForm/CreateEventForm';
import { useUser } from '../../context/useContext';
import "./Main.css";

const Main: React.FC = () => {
  const { userId } = useParams<{ userId: string; eventId: string }>();
  const { user } = useUser(); // Obtén el usuario del contexto

  // Use useEffect para ver el contexto cuando se renderiza el componente
  useEffect(() => {
    console.log('Usuario en contexto:', user);
  }, [user]); // Se ejecutará cada vez que el estado de 'user' cambie

  // Si el usuario no está en el contexto, usa el `userId` de la URL
  const currentUserId = user ? user.uid : userId;

  return (
        <>
            <Nav2 />
            <div id="background_invitation">
            </div>
            <Invitations />
            <div id="background_houst_guest">
            </div>
            <CreateEventForm />
            <Host userId={currentUserId!} />
            <Guest userId={currentUserId!} />
          
            <div id="root"></div>
            <div id="modal-root"></div>
        </>
    );
};

export default Main;
