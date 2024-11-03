import React from "react";
import DeletedButton from "../DeletedButton/deletedButton";
import EditButton from "../EditButton/editButton";
import "./Host.css";
import { useNavigate } from "react-router-dom";

interface HostEventsProps {
  date: string;
  url: string;
  id: string;
  name: string;
  onDelete: (id: string) => void;
}

const HostEvents: React.FC<HostEventsProps> = ({
  date,
  url,
  id,
  name,
  onDelete
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    console.log(`Button clicked. Card ID: ${id}`);
    navigate(`/detail/${id}`, { state: { id } });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <button id="hosts_events" onClick={handleButtonClick}>
      <img id="event_img" src={url} alt="" />
      <p id="ocation_event">{name}</p>
      <p id="date_event">{date}</p>
      <div id="buttons_event">
        <DeletedButton onClick={handleDelete} /> {/* Pasa handleDelete como onClick */}
        <EditButton icon="Edit" />
      </div>
    </button>
  );
};

export default HostEvents;