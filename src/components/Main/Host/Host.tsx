import React from "react";
import { useNavigate } from 'react-router-dom';
import DeletedButton from "../DeletedButton/deletedButton";
import EditButton from "../EditButton/editButton";
import "./Host.css";

interface HostEventsProps {
  ocation: string;
  date: string;
  url: string;
  id: string;
}

const HostEvents: React.FC<HostEventsProps> = ({
  ocation,
  date,
  url,
  id
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    console.log(`Button clicked. Card ID: ${id}`);
    navigate('/detail/:id', { state: { id } }); 
  };

  return (
    <button className="host-event-button" onClick={handleButtonClick}>
      <img src={url} alt="Event" />
      <p className="ocation_event">{ocation}</p>
      <p className="date_event">{date}</p>
      <div className="buttons_event">
        <DeletedButton />
        <EditButton icon="Edit" />
      </div>
    </button>
  );
};

export default HostEvents;
