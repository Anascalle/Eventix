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
}

const HostEvents: React.FC<HostEventsProps> = ({
    date,
    url,
    id,
    name,
}) => {
    
    const navigate = useNavigate();

    const handleButtonClick = () => {
        console.log(`Button clicked. Card ID: ${id}`);
        navigate(`/detail/${id}`, { state: { id } });
    };

    return (
        <>
        <div id="hosts_events">
            <button id="host_event_button" onClick={handleButtonClick}>
                <img id="event_img" src={url} alt="" />
                <p id="location_event">{name}</p>
                <p id="date_event">{date}</p>
            </button>
            <div id="buttons_event">
                <DeletedButton />
                <EditButton  icon="Edit" />
            </div>
            </div>
        </>
    );
};

export default HostEvents;
