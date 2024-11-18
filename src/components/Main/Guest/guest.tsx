import React from "react";
import "./guest.css";
import { useNavigate } from "react-router-dom";
import { GuestEventesProps } from "../../../Types/types";
import Avatar from "react-avatar";

const GuestEventes: React.FC<GuestEventesProps> = ({ date, id, name, invitations, coloor }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    console.log(`Button clicked. Card ID: ${id}`);
    navigate(`/detail/${id}`, { state: { id,userType: "Guest" }});
  };

  return (
    <div id="guest_events" style={{ backgroundColor: coloor }}>
      <div id="invitation">
        {invitations.length > 0 ? (
          <div id="guest_list">
            {invitations.length > 2 && (
              <div className="more-invites">
                <span className="more-invites-text">+ {invitations.length - 2}</span>
              </div>
            )}
            {invitations.slice(0, 2).map((invitation) => (
              <Avatar
                key={invitation.userId}
                src={invitation.userImg}
                size={window.innerWidth < 740 ? "60" : "30"} 
                round
                className="sb-avatar__image"
              />
            ))}
          </div>
        ) : (
          <p id="guest_text">There are no guests</p>
        )}
      </div>

      <button id="guest_events_button" onClick={handleButtonClick}>
        <p id="name_event">{name}</p>
        <p id="date_event">{date}</p>
      </button>
    </div>
  );
};

export default GuestEventes;
