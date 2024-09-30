import React from 'react';
import { useLocation } from 'react-router-dom'; 
import MapInformation from '../../components/DetailEvent/MapInformation';
import Nav2 from '../../components/Main/Nav/Nav';
import "./Detail.css"

const DetailScreen: React.FC = () => {
  const location = useLocation();
  const { id } = location.state || {}; 

  console.log('Received ID:', id);

  return (
    <div className="Detail-screen">
      <Nav2 />
      {id ? (
        <MapInformation eventId={id} /> 
      ) : (
        <p>No event selected</p>
      )}
    </div>
  );
};

export default DetailScreen;
