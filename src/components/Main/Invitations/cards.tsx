import React from "react";
import DeletedButton from "../DeletedButton/deletedButton";
import EditButton from "../EditButton/editButton";
import "./invitations.css";


interface InvitationsProps {
  ocation: string;
  creatorImg: string; 
  creator: string;
  eventDate: string;
  hour: string;
}

const InvitationsCards: React.FC<InvitationsProps> = ({
  creator,
  ocation,
  eventDate,
  hour,
  creatorImg 
}) => {
  return (
    <div id="Invitation">
      
      <img id="profile_img" src={creatorImg} alt={`Creator: ${creator}`} />
      <div id="invitation_text">
        <p id="name">{creator} sent you an invitation</p>
        <p id="ocation">
          Ocation: <span id="ocation_type">{ocation}</span>
        </p>
        <p id="date">
          Date: <span id="date_number">{eventDate}</span>
        </p>
        <p id="hour">
          Hour: <span id="date_number">{hour}</span>
        </p>
      </div>
      <div id="Buttons">
        <DeletedButton />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
        <EditButton
          icon={<span className="material-symbols-outlined">check</span>}
        />
      </div>
    </div>
  );
};

export default InvitationsCards;
