import React from 'react';
import MapClickHandler from './Map';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Configuración de los íconos del mapa con URLs absolutas
const customIcon = new L.Icon({
    iconUrl: 'https://png.pngtree.com/png-clipart/20230815/original/pngtree-map-red-pointer-icon-marker-vector-isolated-on-white-background-eps-10-picture-image_7977947.png',
    iconRetinaUrl: 'https://png.pngtree.com/png-clipart/20230815/original/pngtree-map-red-pointer-icon-marker-vector-isolated-on-white-background-eps-10-picture-image_7977947.png',
    shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
    iconSize: [40, 41], // Tamaño del ícono
    iconAnchor: [12, 41], // Punto del ícono que se alinea con la ubicación del marcador
    popupAnchor: [1, -34], // Punto donde se ancla el popup en relación con el ícono
});

interface EventMapProps {
    lat: number;
    lng: number;
    location: string;
    onMapClick: (event: any) => void;
}

const EventMap: React.FC<EventMapProps> = ({ lat, lng, location, onMapClick }) => {
    return (
        <MapContainer
            center={[lat, lng]}
            zoom={13}
            style={{ height: '300px', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[lat, lng]} icon={customIcon}>
                <Popup>
                </Popup>
            </Marker>
            <MapClickHandler onMapClick={onMapClick} />
        </MapContainer>
    );
};

export default EventMap;
