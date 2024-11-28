import React, { useEffect } from 'react';
import "./EditEvent.css";
import EventMap from "../Map/Map.View";
import useEditEvent from '../../../hooks/useEditEvent';
import { EeditEventViewProps } from '../../../Types/types';
import toast from 'react-hot-toast';

const EeditEventView: React.FC<EeditEventViewProps> = ({ eventId, lat, lng, onClose }) => {
  const {
    name, setName,
    date, setDate,
    startTime, setStartTime,
    location,
    eventType, setEventType,
    dressCode, setDressCode,
    description, setDescription,
    amount, setAmount,
    coordinates,
    isLocationUpdating,
    handleSubmitForm,
    handleLocationChange,
    error,
    isUpdateSuccessful,
  } = useEditEvent(eventId, { lat, lng });

  useEffect(() => {
    if (isUpdateSuccessful) {
      toast.success("Event updated successfully.");
      onClose();
    }
  }, [isUpdateSuccessful, onClose]);

  return (
    <div aria-label="edit events form" className="edit_event_form">
      <button className="close-button" onClick={onClose}>
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
          <path d="M1.34961 1.34961L9.18961 9.18961" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <path d="M9.18945 1.34961L1.34945 9.18961" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      <h2 id="update_even_tittle">Update an event</h2>
      <form id="update_form" onSubmit={handleSubmitForm}>
        <div className="left-column">
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

          <label>Event type</label>
          <select
            id="select_id"
            aria-label="event type"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            required
          >
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

          <label>Event amount</label>
          <input
            aria-label="event amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Event amount"
          />
        </div>

        <div className="map_div">
          <div className="address-container">
            <label>Address</label>
            <p className="example">Example: Cl. 38 Norte. #6N</p>
          </div>

          <input
            aria-label="address"
            type="text"
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
            placeholder="Address"
            required
          />

          {isLocationUpdating && <p>Loading location...</p>}
          <EventMap lat={coordinates.lat} lng={coordinates.lng} location={location} />

          <label>Description</label>
          <textarea
            aria-label="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          ></textarea>
        </div>

        <button type="submit">Update event</button>
      </form>

      {error && <p>Error updating event: {error}</p>}
    </div>
  );
};

export default EeditEventView;
