import React from "react";
import { db } from "../../../utils/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import firebase from "firebase/compat/app"; // Ensure Firebase is imported correctly

interface InvitationsProps {
  id: string;
  name: string;
  ocation: string;
  url: string;
  status: string;
}

const AceptedInvitations: React.FC<InvitationsProps> = ({ id, name, ocation, url, status }) => {
  const handleAcceptInvite = async (eventId: string, userId: string) => {
    try {
      const eventDocRef = doc(db, "events", eventId);

      // Agregar el usuario a la lista de aceptados y removerlo de los invitados
      await updateDoc(eventDocRef, {
        aceptados: firebase.firestore.FieldValue.arrayUnion(userId),
        invitados: firebase.firestore.FieldValue.arrayRemove(userId),
      });

      alert("¡Invitación aceptada!");
    } catch (e) {
      console.error("Error al aceptar la invitación: ", e);
    }
  };

  const handleRejectInvite = async (eventId: string, userId: string) => {
    try {
      const eventDocRef = doc(db, "events", eventId);

      // Aquí quitamos al usuario de los invitados si lo rechaza
      await updateDoc(eventDocRef, {
        invitados: firebase.firestore.FieldValue.arrayRemove(userId),
      });

      alert("¡Invitación rechazada!");
    } catch (e) {
      console.error("Error al rechazar la invitación: ", e);
    }
  };

  return (
    <div id="acepted_invitation">
      <img id="porfile_img" src={url} alt={name} />
      <div id="acepted_invitation_text">
        <p>{name} invited you to <span>{ocation}</span></p>
        {status === "pending" && (
          <div>
            <button onClick={() => handleAcceptInvite(id, "userId")}>Accept</button>
            <button onClick={() => handleRejectInvite(id, "userId")}>Reject</button>
          </div>
        )}
        {status === "accepted" && <p>Accepted</p>}
        {status === "rejected" && <p>Rejected</p>}
      </div>
    </div>
  );
};

export default AceptedInvitations;
