import { useState } from 'react';
import { LeafletMouseEvent } from 'leaflet';
import useUpdateEvent from './UpdateEvent';
 
const useEditEventForm = (eventId: string) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [location, setLocation] = useState('');
  const [eventType, setEventType] = useState('');
  const [dressCode, setDressCode] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | null>(null);
  const [lat, setLat] = useState<number>(3.405);
  const [lng, setLng] = useState<number>(-76.49);
  const [mapClicked, setMapClicked] = useState<boolean>(false);

  const { updateEvent, loading, error } = useUpdateEvent(); // Llama al hook aquí

  const handleOpenModal = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedData = {
    eventId,
      name,
      date,
      startTime,
      location,
      eventType,
      dressCode,
      description,
      amount,
      coordinates: { lat, lng },
    };

    await updateEvent(eventId, updatedData); // Llama a updateEvent aquí
    handleClose();
  };

  const onMapClick = (event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;
    setLat(lat);
    setLng(lng);
    setMapClicked(true);
  };

  return {
    eventId,
    name,
    setName,
    date,
    setDate,
    startTime,
    setStartTime,
    location,
    setLocation,
    eventType,
    setEventType,
    dressCode,
    setDressCode,
    description,
    setDescription,
    handleSubmit,
    loading,
    error,
    lat,
    setLat,
    lng,
    setLng,
    amount,
    setAmount,
    isModalOpen,
    handleOpenModal,
    handleClose,
    mapClicked,
    onMapClick,
  };
};

export default useEditEventForm;
