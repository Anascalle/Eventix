import React, { useState } from "react";
import "./guest.css";
import { useNavigate } from "react-router-dom";
import { GuestEventesProps } from "../../../Types/types";
import Avatar from "react-avatar";
import DeletedButton from "../DeletedButton/deletedButton";
import useRejectInvitation from "../../../hooks/useRejectInvitation";

const GuestEventes: React.FC<GuestEventesProps> = ({ date, id, name, invitations, coloor }) => {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false); 
  const { rejectInvitation } = useRejectInvitation(); // Usa el hook de rechazo de invitación

  const handleButtonClick = () => {
    console.log(`Button clicked. Card ID: ${id}`);
    navigate(`/detail/${id}`, { state: { id, userType: "Guest" } });
  };

  const toggleButtons = () => {
    setShowButtons(!showButtons); 
  };

  const handleReject = (userId: string) => {
    rejectInvitation(id, userId); // Rechaza la invitación
  };

  return (
    <div id="guest_events" style={{ backgroundColor: coloor }}>
      <div id="invitation">
        {invitations.length > 0 ? (
          <div id="guest_list">
             {invitations.slice(0, 2).map((invitation, index) => (
              <Avatar
                key={invitation.userId}
                src={invitation.userImg}
                size={window.innerWidth < 740 ? "60" : "30"}
                round
                className={`sb-avatar__images ${index === 1 ? "second-avatar" : ""}`}
              />
            ))}
            {invitations.length > 2 && (
              <div className="more-invite">
                <span className="more-invites-text">+ {invitations.length - 2}</span>
              </div>
            )}
          </div>
        ) : (
          <p id="guest_text">There are no guests</p>
        )}
      </div>

      <button id="guest_events_button" onClick={handleButtonClick}>
        <p id="name_event">{name}</p>
        <p id="date_event">{date}</p>
      </button>

      <button id="threeDotsButton" onClick={toggleButtons}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M15.583 14.0601C15.583 14.3093 15.5091 14.5529 15.3706 14.7601C15.2322 14.9673 15.0354 15.1288 14.8052 15.2242C14.5749 15.3196 14.3216 15.3445 14.0772 15.2959C13.8328 15.2473 13.6082 15.1273 13.432 14.9511C13.2558 14.7749 13.1358 14.5503 13.0872 14.3059C13.0386 14.0615 13.0635 13.8082 13.1589 13.5779C13.2543 13.3477 13.4158 13.1509 13.623 13.0125C13.8302 12.874 14.0738 12.8001 14.323 12.8001C14.6572 12.8001 14.9776 12.9329 15.2139 13.1692C15.4502 13.4055 15.583 13.726 15.583 14.0601ZM14.323 8.18015C14.5722 8.18015 14.8158 8.10625 15.023 7.9678C15.2302 7.82935 15.3917 7.63256 15.4871 7.40233C15.5824 7.1721 15.6074 6.91875 15.5588 6.67434C15.5102 6.42992 15.3901 6.20541 15.2139 6.0292C15.0377 5.85299 14.8132 5.73298 14.5688 5.68437C14.3244 5.63575 14.071 5.6607 13.8408 5.75607C13.6106 5.85143 13.4138 6.01293 13.2753 6.22014C13.1369 6.42734 13.063 6.67095 13.063 6.92015C13.063 7.25432 13.1957 7.57481 13.432 7.8111C13.6683 8.0474 13.9888 8.18015 14.323 8.18015ZM14.323 19.9401C14.0738 19.9401 13.8302 20.014 13.623 20.1524C13.4158 20.2909 13.2543 20.4877 13.1589 20.7179C13.0635 20.9481 13.0386 21.2015 13.0872 21.4459C13.1358 21.6903 13.2558 21.9148 13.432 22.091C13.6082 22.2673 13.8328 22.3873 14.0772 22.4359C14.3216 22.4845 14.5749 22.4595 14.8052 22.3642C15.0354 22.2688 15.2322 22.1073 15.3706 21.9001C15.5091 21.6929 15.583 21.4493 15.583 21.2001C15.583 20.8659 15.4502 20.5454 15.2139 20.3091C14.9776 20.0728 14.6572 19.9401 14.323 19.9401Z" fill="#343330"/>
        </svg>
      </button>

      {showButtons && (
        <div id="buttons_event">
          <DeletedButton onClick={() => handleReject("YqZdegGrN1MSG7bGA51GOTNcKkR2")} />
        </div>
      )}
    </div>
  );
};

export default GuestEventes;
