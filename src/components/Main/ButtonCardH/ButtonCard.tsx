import React, { useState } from "react";
import DeletedButton from "../DeletedButton/deletedButton";
import EditButton from "../EditButton/editButton";
import { ButtonCardH } from "../../../Types/types";
import "./ButtonCard.css"

const ButtonCardHoust: React.FC<ButtonCardH> = ({ id, handleDelete, deleting, error }) => {
 
  const [showButtons, setShowButtons] = useState<boolean>(false);

 
  const toggleButtons = () => setShowButtons((prev) => !prev);

  return (
    <div id="buttons_event_container">
    
      <button id="threeDotsButton" onClick={toggleButtons}>
        &#x2022;&#x2022;&#x2022;
      </button>

    
      {showButtons && (
        <div id="buttons_event">
          <DeletedButton onClick={handleDelete} />
          <EditButton icon="Edit" eventId={id} />
        </div>
      )}

      {deleting && <p>Deleting...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ButtonCardHoust;
