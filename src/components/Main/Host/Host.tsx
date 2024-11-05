import React from "react";
import DeletedButton from "../DeletedButton/deletedButton";
import EditButton from "../EditButton/editButton";
import "./Host.css";
import { useNavigate } from "react-router-dom";

interface HostEventsProps {
    date: string;
    image: string;
    id: string;  // ID del evento
    name: string;
}

const HostEvents: React.FC<HostEventsProps> = ({
    date,
    image,
    id,
    name,
}) => {
    
    const navigate = useNavigate();

    const handleButtonClick = () => {
        console.log(`Button clicked. Card ID: ${id}`);
        navigate(`/detail/${id}`, { state: { id } });
    };

    return (
        <div id="hosts_events">
            <button id="host_event_button" onClick={handleButtonClick}>
                <img id="event_img" src={image} alt="" />
                <p id="location_event">{name}</p>
                <p id="date_event">{date}</p>
            </button>
            <div id="buttons_event">
                <DeletedButton />
                <EditButton icon="edit" eventId={id} />
            </div>
        </div>
    );
};

export default HostEvents;
