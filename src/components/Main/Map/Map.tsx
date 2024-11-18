import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { MapUpdaterProps } from '../../../Types/types';

const MapUpdater: React.FC<MapUpdaterProps> = ({ lat, lng }) => {
    const map = useMap();
   
    useEffect(() => {
        map.setView([lat, lng]); 
    }, [lat, lng, map]);

    return null; 
};

export default MapUpdater;
