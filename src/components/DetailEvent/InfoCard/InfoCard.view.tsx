import React, { useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ModalInvite from "../InviteDetailModal/InviteDetailModal";
import GuestModal from "../GuestListModal/GuestListModal";
import "./InfoCard.css";
import { getDoc, doc } from "firebase/firestore";
import { db} from "../../../utils/firebaseConfig";
import FunctionBtn from "../FunctionBtns/FunctionBtns.view";
import useInviteLogic from "../../../hooks/useInviteLogic";
import { InfoProp, EventInfo } from "../../../Types/types";
import useGuestEvents from "../../../hooks/useGuest";
import BackBtn from "../BackBtn/BackBtn.view";



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

  const {  invitations } = useGuestEvents(state?.userId);

  const [showGuests, setShowGuests] = useState(false);

  
  const handleNextShooping = () => {
    navigate(`/shopping/${eventId}`, { state: { eventType: prop.EventType, eventId } });
  };


  const handleNextFound = () => {
    navigate(`/found/${eventId}`, { state: { eventType: prop.EventType, eventId } });
  };

  
  const handleInviteHost = () => {
    setIsModalOpen(true);
    console.log("Invitación enviada por el Host");
  };

  
  const handleInviteGuest = () => {
    console.log("Invitación enviada por el Guest");
    setShowGuests(true); 
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setSearchValue("");
    setSelectedUsers([]);
  };


  const handleCloseGuestsModal = () => {
    setShowGuests(false);
  };

  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);


  useEffect(() => {
    const fetchEventDetails = async () => {
      const docRef = doc(db, "events", eventId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Event data:", docSnap.data());
        setEventInfo(docSnap.data() as EventInfo);
      } else {
        console.log("No such document!");
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (!eventInfo) {
    return <p>Loading event details...</p>;
  }
  return (
    <div className="InfoCard">
    <BackBtn NameEvent={eventInfo.name} />
    <div className="ImgBanner">
      <img src={prop.img} alt="" />
    </div>
    <div className="NameEvent">
      <h1>{prop.NameEvent}</h1>
    </div>
    <div className="Host">
      <p>{prop.Host}</p>
    </div>
    <div className="InfoSecttion1">
    <div id="row1">
      <div className="EventDescription">
       <img src="https://raw.githubusercontent.com/valen-web/LAB5/refs/heads/main/Group%201000004562d.png" alt="EventTypeIcon" />
        <p>{prop.EventType}</p>
        </div>
      <div className="EventDescription">
        <img src="https://raw.githubusercontent.com/valen-web/LAB5/refs/heads/main/Group%201000004562.png" alt="DressCodeIcon" />
        <p>{prop.DressCode}</p>
      </div>
      </div>
      <div id="row2">
      <div className="EventDescription">
       <img src="https://raw.githubusercontent.com/valen-web/LAB5/refs/heads/main/Group%201000004561.png" alt="DateIcon" />
        <p>{prop.Date}</p>
      </div>
      <div className="EventDescription">
       <img src="https://raw.githubusercontent.com/valen-web/LAB5/refs/heads/main/Group%20100000456e.png" alt="StartTimeIcon" />
        <p>{prop.StartTime}</p>
      </div>
      </div>
      <div id="row3">
      <div className="EventDescription">
        <img src="https://raw.githubusercontent.com/valen-web/LAB5/refs/heads/main/dcc.png" alt="LocationIcon" />
        <p>{prop.Location}</p>
      </div>
      <div className="EditEventButton">
        <img src="https://raw.githubusercontent.com/valen-web/LAB5/refs/heads/main/download.webp" alt="Esiteven" />
      </div>
      </div>
    </div>
    <div className="InfoSecttion2">
      <div id="info_desc_info">
      <p >
        <strong>Description:</strong>{" "}
      </p>
      <p>{prop.Description}</p>
      </div>
      
     
      <div id="FunctionBtns">
        {userType === "Host" && (
          <FunctionBtn
            NextShooping={handleNextShooping}
            NextFound={handleNextFound}
            NextInvite={handleInviteHost} 
          />
        )}
        {userType === "Guest" && (
          <FunctionBtn
            NextFound={handleNextFound}
            NextInvite={handleInviteGuest} 
            InviteButtonText="Guests"
            InviteButtonIcon={
              <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
              <path d="M27.7527 9.46877C27.7527 9.12896 27.8877 8.80307 28.128 8.56279C28.3683 8.32251 28.6942 8.18752 29.034 8.18752H31.5965V5.62502C31.5965 5.28521 31.7314 4.95932 31.9717 4.71904C32.212 4.47876 32.5379 4.34377 32.8777 4.34377C33.2175 4.34377 33.5434 4.47876 33.7837 4.71904C34.024 4.95932 34.159 5.28521 34.159 5.62502V8.18752H36.7215C37.0613 8.18752 37.3872 8.32251 37.6274 8.56279C37.8677 8.80307 38.0027 9.12896 38.0027 9.46877C38.0027 9.80858 37.8677 10.1345 37.6274 10.3747C37.3872 10.615 37.0613 10.75 36.7215 10.75H34.159V13.3125C34.159 13.6523 34.024 13.9782 33.7837 14.2185C33.5434 14.4588 33.2175 14.5938 32.8777 14.5938C32.5379 14.5938 32.212 14.4588 31.9717 14.2185C31.7314 13.9782 31.5965 13.6523 31.5965 13.3125V10.75H29.034C28.6942 10.75 28.3683 10.615 28.128 10.3747C27.8877 10.1345 27.7527 9.80858 27.7527 9.46877ZM37.7721 18.2261C38.3574 21.7056 37.8218 25.2811 36.2426 28.4363C34.6634 31.5916 32.1223 34.1633 28.9862 35.7802C25.8501 37.3971 22.2813 37.9755 18.7951 37.4319C15.3088 36.8883 12.0855 35.2508 9.59059 32.7559C7.09565 30.2609 5.45816 27.0377 4.91455 23.5514C4.37095 20.0651 4.94935 16.4963 6.56626 13.3602C8.18316 10.2241 10.7549 7.68305 13.9101 6.10384C17.0654 4.52464 20.6409 3.98905 24.1204 4.57439C24.453 4.63321 24.7489 4.82097 24.9437 5.09684C25.1386 5.37271 25.2167 5.71436 25.1609 6.04748C25.1052 6.3806 24.9202 6.67824 24.6461 6.87566C24.3721 7.07308 24.0312 7.1543 23.6976 7.10166C21.6766 6.76169 19.6058 6.86619 17.6294 7.40789C15.6529 7.94959 13.8182 8.91547 12.253 10.2383C10.6878 11.5612 9.4296 13.2092 8.56605 15.0677C7.70251 16.9263 7.25433 18.9507 7.25271 21C7.24968 24.4501 8.5177 27.7804 10.8146 30.3547C12.2436 28.284 14.2529 26.6821 16.5898 25.7503C15.3345 24.7615 14.4185 23.4062 13.9691 21.8727C13.5198 20.3392 13.5595 18.7038 14.0827 17.194C14.6059 15.6841 15.5866 14.3748 16.8885 13.4482C18.1903 12.5215 19.7485 12.0235 21.3465 12.0235C22.9444 12.0235 24.5026 12.5215 25.8045 13.4482C27.1063 14.3748 28.087 15.6841 28.6102 17.194C29.1334 18.7038 29.1731 20.3392 28.7238 21.8727C28.2745 23.4062 27.3584 24.7615 26.1031 25.7503C28.4401 26.6821 30.4494 28.284 31.8783 30.3547C34.1752 27.7804 35.4432 24.4501 35.4402 21C35.4403 20.2123 35.3749 19.4259 35.2448 18.6489C35.2153 18.4823 35.2192 18.3114 35.2561 18.1462C35.2931 17.981 35.3623 17.8248 35.46 17.6866C35.5577 17.5483 35.6817 17.4308 35.8251 17.3408C35.9684 17.2508 36.1281 17.19 36.2951 17.1621C36.462 17.1342 36.6328 17.1396 36.7977 17.1781C36.9625 17.2165 37.1181 17.2873 37.2554 17.3862C37.3927 17.4851 37.5091 17.6103 37.5978 17.7545C37.6865 17.8986 37.7457 18.0589 37.7721 18.2261ZM21.3465 24.8438C22.3601 24.8438 23.351 24.5432 24.1938 23.98C25.0366 23.4169 25.6934 22.6165 26.0813 21.68C26.4692 20.7435 26.5707 19.7131 26.373 18.7189C26.1752 17.7248 25.6871 16.8116 24.9704 16.0948C24.2536 15.3781 23.3405 14.89 22.3463 14.6922C21.3521 14.4945 20.3217 14.596 19.3852 14.9839C18.4487 15.3718 17.6483 16.0287 17.0852 16.8715C16.522 17.7143 16.2215 18.7051 16.2215 19.7188C16.2215 21.078 16.7614 22.3816 17.7225 23.3427C18.6837 24.3038 19.9872 24.8438 21.3465 24.8438ZM21.3465 35.0938C24.4749 35.0969 27.5146 34.054 29.9821 32.1309C29.0552 30.6813 27.7783 29.4883 26.2691 28.662C24.76 27.8356 23.0671 27.4025 21.3465 27.4025C19.6259 27.4025 17.933 27.8356 16.4238 28.662C14.9146 29.4883 13.6377 30.6813 12.7108 32.1309C15.1784 34.054 18.218 35.0969 21.3465 35.0938Z" fill="#0E0D35"/>
              </svg>
            }
          />
        )}
      </div>
        </div>
     
      {showGuests && (
        <GuestModal
          eventId={eventId}
          closeModal={handleCloseGuestsModal}
          invitations={invitations} 
        />
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
