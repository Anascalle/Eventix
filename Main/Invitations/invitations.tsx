import React from "react";
import "./invitations.css"

interface InvitationsProps {
    name: string;
    ocation: string;
    date: string; 
    url: string;
}

const Invitations: React.FC<InvitationsProps> = ({ name, ocation, date, url }) => {
    return (
        <div id="invitations_div">
            <h2>Invitations</h2>
            <div id="Invitation">
                <img src={url} alt="" />
                <p id="name">{name} sent you an invitation</p>
                <p id="ocation">Ocation: <span id="ocation_type">{ocation} Grade</span></p>
                <p id="date">Date: <span id="date_number">{date}01/10/2024</span></p>
            </div>
        </div>
    );
}

export default Invitations;
