import React, { useState, useEffect } from 'react';
import ModalInviteView from './InviteDetailModal.view';
import { useUser } from '../../../context/useContext'; // Importa el contexto de usuario
import toast from 'react-hot-toast'; // Importa toast para mostrar alertas
import "./InviteDetailModal.css";

interface User {
  id: string;
  username: string;
  img: string;
}

interface ModalInviteProps {
  users: User[];
  searchValue: string;
  setSearchValue: (value: string) => void;
  closeModal: () => void;
  selectedUsers: User[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<User[]>>;
  handleInviteUser: () => Promise<void>;
}

const ModalInvite: React.FC<ModalInviteProps> = ({
  users,
  searchValue,
  setSearchValue,
  closeModal,
  selectedUsers,
  setSelectedUsers,
  handleInviteUser,
}) => {
  const { user } = useUser(); // Obtén el usuario autenticado desde el contexto
  const currentUserId = user?.uid || ''; // Asegúrate de que el usuario esté autenticado y obtener el UID

  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 800); 

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  const handleUserSelect = (user: User) => {
    // Verificar si el usuario es el mismo que está autenticado
    if (user.id === currentUserId) {
      // Si el usuario intenta invitarse a sí mismo, muestra una alerta
      toast.error('You cannot invite yourself!');
    } else if (!selectedUsers.some((selected) => selected.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
      setSearchValue(''); // Limpiar el campo de búsqueda después de seleccionar
    }
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id !== userId));
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(debouncedSearchValue.toLowerCase())
  );

  // Modificación de la función handleInviteUser
  const handleInviteUserWithNotification = async () => {
    try {
      // Lógica para invitar a los usuarios seleccionados
      await handleInviteUser();  // Llama la función original de invitar usuarios

      // Si la invitación fue exitosa, muestra la notificación
      toast.success('Invitation sent successfully.');
      closeModal();  // Cierra el modal después de la invitación
    } catch (error) {
      // Si ocurre un error
      toast.error('Hubo un error al enviar la invitación.');
    }
  };

  return (
    <ModalInviteView
      closeModal={closeModal}
      handleInviteUser={handleInviteUserWithNotification} // Pasa la función modificada
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      filteredUsers={filteredUsers}
      selectedUsers={selectedUsers}
      handleUserSelect={handleUserSelect}
      handleRemoveUser={handleRemoveUser}
    />
  );
};

export default ModalInvite;
