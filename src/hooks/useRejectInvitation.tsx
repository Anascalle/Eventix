import { useState } from "react";
import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";  // Asegúrate de importar tu instancia de Firestore

const useRejectInvitation = () => {
  const [rejecting, setRejecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rejectInvitation = async (eventId: string, userId: string) => {
    const invitationRef = doc(db, "invitations", eventId); // Suponiendo que 'eventId' es el ID del documento de invitación

    setRejecting(true);  // Indicamos que estamos en el proceso de rechazo
    setError(null);      // Limpiamos cualquier error previo

    try {
      // Obtenemos el documento de la invitación
      const invitationDoc = await getDoc(invitationRef);

      // Verificamos si el documento existe
      if (!invitationDoc.exists()) {
        throw new Error("Invitation not found");
      }

      // Verificamos si el estado de la invitación es 'accepted', para asegurarnos de que solo se pueda rechazar si está aceptada
      const invitationData = invitationDoc.data();
      if (invitationData?.guests?.[userId]?.status !== 'accepted') {
        throw new Error("Invitation not accepted, cannot reject.");
      }

      // Cambiamos el estado del usuario a 'rejected' y eliminamos su invitación del evento
      await updateDoc(invitationRef, {
        [`guests.${userId}.status`]: "rejected",  // Cambiamos el estado a rechazado
        [`guests.${userId}`]: deleteField()      // Eliminamos el registro del invitado
      });

      console.log("Invitation status updated to rejected and guest removed");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      console.error("Error rejecting invitation:", err);
    } finally {
      setRejecting(false);  // Terminamos el proceso de rechazo
    }
  };

  return { rejectInvitation, rejecting, error };
};

export default useRejectInvitation;
