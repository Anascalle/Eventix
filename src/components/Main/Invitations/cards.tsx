import React from "react";
import DeletedButton from "../DeletedButton/deletedButton";
import EditButton from "../EditButton/editButton";
import { deleteInvitation } from "../../../utils/firebaseConfig"; // Asegúrate de que la ruta sea correcta
import "./invitations.css";

interface InvitationsProps {
    id: string;
    name: string;
    ocation: string;
    date: string;
    url: string;
    onDelete: (id: string) => void; // Añadido callback onDelete
}

const InvitationsCards: React.FC<InvitationsProps> = ({
  id,
  name,
  ocation,
  date,
  url,
  onDelete
}) => {

  const handleDelete = async () => {
    await deleteInvitation(id); // Borra el evento de Firebase
    onDelete(id); // Actualiza la lista de eventos en la interfaz
  };

  return (
    <div id="Invitation">
      <img id="porfile_img" src={url} alt={name} />
      <div id="invitation_text">
        <p id="name">{name} sent you an invitation</p>
        <p id="ocation">
          Ocation: <span id="ocation_type">{ocation}</span>
        </p>
        <p id="date">
          Date: <span id="date_number">{date}</span>
        </p>
      </div>
      <div id="Buttons">
        <DeletedButton onClick={handleDelete} />
        <EditButton
          icon={<span className="material-symbols-outlined">check</span>}
        />
      </div>
    </div>
  );
};

export default InvitationsCards;