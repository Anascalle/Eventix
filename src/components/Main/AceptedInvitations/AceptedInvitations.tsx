import React, { useEffect, useState } from "react";
import { db } from "../../../utils/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./AceptedInvitations.css";
import { AcceptedUser, InvitationsAcceptProps } from "../../../Types/types";

const InvitationsAccept: React.FC<InvitationsAcceptProps> = ({ creatorId }) => {
  const [acceptedUsers, setAcceptedUsers] = useState<AcceptedUser[]>([]);
  const [startIndex, setStartIndex] = useState(0); // Índice de inicio para los 5 usuarios visibles

  useEffect(() => {
    console.log("Creator ID in InvitationsAccept:", creatorId);

    if (!creatorId) {
      console.error("Creator ID is missing.");
      return;
    }

    const fetchAcceptedUsers = async () => {
      try {
        const invitationsRef = collection(db, "invitations");
        const q = query(invitationsRef, where("creatorId", "==", creatorId), where("status", "==", "accepted"));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log("No accepted invitations found for this creator.");
          return;
        }

        const acceptedUsersData: AcceptedUser[] = [];
        querySnapshot.forEach((doc) => {
          const invitationData = doc.data();
          console.log("Invitation Data:", invitationData);

          if (invitationData.userId && invitationData.username && invitationData.userImg) {
            acceptedUsersData.push({
              id: invitationData.userId,
              name: invitationData.username,
              profileUrl: invitationData.userImg,
              eventName: invitationData.eventName || "Unknown Event",
            });
          } else {
            console.warn("Missing fields in invitation data:", invitationData);
          }
        });

        setAcceptedUsers(acceptedUsersData);
        console.log("Accepted Users:", acceptedUsersData);
      } catch (error) {
        console.error("Error fetching accepted users:", error);
      }
    };

    fetchAcceptedUsers();
  }, [creatorId]);

  useEffect(() => {
   
    if (acceptedUsers.length > 5) {
      setStartIndex(acceptedUsers.length - 5);  
    }
  }, [acceptedUsers]);

  const visibleUsers = acceptedUsers.slice(startIndex, startIndex + 5);

  return (
    <div id="acepted_invitations_shadow">
      <div id="acepted_invitations_div">
        <h2 id="acepted_invitations_tittles">Your notifications</h2>
        {visibleUsers.length > 0 ? (
          visibleUsers.map((user) => (
            <div key={user.id} id="acepted_invitation">
              <img id="img_acc" src={user.profileUrl} alt={user.name} />
              <div id="acepted_invitation_text">
                <p id="text_accepted_p">{user.name} accepted the invitation for <br/><span className="bold-text">{user.eventName}</span></p>
              </div>
            </div>
          ))
        ) : (
          <p id="no_accepted_inv_acc">No accepted invitations yet.</p>
        )}
      </div>
    </div>
  );
};

export default InvitationsAccept;
