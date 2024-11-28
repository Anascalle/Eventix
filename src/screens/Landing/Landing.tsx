import React from 'react';
import Nav1 from '../../components/Landing/NavBarLanding/NavBarLanding.View';
import CarouselBanner from '../../components/Landing/Carrusel/Carusel';
const LandingScreen: React.FC = () => {
  return (
    <div className="landing-screen">
        <Nav1></Nav1>
        <CarouselBanner></CarouselBanner>
        
      
      </div>
   
  );
};

export default LandingScreen;
