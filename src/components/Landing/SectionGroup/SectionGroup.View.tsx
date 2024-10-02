
import React, { useState, useEffect } from "react";
import Section from "../Section/Section.View";
import BenefitsSection from "../BenefitSection/BenefitSection.View";
import FinalSection from "../FinalSection/FinalSection.View";

const SectionGroup: React.FC =() =>{
  const [imageUrls, setImageUrls] = useState({
    section1: "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/Img1.png?alt=media&token=a00a85d6-cc5e-487a-b90a-107ba8e39d8e",
    section3: "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/img3.png?alt=media&token=9b0a74d5-dbf8-4390-bb75-f16bcd054843",
  });

  const updateImageUrls = () => {
    const isMobile = window.innerWidth <= 375;
    if (isMobile) {
      setImageUrls({
        section1: "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/img1-mobile.png?alt=media&token=dd9fe303-f36a-48a5-9633-c424574a1b92",
        section3: "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/img3-mobile.png?alt=media&token=fa98a493-4b29-4959-a9d8-3432efd3dbb7",
      });
    } else {
      setImageUrls({
        section1: "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/Img1.png?alt=media&token=a00a85d6-cc5e-487a-b90a-107ba8e39d8e",
        section3: "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/img3.png?alt=media&token=9b0a74d5-dbf8-4390-bb75-f16bcd054843",
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
          imageUrl="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/img2.png?alt=media&token=52b3da74-98e2-4424-955a-9ae25f95b478"
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