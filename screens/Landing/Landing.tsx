import React from 'react';
import Nav1 from '../../components/Landing/NavBarLanding/NavBarLanding.View';
import Banner from '../../components/Landing/Banner/Banner.View';
import SectionGroup from '../../components/Landing/SectionGroup/SectionGroup.View';
import Footer from '../../components/Landing/Footer/Footer.View';


const LandingScreen: React.FC = () => {
  return (
    <div className="landing-screen">
         <Nav1></Nav1>
         <Banner></Banner>
         <SectionGroup></SectionGroup>
         <Footer></Footer>
        
      
      </div>
   
  );
};

export default LandingScreen;
