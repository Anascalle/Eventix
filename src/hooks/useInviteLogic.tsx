import { useState } from "react";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { useFetchFilteredUsers } from "./useFilteredUsers";

export interface User {
  id: string;
  username: string; 
  img:string
}

export interface UseInviteLogicReturn {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filteredUsers: User[]; 
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  selectedUser: User[];
  setSelectedUser: React.Dispatch<React.SetStateAction<User[]>>;
  handleInviteUser: () => Promise<void>;
  handleNextInvite: () => void;
  sentInvitations: { userId: string; eventId: string }[];
}

const useInviteLogic = (eventId: string | undefined) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(""); 
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const db = getFirestore();
  
  const filteredUsers = useFetchFilteredUsers(searchValue); // Obtén usuarios filtrados

  const handleInviteUser = async () => {
    if (!eventId || selectedUsers.length === 0) {
        console.error("No users selected or event ID is missing");
        return;
      }
    const invitationsRef = collection(db, "invitations");

    try {
        for (const user of selectedUsers) {
            const invitationDoc = doc(invitationsRef);
            await setDoc(invitationDoc, {
              eventId: eventId,
              userId: user.id,
              status: "pending",
              dateSent: new Date().toISOString(),
            });
            console.log(`Invitación enviada a: ${user.username} para el evento: ${eventId}`);
          }
      
          setIsModalOpen(false);
          setSelectedUsers([]); // Limpiar selección
        } catch (error) {
          console.error("Error inviting users: ", error);
        }
    }

  const handleNextInvite = () => {
    setIsModalOpen(true); 
  };

  return {
    isModalOpen,
    setIsModalOpen,
    filteredUsers, // Usa los usuarios filtrados aquí
    searchValue, // Retorna el searchValue
    setSearchValue, // Retorna la función para setear searchValue
    selectedUsers,
    setSelectedUsers,
    handleInviteUser,
    handleNextInvite,
  
  };
};

export default useInviteLogic;
