import React from "react";
import "./NewEventButton.css"

interface OpenModalButtonProps {
    onClick: () => void;  
}

const NewEventButton: React.FC<OpenModalButtonProps>  = ({ onClick }) => {

    return (
       <div id="button_new_div">
       
        <button id="new_nevent_button"onClick={onClick}>
            +
        </button>
       </div>
    );
}

export default NewEventButton