import React from 'react'; 
import Nav2 from '../../components/Main/Nav/Nav';
import "./Main.css"
import Invitations from '../../components/Main/Invitations/invitations';
import Host from '../../components/Main/Host/cards';
import Guest from '../../components/Main/Guest/cards';
import NewEventButton from '../../components/Main/NewEventButton/NewEventButton';
import InvitationsAccept from '../../components/Main/AceptedInvitations/Cards';

const Main: React.FC = () => {
    return (
     <div id='main_screen'>
       <Nav2></Nav2>
        <Invitations></Invitations>
        <Host></Host>
        <Guest></Guest>
        <NewEventButton></NewEventButton>
        <InvitationsAccept></InvitationsAccept>
    </div>
    );
};

export default Main;