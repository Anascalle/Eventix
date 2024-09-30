import React from "react";
import DeletedButton from "../DeletedButton/deletedButton";
import EditButton from "../EditButton/editButton";
import "./Host.css"

interface HostEventsProps {
    ocation: string;
    date: string;
    url: string;
  }
  
const HostEvents: React.FC<HostEventsProps> = ({
  ocation,
  date,
  url
}) =>{
  
  return (
    <div id="hosts_events">
        <img id="event_img" src={url} alt="" />
        <p id="ocation_event">{ocation}</p>
        <p id="date_event">{date}</p>
        <div id="buttons_event">
            <DeletedButton></DeletedButton>
            <EditButton icon="Edit"></EditButton>
        </div>

  </div>
  );
};

export default HostEvents;
