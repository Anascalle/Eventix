import React from "react";
import DeletedButton from "../DeletedButton/deletedButton";
import EditButton from "../EditButton/editButton";
import { useNavigate } from "react-router-dom";
import "./Host.css";

interface HostEventsProps {
  date: string;
  url: string;
  id: string;
  name: string;
  onDelete: () => void; // Recibimos la función de eliminación
}

const HostEvents: React.FC<HostEventsProps> = ({
  date,
  url,
  id,
  name,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/detail/${id}`, { state: { id } });
  };

  return (
    <button id="hosts_events" onClick={handleButtonClick}>
      <img id="event_img" src={url} alt="" />
      <p id="ocation_event">{name}</p>
      <p id="date_event">{date}</p>
      <div id="buttons_event">
        <DeletedButton onClick={onDelete} /> {/* Llama a la función de eliminación al hacer clic */}
        <EditButton icon="Edit" />
      </div>
    </button>
  );
};

export default HostEvents;