import { useState } from 'react';
import { LeafletMouseEvent } from 'leaflet';

const useEditEventForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Estado de cada campo del formulario
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [location, setLocation] = useState('');
    const [eventType, setEventType] = useState('');
    const [dressCode, setDressCode] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState<number | null>(null);
      const [lat, setLat] = useState<number>(3.405); // Valor predeterminado
  const [lng, setLng] = useState<number>(-76.49); // Valor predeterminado
  const [mapClicked, setMapClicked] = useState<boolean>(false);

    // Funciones para abrir y cerrar el modal
    const handleOpenModal = () => setIsModalOpen(true);
    const handleClose = () => {
        setIsModalOpen(false);
    };


    // Manejar el envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí iría la lógica para actualizar el evento en Firebase
        console.log('Evento actualizado:', {
            name, date, startTime, location, eventType, dressCode, description, amount, coordinates: { lat, lng }
        });
        handleClose();
    };

    const onMapClick = (event: LeafletMouseEvent) => {
        const { lat, lng } = event.latlng;
        setLat(lat);
        setLng(lng);
        setMapClicked(true);
    };

    return {
        name, setName, date, setDate, startTime, setStartTime, location, setLocation,
        eventType, setEventType, dressCode, setDressCode, description, setDescription,
        handleSubmit, lat, setLat, lng, setLng, amount, setAmount,
        isModalOpen, handleOpenModal, handleClose,mapClicked,onMapClick
    };
};

export default useEditEventForm;
