import React from "react";
import "./guest.css"

interface GuestEventesProps {
    ocation: string;
    date: string;
    url: string;
    name: string
  }
  
const GuestEventes: React.FC<GuestEventesProps> = ({
  ocation,
  date,
  url,
  name
}) =>{
  
  return (
    <div id="Guest_events">
        <img id="event_img" src={url} alt="" />
        <p id="ocation_event">{ocation}</p>
        <p id="date_event">{date}</p>
        <p id="host_name">Host: <span>{name}</span></p>
  </div>
  );
};

export default GuestEventes;
