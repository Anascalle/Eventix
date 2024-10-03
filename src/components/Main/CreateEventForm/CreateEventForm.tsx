import React, { useState, useMemo,  } from 'react';
import CreateEventFormView from './CreateEventForm.View';
import { LeafletMouseEvent } from 'leaflet';
import NewEventButton from '../NewEventButton/NewEventButton';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../utils/firebaseConfig'; 
import { getAuth } from 'firebase/auth';

const CreateEventForm: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [startTime, setStartTime] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [eventType, setEventType] = useState<string>('');
    const [dressCode, setDressCode] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [lat, setLat] = useState<number | undefined>(undefined);
    const [lng, setLng] = useState<number | undefined>(undefined);
    const [mapClicked, setMapClicked] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [eventImage, setEventImage] = useState<string | null>(null);
    const [amount, setAmount] = useState<number | undefined>(undefined);

    const eventImages = useMemo<Record<string, string>>(() => ({
        Halloween: 'https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/162fae60-77df-11ee-bd0d-2d70b013b479.jpg.webp?alt=media&token=657d353c-98b6-4826-94b1-3ef021510c0e',
        Birthday: 'https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/septiembre-cumpleanos-655x368.webp?alt=media&token=9374ce7f-cf85-4cda-8a9b-8d52ca80f0e1',
        "Baby shower": 'https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/e53d5867ba9718bd7626f70f2ff446f3.webp?alt=media&token=283fad8c-d887-421a-8e37-3c9c3044b8f5',
        Wedding: "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/unnamed-min.webp?alt=media&token=b4c33a4f-b720-47a8-b4f5-c5ddc028625e",
        Christmas: 'https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/S7H7HDZF2RJ7RJ3FYMDU5QFSQ4.webp?alt=media&token=9c5c1ce5-7293-4d20-a7fc-216049acbef0',
        Other: 'https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/amigos-tintinean-vasos-bebida-bar-moderno_1150-18971.webp?alt=media&token=d0a0eb11-822c-49e4-8b10-8e18070be90e',
    }), []);

    const initialLat = 3.405;
    const initialLng = -76.49;

    const handleEventTypeChange = (eventType: string) => {
        setEventType(eventType);
        setEventImage(eventImages[eventType] || null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!mapClicked) {
            alert("Please set the location on the map.");
            return;
        }

        if (!name || !date || !startTime || !location || !eventType || !dressCode || !description || amount === undefined) {
            alert("Please complete all the required fields.");
            return;
        }

        if (amount < 1) {
            alert("The amount must be at least 1.");
            return;
        }

        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            alert("User not authenticated.");
            return;
        }

        // Obtener la referencia del documento del usuario
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            alert("User data not found.");
            return;
        }

        const userData = userDoc.data();
        const currentAccountAmount = userData.accountAmount;

        // Verificar si el usuario tiene suficiente saldo
        if (currentAccountAmount < amount) {
            alert("Insufficient funds.");
            return;
        }

        // Restar la cantidad del saldo
        const newAccountAmount = currentAccountAmount - amount;

        // Actualizar el saldo del usuario en Firestore
        await updateDoc(userRef, { accountAmount: newAccountAmount });

        // Crear el nuevo evento
        const eventData = {
            name,
            date,
            startTime,
            location,
            eventType,
            dressCode,
            description,
            userId: user.uid,
            coordinates: { lat, lng },
            image: eventImage,
            amount,
        };
        console.log('Event data:', eventData);

        try {
            const docRef = await addDoc(collection(db, "events"), eventData);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        resetForm();
        setIsModalOpen(false);
    };

    const resetForm = () => {
        setName('');
        setDate('');
        setStartTime('');
        setLocation('');
        setEventType('');
        setDressCode('');
        setDescription('');
        setLat(undefined);
        setLng(undefined);
        setMapClicked(false);
        setEventImage(null);
        setAmount(undefined);
    };

    const onMapClick = (event: LeafletMouseEvent) => {
        const { lat, lng } = event.latlng;
        setLat(lat);
        setLng(lng);
        setMapClicked(true);
    };

    const handleClose = () => {
        console.log('Form closed');
        resetForm();
        setIsModalOpen(false);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <NewEventButton onClick={handleOpenModal} />
            {isModalOpen && (
                <CreateEventFormView
                    name={name}
                    setName={setName}
                    date={date}
                    setDate={setDate}
                    startTime={startTime}
                    setStartTime={setStartTime}
                    location={location}
                    setLocation={setLocation}
                    eventType={eventType}
                    setEventType={handleEventTypeChange}
                    dressCode={dressCode}
                    setDressCode={setDressCode}
                    description={description}
                    setDescription={setDescription}
                    handleSubmit={handleSubmit}
                    lat={lat || initialLat}
                    lng={lng || initialLng}
                    onMapClick={onMapClick}
                    onClose={handleClose}
                    eventImage={eventImage}
                    amount={amount || 0}
                    setAmount={setAmount}
                />
            )}
        </>
    );
};

export default CreateEventForm;
