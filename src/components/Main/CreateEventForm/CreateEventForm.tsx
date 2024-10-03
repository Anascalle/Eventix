import React, { useState } from 'react';
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

    const eventImages: Record<string, string> = {
        Halloween: 'https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/halloween-family-ready-trick-treat.webp?alt=media&token=cb7357c0-a649-46c1-88b6-6df8cddc089c',
        Birthday: 'https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/medium-shot-people-celebrating-birthday.webp?alt=media&token=31e689f1-8044-4739-b278-20209c668162',
        "Baby shower": 'https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/photo-happy-mother-holds-newborn-baby-looks-husband-who-helps-with-child-nursing-holds-mobile-feeding-bottle-young-parents-take-care-small-infant-family-parenthood-concept.webp?alt=media&token=ced5dcbf-788a-4e4a-8053-e375a43c82e0',
        Christmas: 'https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/funny-couple-love-with-photo-booth-gadgets.webp?alt=media&token=78552641-6d9a-4e5a-9bec-02fce51d2cff',
        Other: 'https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/medium-shot-friends-posing-photo-booth%20(1).webp?alt=media&token=e89d5ebb-9458-457a-85b7-c0d036084b2e',
    };

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
