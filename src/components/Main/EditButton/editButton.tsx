import React from "react";
import ReactDOM from "react-dom";
import "./editButton.css"
import EeditEventView from "../EditEvent/EditEvent";
import useEditEventForm from "../../../hooks/useEditEventForm";
import { EditButtonProps } from "../../../Types/types";

const EditButton: React.FC<EditButtonProps> = ({  eventId }) => {
    const {
        
        name: eventName,
        setName,
        date: eventDate,
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
        lat,
        lng,
        onMapClick,
        handleClose,
        handleOpenModal,
        isModalOpen,
        amount,
        setAmount,
    } = useEditEventForm(eventId);

    return (
        <div>
        <button id="edit_button" onClick={handleOpenModal}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="5 0 10 20" fill="none">
        <path d="M17.7586 5.73165L14.268 2.24024C14.1519 2.12414 14.0141 2.03204 13.8624 1.9692C13.7107 1.90637 13.5482 1.87402 13.384 1.87402C13.2198 1.87402 13.0572 1.90637 12.9056 1.9692C12.7539 2.03204 12.6161 2.12414 12.5 2.24024L2.86641 11.8746C2.74983 11.9903 2.65741 12.1279 2.59451 12.2796C2.5316 12.4313 2.49948 12.594 2.50001 12.7582V16.2496C2.50001 16.5811 2.6317 16.8991 2.86612 17.1335C3.10054 17.3679 3.41849 17.4996 3.75001 17.4996H7.24141C7.40563 17.5001 7.5683 17.468 7.71999 17.4051C7.87168 17.3422 8.00935 17.2498 8.12501 17.1332L17.7586 7.49962C17.8747 7.38354 17.9668 7.24573 18.0296 7.09405C18.0925 6.94238 18.1248 6.77981 18.1248 6.61563C18.1248 6.45145 18.0925 6.28889 18.0296 6.13721C17.9668 5.98554 17.8747 5.84772 17.7586 5.73165ZM4.0086 12.4996L10.625 5.88321L11.9289 7.18712L5.31251 13.8027L4.0086 12.4996ZM3.75001 14.0082L5.99141 16.2496H3.75001V14.0082ZM7.50001 15.991L6.1961 14.6871L12.8125 8.07071L14.1164 9.37462L7.50001 15.991ZM15 8.49102L11.5086 4.99962L13.3836 3.12462L16.875 6.61524L15 8.49102Z" fill="white"/>
        </svg></button>
        {isModalOpen && ReactDOM.createPortal(
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10000,
            }}>
                <EeditEventView
                    eventId={eventId} 
                    name={eventName}
                    setName={setName}
                    date={eventDate}
                    setDate={setDate}
                    startTime={startTime}
                    setStartTime={setStartTime}
                    location={location}
                    setLocation={setLocation}
                    eventType={eventType}
                    setEventType={setEventType}
                    dressCode={dressCode}
                    setDressCode={setDressCode}
                    description={description}
                    setDescription={setDescription}
                    lat={lat}
                    lng={lng}
                    onMapClick={onMapClick}
                    onClose={handleClose}
                    amount={amount || 0}
                    setAmount={setAmount}
                />
            </div>,
            document.getElementById("modal-root")!
        )}
    </div>
    );
};

export default EditButton;
