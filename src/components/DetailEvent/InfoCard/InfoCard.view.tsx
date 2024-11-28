import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ModalInvite from "../InviteDetailModal/InviteDetailModal";
import BackBtn from "../BackBtn/BackBtn.view";
import "./InfoCard.css";
import FunctionBtn from "../FunctionBtns/FunctionBtns.view";
import useInviteLogic from "../../../hooks/useInviteLogic";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../utils/firebaseConfig";

interface InfoProp {
  img: string;
  NameEvent: string;
  Host: string;
  EventType: string;
  DressCode: string;
  Date: string;
  StartTime: string;
  Location: string;
  Description: string;
}

interface EventInfo {
  name: string;
  image: string;
  host: string;
  eventType: string;
  dressCode: string;
  date: string;
  startTime: string;
  location: string;
  description: string;
}

const InfoCard: React.FC<InfoProp> = (prop) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const eventId = state?.id;

  const {
    isModalOpen,
    setIsModalOpen,
    searchValue,
    setSearchValue,
    filteredUsers,
    selectedUsers,
    setSelectedUsers,
    handleInviteUser,
    handleNextInvite,
  } = useInviteLogic(eventId);

  const handleNextShooping = () => {
    navigate(`/shopping/${eventId}`, {
      state: { eventType: prop.EventType, eventId },
    });
  };

  const handleNextFound = () => {
    console.log("Found clicked");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSearchValue("");
    setSelectedUsers([]);
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
          <p>{prop.Location}</p>
        </div>
        </div>
      </div>
      <div className="InfoSecttion2">
        <p>
          <strong>Description:</strong>{" "}
        </p>
        <p>{prop.Description}</p>
        <div className="FunctionBtns">
          <FunctionBtn
            NextShooping={handleNextShooping}
            NextFound={handleNextFound}
            NextInvite={handleNextInvite}
          />
        </div>
      </div>

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
