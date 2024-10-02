import React from 'react';
import "./CreateEventsForm.css";
import EventMap from '../Map/Map.View';

interface CreateEventFormViewProps {
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
    eventImage: string | null; 
}

const CreateEventFormView: React.FC<CreateEventFormViewProps> = ({
    name, setName, date, setDate, startTime, setStartTime, location, setLocation,
    eventType, setEventType, dressCode, setDressCode, description, setDescription,
    handleSubmit, lat, lng, onMapClick, onClose, amount, setAmount, 
}) => {
    return (
        <div className="create_event_form">
            <button className="close-button" onClick={onClose}>x</button>
            <h2>Create a new event</h2>
            <form onSubmit={handleSubmit}>
                <label>Event name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Event name"
                    required
                />
                <label>Date</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <label>Start time</label>
                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                />
                <label>Address</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Address"
                    required
                />
                <EventMap lat={lat} lng={lng} location={location} onMapClick={onMapClick} />

                <label>Event type</label>
                <select value={eventType} onChange={(e) => setEventType(e.target.value)} required>
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
                    type="text"
                    value={dressCode}
                    onChange={(e) => setDressCode(e.target.value)}
                    placeholder="Dress code"
                    required
                />
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                ></textarea>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) =>  setAmount(Number(e.target.value))}
                    placeholder="Event amount"
                    required
                />

            

                <button type="submit">Create event</button>
            </form>
         
        </div>
    );
};

export default CreateEventFormView;
