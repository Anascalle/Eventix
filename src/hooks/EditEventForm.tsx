import { useState } from 'react';

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
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [amount, setAmount] = useState<number | null>(null);

    // Funciones para abrir y cerrar el modal
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    // Manejar el envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí iría la lógica para actualizar el evento en Firebase
        console.log('Evento actualizado:', {
            name, date, startTime, location, eventType, dressCode, description, amount, coordinates: { lat, lng }
        });
        handleCloseModal();
    };

    return {
        name, setName, date, setDate, startTime, setStartTime, location, setLocation,
        eventType, setEventType, dressCode, setDressCode, description, setDescription,
        handleSubmit, lat, setLat, lng, setLng, amount, setAmount,
        isModalOpen, handleOpenModal, handleCloseModal
    };
};

export default useEditEventForm;
