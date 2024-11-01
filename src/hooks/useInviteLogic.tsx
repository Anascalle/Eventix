import { useState } from "react";
import { getFirestore, collection, doc, setDoc, getDoc } from "firebase/firestore";
import { useFetchFilteredUsers } from "./useFilteredUsers";

export interface User {
  id: string;
  username: string; 
  img: string;
}

export interface UseInviteLogicReturn {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filteredUsers: User[]; 
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  selectedUsers: User[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<User[]>>;
  handleInviteUser: () => Promise<void>;
  handleNextInvite: () => void;
  sentInvitations: { userId: string; eventId: string; eventType?: string; eventDate?: string; startTime?: string; creatorName?: string; username?: string }[];
}

const useInviteLogic = (eventId: string | undefined): UseInviteLogicReturn => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(""); 
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [sentInvitations, setSentInvitations] = useState<
    { userId: string; eventId: string; eventType?: string; eventDate?: string; startTime?: string; creatorName?: string; username?: string }[]
  >([]);

  const db = getFirestore();
  const filteredUsers = useFetchFilteredUsers(searchValue); 

  
  const fetchEventDetails = async (eventId: string) => {
    const eventRef = doc(db, "events", eventId);
    const eventDoc = await getDoc(eventRef);
    if (eventDoc.exists()) {
      const eventData = eventDoc.data();
      return {
        eventType: eventData?.eventType || "",
        eventDate: eventData?.date || "", 
        startTime: eventData?.startTime || "",
        creatorName: eventData?.creatorName || "",
      };
    }
    return { eventType: "", eventDate: "", startTime: "", creatorName: "" };
  };


  const fetchUserDetails = async (userId: string) => {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return {
        username: userData?.username || "",
      };
    }
    return { username: "" };
  };

  const handleInviteUser = async () => {
    if (!eventId || selectedUsers.length === 0) {
      console.error("No users selected or event ID is missing");
      return;
    }

    try {
      const eventDetails = await fetchEventDetails(eventId);
      const newInvitations: any[] = [];  

      for (const user of selectedUsers) {
        const userDetails = await fetchUserDetails(user.id);
        const invitation = {
          userId: user.id,
          eventId: eventId,
          eventType: eventDetails.eventType,
          eventDate: eventDetails.eventDate, 
          startTime: eventDetails.startTime,
          username: userDetails.username,
        };
        newInvitations.push(invitation);

        const invitationsRef = collection(db, "invitations");
        const invitationDoc = doc(invitationsRef);
        await setDoc(invitationDoc, {
          ...invitation,
          status: "pending",
          dateSent: new Date().toISOString(),
        });
        console.log(`Invitación enviada a: ${userDetails.username} para el evento: ${eventId}`);
      }

      setSentInvitations((prev) => [...prev, ...newInvitations]);
      setIsModalOpen(false);
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error inviting users: ", error);
    }
  };

  const handleNextInvite = () => {
    setIsModalOpen(true); 
  };

  return {
    isModalOpen,
    setIsModalOpen,
    filteredUsers,
    searchValue,
    setSearchValue,
    selectedUsers,
    setSelectedUsers,
    handleInviteUser,
    handleNextInvite,
    sentInvitations,
  };
};

export default useInviteLogic;
