import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ModalInvite from "../InviteDetailModal/InviteDetailModal";
import "./InfoCard.css";
import FunctionBtn from "../FunctionBtns/FunctionBtns.view";
import useInviteLogic from "../../../hooks/useInviteLogic";
import { InfoProp } from "../../../Types/types";

const InfoCard: React.FC<InfoProp> = (prop) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const eventId = state?.id;
  const userType = state?.userType || "Guest";

  const {
    isModalOpen,
    setIsModalOpen,
    searchValue,
    setSearchValue,
    filteredUsers,
    selectedUsers,
    setSelectedUsers,
    handleInviteUser,
  
  } = useInviteLogic(eventId);

  const [showGuests, setShowGuests] = useState(false); // Estado para mostrar la lista de invitados

  const handleNextShooping = () => {
    navigate(`/shopping/${eventId}`, { state: { eventType: prop.EventType, eventId } });
  };

  const handleNextFound = () => {
    console.log("Found clicked");
  };

  const handleInviteHost = () => {
    setIsModalOpen(true);
    console.log("Invitación enviada por el Host");
  };

  const handleInviteGuest = () => {
    console.log("Invitación enviada por el Guest");
    setShowGuests(true); // Mostrar invitados cuando el botón de Guest sea presionado
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSearchValue('');
    setSelectedUsers([]);
  };

  return (
    <div className="InfoCard">
      <div className="ImgBanner">
        <img src={prop.img} alt="img event" />
      </div>
      <div className="NameEvent">
        <h1>{prop.NameEvent}</h1>
      </div>
      <div className="Host">
        <p>{prop.Host}</p>
      </div>
      <div className="InfoSections">
        <div className="InfoSecttion1">
          <p><strong>Event Type:</strong> {prop.EventType}</p>
          <p><strong>Dress Code:</strong> {prop.DressCode}</p>
          <p><strong>Date:</strong> {prop.Date}</p>
          <p><strong>Start Time:</strong> {prop.StartTime}</p>
          <p><strong>Location:</strong> {prop.Location}</p>
        </div>
        <div className="InfoSecttion2">
          <p><strong>Description:</strong> </p>
          <p>{prop.Description}</p>
        </div>
      </div>

      <div className="FunctionBtns">
        {userType === "Host" && (
          <FunctionBtn
            NextShooping={handleNextShooping}
            NextFound={handleNextFound}
            NextInvite={handleInviteHost}  // Función para el Host
          />
        )}
        {userType === "Guest" && (
          <FunctionBtn 
            NextFound={handleNextFound} 
            NextInvite={handleInviteGuest}  // Función para el Guest
            InviteButtonText="Guests"
            InviteButtonIcon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">
              <path d="M8.63062 10.5005C9.64425 10.5005 10.6351 10.1999 11.4779 9.63677C12.3207 9.07363 12.9776 8.27321 13.3655 7.33674C13.7534 6.40027 13.8549 5.36981 13.6571 4.37565C13.4594 3.3815 12.9713 2.46831 12.2545 1.75157C11.5378 1.03482 10.6246 0.546715 9.63046 0.348966C8.63631 0.151217 7.60584 0.252708 6.66937 0.640607C5.7329 1.02851 4.93248 1.68539 4.36934 2.52819C3.8062 3.371 3.50562 4.36186 3.50562 5.37549C3.50562 6.73473 4.04557 8.03829 5.0067 8.99941C5.96782 9.96054 7.27139 10.5005 8.63062 10.5005ZM8.63062 20.7505C11.7591 20.7536 14.7987 19.7107 17.2662 17.7876C16.3394 16.338 15.0625 15.145 13.5533 14.3187C12.0441 13.4924 10.3512 13.0592 8.63062 13.0592C6.91002 13.0592 5.21711 13.4924 3.70793 14.3187C2.19875 15.145 0.921874 16.338 -0.00500488 17.7876C2.46252 19.7107 5.50219 20.7536 8.63062 20.7505Z" fill="#0E0D35"/>
            </svg>}
          />
        )}
      </div>

      {/* Mostrar invitados cuando se presiona el botón de Guest */}
      {showGuests && (
        <div className="GuestList">
          <h3>Invitados:</h3>
          <ul>
            {filteredUsers.map((user) => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
        </div>
      )}

      {isModalOpen && (
        <ModalInvite
          users={filteredUsers}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          closeModal={closeModal} 
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          handleInviteUser={handleInviteUser}
        />
      )}
    </div>
  );
};

export default InfoCard;
