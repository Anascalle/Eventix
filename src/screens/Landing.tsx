import React from 'react';
import Nav1 from '../components/NavBarLanding/NavBarLanding.View';
import Banner from '../components/Banner/Banner.View';
import SectionGroup from '../components/SectionGroup/SectionGroup.View';
import Footer from '../components/Footer/Footer.View';


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
