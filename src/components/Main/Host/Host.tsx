import React from "react";
import DeletedButton from "../DeletedButton/deletedButton";
import EditButton from "../EditButton/editButton";
import { useNavigate } from "react-router-dom";
import useDeleteEvent from "../../../hooks/useDeleteComponent";
import "./Host.css";

interface HostEventsProps {
  date: string;
  url: string;
  id: string;
  name: string;
}

const HostEvents: React.FC<HostEventsProps> = ({ date, url, id, name }) => {
  const navigate = useNavigate();
  const { deleteEvent, deleting, error } = useDeleteEvent();

  const handleDelete = () => {
    deleteEvent(id);
  };

  const handleButtonClick = () => {
    navigate(`/detail/${id}`, { state: { id } });
  };

  return (
    <button id="hosts_events" onClick={handleButtonClick}>
      <img id="event_img" src={url} alt="" />
      <p id="location_event">{name}</p>
      <p id="date_event">{date}</p>
      <div id="buttons_event">
        <DeletedButton onClick={handleDelete} />
        <EditButton icon="Edit" />
      </div>
      {deleting && <p>Deleting...</p>}
      {error && <p>{error}</p>}
    </button>
  );
};

export default HostEvents;