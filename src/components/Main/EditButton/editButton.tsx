import React from "react";
import "./editButton.css"

interface EditButtonProps {
    icon: React.ReactNode;  // ReactNode permite pasar cualquier tipo de contenido de React (JSX, texto, etc.)
}

const EditButton: React.FC <EditButtonProps> = ({icon}) => {
    return (
       <div>
        <button id="edit_button">{icon}</button>
       </div>
    );
}

export default EditButton