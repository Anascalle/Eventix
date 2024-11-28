export interface EventProfile {
    id: string; 
    userId:string;
    name: string;
    eventType: string;
    date: string;
    image: string;
  }
  
  export interface Invitation {
    id: string;  
    userId: string;
    userImg: string;
    username: string;
    status: string;
    eventId?: string;
  }

  export interface HostEventsProps {
    date: string;
    color:string
    image: string;
    id: string;  
    name: string;
    invitations: Invitation[];
}

export interface ButtonCardH {
    id: string;
    handleDelete: () => void;
    deleting: boolean;
    error: string | null;
  }

export interface EditButtonProps {
    icon: React.ReactNode; 
    eventId: string;  
}
export interface DeletedButtonProps {
  onClick: () => void;
}

export interface InvitationsProps {
  ocation: string;
  creatorImg: string;
  creator: string;
  eventDate: string;
  eventData: any;
  hour: string;
  onAccept: () => void;
  onReject: () => void;
}

export interface AcceptButtonProps {
  icon: React.ReactNode;
  onClick: () => void; 
}

export interface AcceptedUser {
  id: string;
  name: string;
  profileUrl: string;
  eventName: string; 
}

export interface InvitationsAcceptProps {
  creatorId: string; 
}

export interface GuestEventesProps {
  ocation: string;
  coloor: string;
  invitations: Invitation[];
  date: string;
  name: string;
  id: string;
}

export interface CreateEventFormViewProps {
  name: string;
  setName: (value: string) => void;
  date: string;
  setDate: (value: string) => void;
  startTime: string;
  setStartTime: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  eventType: string;
  setEventType: (value: string) => void;
  dressCode: string;
  setDressCode: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  lat: number;
  lng: number;
  amount: number;
  setAmount: (value: number) => void;
  onMapClick: (event: any) => void; 
  onClose: () => void; 
}

export interface EeditEventViewProps {
  eventId: string;
  name: string;
  setName: (value: string) => void;
  date: string;
  setDate: (value: string) => void;
  startTime: string;
  setStartTime: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  eventType: string;
  setEventType: (value: string) => void;
  dressCode: string;
  setDressCode: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  
  lat: number;
  lng: number;
  amount: number;
  setAmount: (value: number) => void;
  onMapClick: (event: any) => void;
  onClose: () => void;
 
}

export interface MapUpdaterProps {
  lat: number;
  lng: number;
}

export interface EventMapProps {
  lat: number;
  lng: number;
  location?: string;
}

export interface RejectButtonProps{
  onClick: () => void;
}

export interface InfoProp {
  img: string;
  NameEvent: string;
  Host: string;
  EventType: string;
  DressCode: string;
  Date: string;
  StartTime: string;
  Location: string;
  Description: string;
}

export interface FunctionProp{
  NextShooping?: () => void;
  NextFound: () => void;
  NextInvite: () => void;
  InviteButtonText?: string; 
  InviteButtonIcon?: JSX.Element;
  eventID?: string;
}

export interface User {
  id: string;
  username: string;
  img: string;
}

export interface ModalInviteProps {
  users: User[];
  searchValue: string;
  setSearchValue: (value: string) => void;
  closeModal: () => void;
  selectedUsers: User[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<User[]>>;
  handleInviteUser: () => Promise<void>;
}


export interface ModalInviteViewProps {
  closeModal: () => void;
  handleInviteUser: () => Promise<void>;
  searchValue: string;
  setSearchValue: (value: string) => void;
  filteredUsers: User[];
  selectedUsers: User[];
  handleUserSelect: (user: User) => void;
  handleRemoveUser: (userId: string) => void;
  currentUserId: string | undefined; 
}
export interface GuestModalProps {
  eventId: string; 
  closeModal: () => void; 
  invitations: Invitation[]; 
}

export interface EventInfo {
  name: string;
  image: string;
  host: string;
  eventType: string;
  dressCode: string;
  date: string;
  startTime: string;
  location: string;
  description: string;
}
