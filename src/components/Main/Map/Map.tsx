import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const MapClickHandler: React.FC<{ onMapClick: (event: any) => void }> = ({ onMapClick }) => {
    const map = useMap();

    useEffect(() => {
        map.on('click', onMapClick);
        return () => {
            map.off('click', onMapClick); 
        };
    }, [map, onMapClick]);

    return null; 
};

export default MapClickHandler;

