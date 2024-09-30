
import React, { useState, useEffect } from "react";
import Section from "../Section/Section.View";
import BenefitsSection from "../BenefitSection/BenefitSection.View";
import FinalSection from "../FinalSection/FinalSection.View";

const SectionGroup: React.FC =() =>{
  const [imageUrls, setImageUrls] = useState({
    section1: "/src/Img/Img1.png",
    section3: "/src/Img/img3.png",
  });

  const updateImageUrls = () => {
    const isMobile = window.innerWidth <= 375;
    if (isMobile) {
      setImageUrls({
        section1: "/src/Img/img1-mobile.png",
        section3: "/src/Img/img3-mobile.png",
      });
    } else {
      setImageUrls({
        section1: "/src/Img/Img1.png",
        section3: "/src/Img/img3.png",
      });
    }
  };

   useEffect(() => {
    updateImageUrls();
    window.addEventListener("resize", updateImageUrls);

    
    return () => {
      window.removeEventListener("resize", updateImageUrls);
    };
  }, []);


    return(
        <div>
        <Section
        texts={["Send", "and", "receive", "invitations"]} 
        fontWeights={["semi-bold", "normal", "semi-bold", "bold"]} 
        imageUrl={imageUrls.section1}
        colors={["#00B78C", "#0E0D35",  "#FFAA00", "#0E0D35"]}
         customClass="first_sections"
       
      />
     <BenefitsSection/>
      <Section
        texts={["Choose", "the", "best", "day", "and", "location"]} 
        fontWeights={["semi-bold", "normal", "semi-bold", "semi-bold", "normal", "semi-bold"]} 
          imageUrl="/src/Img/img2.png"
        colors={["#FFFF", "#FFFF",  "#0E0D35", "#0E0D35","#FFFF"]}
        customClass="second_sections"
      />
       <Section
        texts={["All", "what", "you", "need", "in", "the", "same", "place"]} 
        fontWeights={["semi-bold", "normal", "semi-bold", "semi-bold", "normal", "normal", "semi-bold", "semi-bold"]} 
        imageUrl={imageUrls.section3}
        colors={["#F24B4B", "#0E0D35", "#FFAA00", "#0E0D35", "#0E0D35", "#0E0D35", "#00B78C", "#00B78C"]} 
        customClass="third_sections"
        />
        
        <FinalSection/>
        </div>
        

    );
};

export default SectionGroup