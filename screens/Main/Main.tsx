import React from 'react'; 
import Nav2 from '../../components/Main/Nav/Nav';

import "./Main.css"
import Invitations from '../../components/Main/Invitations/invitations';

const Main: React.FC = () => {
    return (
     <div id='main_screen'>
       <Nav2></Nav2>
        <Invitations></Invitations>
    </div>
    );
};

export default Main;