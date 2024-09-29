import React from "react";
import "./NewEventButton.css"

const NewEventButton: React.FC = () => {

    return (
       <div id="button_new_div">
        <h2 id="new_event_text">
            Create a new event!
        </h2>
        <button id="new_nevent_button">
            +
        </button>
       </div>
    );
}

export default NewEventButton