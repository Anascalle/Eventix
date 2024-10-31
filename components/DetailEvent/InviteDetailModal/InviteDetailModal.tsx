import React from 'react';
import "./InviteDetailModal.css"

interface User {
  id: string;
  username: string;
  img:string
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
  handleInviteUser
}) => {
  
  const handleUserSelect = (user: User) => {
    if (!selectedUsers.some(selected => selected.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter(user => user.id !== userId));
  };

  // Filtrado de usuarios basado en el valor de búsqueda
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="modal">
      <div className="modalContent">
      <button className='closemodal_button' onClick={closeModal}>x</button>
        <h1 className='add_title'>Add a new guest</h1>
        <input
          type="text"
          placeholder="Guest name"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="searchInput"
        />
        
        {searchValue.trim() !== '' && (
          <>
            {filteredUsers.length === 0 ? (
              <p>No se encontraron usuarios</p>
            ) : (
              <div className="user-list">
                {filteredUsers.map(user => (
                  <div key={user.id} onClick={() => handleUserSelect(user)}>
                    <p>{user.username}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
         <h3 className='sent_title'>Sent to</h3>
        <div className="selected-users">
         
          {selectedUsers.map((user) => (
            <div key={user.id} className="selected-user-card">
               <img src={user.img} alt={user.username} className="selected-user-image" />
              <p>{user.username}</p>
              <button className="eliminate_guest"onClick={() => handleRemoveUser(user.id)}>x</button>
            </div>
          ))}
        </div>
        
        <div className="modalActions">
          <button className="Addguest_button"onClick={handleInviteUser} disabled={selectedUsers.length === 0}>Add guests</button>
        </div>
      </div>
    </div>
  );
};

export default ModalInvite;
