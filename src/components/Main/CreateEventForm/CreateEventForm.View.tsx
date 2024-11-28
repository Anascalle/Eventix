import React, { useState, useEffect } from 'react';
import "./CreateEventsForm.css";
import EventMap from '../Map/Map.View';
import axios from 'axios';
import { CreateEventFormViewProps } from '../../../Types/types';

const CreateEventFormView: React.FC<CreateEventFormViewProps> = ({
    name, setName, date, setDate, startTime, setStartTime, location, setLocation,
    eventType, setEventType, dressCode, setDressCode, description, setDescription,
    handleSubmit, lat, lng, onClose, amount, setAmount,
}) => {
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({ lat, lng });
    const [loading, setLoading] = useState<boolean>(false);

    const handleLocationChange = async (value: string) => {
        setLocation(value);
        setLoading(true);
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}`);
            const data = response.data;
    
            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                setCoordinates({ lat: parseFloat(lat), lng: parseFloat(lon) });
            } else {
                console.error('No results found for this location.');
            }
        } catch (error) {
            console.error('Error fetching location:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setCoordinates({ lat, lng });
    }, [lat, lng]);

    const isFormValid = () => {
        return name && date && startTime && eventType && dressCode && description && location && amount !== undefined && amount !== null;
    };

    return (
        <div aria-label="create events form" className="create_event_form">
            <button className="close-button" onClick={onClose}>       
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M1.34961 1.34961L9.18961 9.18961" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <path d="M9.18945 1.34961L1.34945 9.18961" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
            </button>
            <h2 className="title_create_event">Create a new event</h2>
            <form id="form_create" onSubmit={handleSubmit}>

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
                    aria-label="start time " 
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                />

                <label>Event type</label>
                <select id="select_id"aria-label="event type" value={eventType} onChange={(e) => setEventType(e.target.value)} required>
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
                    <p className='example'>Example: Cl. 38 Norte. #6N</p>
                </div>
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
                <label>Description</label>
                <textarea 
                    aria-label="description" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                ></textarea>
    
                </div>
                <button
                    id="create_event"
                    disabled={!isFormValid()}
                    style={{
                        backgroundColor: isFormValid() ? '#00B78C' : '#ccc',
                        cursor: isFormValid() ? 'pointer' : 'not-allowed',
                    }}
                    type="submit">
                    Create event
                </button>
            </form>
        </div>
    );
};

export default CreateEventFormView;
