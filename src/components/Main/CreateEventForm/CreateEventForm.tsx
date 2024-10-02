import React, { useState } from 'react';
import CreateEventFormView from './CreateEventForm.View';
import { LeafletMouseEvent } from 'leaflet';
import NewEventButton from '../NewEventButton/NewEventButton';
import { collection, addDoc } from 'firebase/firestore';
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
        Halloween: 'https://www.65ymas.com/uploads/s1/46/02/74/bigstock-surprised-group-little-zombie-320069116_6_928x621.jpeg',
        Wedding: 'https://png.pngtree.com/thumb_back/fw800/background/20220506/pngtree-wedding-portrait-shore-wedding-horizontal-photo-image_32394.jpg',
        Birthday: 'https://img.freepik.com/foto-gratis/colegas-tiro-medio-tomando-selfie-telefono_23-2149295507.jpg',
        "Baby shower": 'https://images.ctfassets.net/6m9bd13t776q/2cjADyvLsvSFdaT4HlM55g/068e18429a7557ec51556624e21bbb4a/creative-baby-gender-reveal-ideas-HERO.png?fm=webp&q=80',
        Christmas: 'https://cdn11.bigcommerce.com/s-zqoar2tzjl/product_images/uploaded_images/11.12.21-dw-72.jpg',
        Other: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROTmSj15lXihU2sLTE-rg8b2BVepk6G-HsiQ&s',
    };

    // Coordenadas iniciales del mapa
    const initialLat = 3.405;
    const initialLng = -76.49;

    const handleEventTypeChange = (eventType: string) => {
        setEventType(eventType);
        setEventImage(eventImages[eventType] || null); // Asigna la imagen correspondiente
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!mapClicked) {
            alert("Por favor, establece la ubicación en el mapa.");
            return;
        }

        if (!name || !date || !startTime || !location || !eventType || !dressCode || !description || !amount) {
            alert("Por favor, completa todos los campos requeridos.");
            return;
        }

        if (amount < 1) {
            alert("La cantidad debe ser mayor o igual a 1.");
            return;
        }
        const auth = getAuth();
        const user = auth.currentUser;
    
        if (!user) {
            alert("Usuario no autenticado.");
            return;
        }
    

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
            console.log("Documento escrito con ID: ", docRef.id);
        
        } catch (e) {
            console.error("Error añadiendo documento: ", e);
            
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
        console.log('Formulario cerrado');
        resetForm(); 
        setIsModalOpen(false); 
    };
    const handleOpenModal = () => {
        setIsModalOpen(true);  
    };

    return (
        <div>
            <NewEventButton onClick={handleOpenModal} />
            {isModalOpen && <div className="modal-overlay" onClick={handleClose}></div>}
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
                    setEventType={(type) => handleEventTypeChange(type)} // Usar la función para cambiar el tipo de evento
                    dressCode={dressCode}
                    setDressCode={setDressCode}
                    description={description}
                    setDescription={setDescription}
                    handleSubmit={handleSubmit}
                    lat={lat ?? initialLat} 
                    lng={lng ?? initialLng} 
                    onMapClick={onMapClick}
                    onClose={handleClose}  
                    eventImage={eventImage} 
                    amount={amount || 0} 
                    setAmount={setAmount} 
                />
            )}
        </div>
    );
};

export default CreateEventForm;