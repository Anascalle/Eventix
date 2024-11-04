import React, { useState } from 'react';
import "./EditEvent.css";
import EventMap from '../Map/Map.View';
import useUpdateEvent from '../../../hooks/UpdateEvent';

interface EeditEventViewProps {
    name: string;
    setName: (value: string) => void;
    date: string;
    setDate: (value: string) => void;
    startTime: string;
    setStartTime: (value: string) => void;
    location: string;
    eventType: string;
    setEventType: (value: string) => void;
    dressCode: string;
    setDressCode: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
    onClose: () => void; 
    lat: number;
    lng: number;
    amount: number;
    setAmount: (value: number) => void;
    eventImage: string | null; 
}

const EeditEventView: React.FC<EeditEventViewProps> = ({
  name, setName, date, setDate, startTime, setStartTime, location,
  eventType, setEventType, dressCode, setDressCode, description, setDescription,
  onClose, lat, lng, amount, setAmount
}) => {
  const { updateEvent, loading, error } = useUpdateEvent("yourEventIdHere");
  const [coordinates, setCoordinates] = useState({ lat, lng });

  // Renombramos la función a `submitForm` para evitar el conflicto de nombres
  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedData = {
      name,
      date,
      startTime,
      location,
      eventType,
      dressCode,
      description,
      amount,
      coordinates,
    };

    await updateEvent(updatedData);
    
    if (!error) {
      onClose(); // Cierra el modal o formulario si se actualiza con éxito
    }
  };

  const handleLocationChange = async (value: string) => {
    setCoordinates({ lat, lng }); // Asegura que el estado se actualice con lat y lng actuales
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}`);
      const data = await response.json();
      if (data && data.length > 0) {
        setCoordinates({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  return (
    <div aria-label="edit events form" className="edit_event_form">
      <button className="close-button" onClick={onClose}>x</button>
      <h2>Update a event</h2>
      <form onSubmit={submitForm}>
        <label>Event name</label>
        <input 
          aria-label="event name" 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Event name"
          required
        />
        <label>Date</label>
        <input 
          aria-label="event date" 
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <label>Start time</label>
        <input 
          aria-label="start time" 
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <label>Address</label>
        <p className='example'> Example: Cl. 38 Norte. #6N </p>
        <input 
          aria-label="address" 
          type="text"
          value={location}
          onChange={(e) => handleLocationChange(e.target.value)}
          placeholder="Address"
          required
        />
        {loading && <p>Loading location...</p>}
        <EventMap lat={coordinates.lat} lng={coordinates.lng} location={location} />

        <label>Event type</label>
        <select aria-label="event type" value={eventType} onChange={(e) => setEventType(e.target.value)} required>
          <option value="" disabled>Select an event type</option>
          <option value="Halloween">Halloween</option>
          <option value="Wedding">Wedding</option>
          <option value="Birthday">Birthday</option>
          <option value="Baby shower">Baby shower</option>
          <option value="Christmas">Christmas</option>
          <option value="Other">Other</option>
        </select>
        <label>Dress code</label>
        <input 
          aria-label="dress code" 
          type="text"
          value={dressCode}
          onChange={(e) => setDressCode(e.target.value)}
          placeholder="Dress code"
          required
        />
        <label>Description</label>
        <textarea 
          aria-label="description" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        ></textarea>
        <label>Event amount</label>
        <input 
          aria-label="event amount" 
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Event amount"
        />
        <button type="submit">Update event</button>
      </form>
    </div>
  );
};

export default EeditEventView;
