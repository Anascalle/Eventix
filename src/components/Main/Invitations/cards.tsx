import React from "react";
import DeletedButton from "../DeletedButton/deletedButton";
import EditButton from "../EditButton/editButton";
import "./invitations.css"

interface InvitationsProps {
    name: string;
    ocation: string;
    date: string;
    url: string;
  }
  
const InvitationsCards: React.FC<InvitationsProps> = ({
  name,
  ocation,
  date,
  url
}) =>{
  return (
    <div id="Invitation">
    <img id="porfile_img" src={url} alt={name} />
    <div id="invitation_text">
      <p id="name">{name} sent you an invitation</p>
      <p id="ocation">
        Ocation: <span id="ocation_type">{ocation}</span>
      </p>
      <p id="date">
        Date: <span id="date_number">{date}</span>
      </p>
    </div>
    
  </div>
  );
};

export default InvitationsCards;
