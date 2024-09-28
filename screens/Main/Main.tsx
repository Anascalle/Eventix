import React from 'react'; 
import Nav2 from '../../components/Main/Nav/Nav';
import Invitations from '../../components/Main/Invitations/invitations';
import "./Main.css"

const Main: React.FC = () => {
    return (
     <div id='main_screen'>
       <Nav2></Nav2>
        <Invitations></Invitations>
    </div>
    );
};

export default Main;