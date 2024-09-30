import React from 'react'; 
import Nav2 from '../../components/Main/Nav/Nav.view';
import InvitationsAccept from '../../components/Main/AceptedInvitations/Card';
import Invitations from '../../components/Main/Invitations/Invitations';
import Host from '../../components/Main/Host/cards';
import Guest from '../../components/Main/Guest/cards';
import NewEventButton from '../../components/Main/NewEventButton/NewEventButton';
import "./Main.css"
import CreateEventForm from '../../components/Main/CreateEventForm/CreateEventForm';

const Main: React.FC = () => {
    return (
     <div id='main_screen'>
       <Nav2></Nav2>
        <Invitations></Invitations>
        <Host></Host>
        <Guest></Guest>
        <CreateEventForm></CreateEventForm>
        <InvitationsAccept></InvitationsAccept>
    </div>
    );
};

export default Main;