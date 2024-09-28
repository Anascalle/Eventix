import React from "react";
import Section from "../Section/Section.View";
import BenefitsSection from "../BenefitSection/BenefitSection.View";
import FinalSection from "../FinalSection/FinalSection.View";

const SectionGroup: React.FC =() =>{
    return(
        <div>
        <Section
        texts={["Send", "and", "receive", "invitations"]} 
        fontWeights={["semi-bold", "normal", "semi-bold", "bold"]} 
        imageUrl="/src/Img/Img1.png"
        colors={["#00B78C", "#0E0D35",  "#FFAA00", "#0E0D35"]}
       
      />
     <BenefitsSection></BenefitsSection>
      <Section
        texts={["Choose", "the", "best", "day", "and", "location"]} 
        fontWeights={["semi-bold", "normal", "semi-bold", "semi-bold", "normal", "semi-bold"]} 
        imageUrl="/src/Img/img2.png"
        colors={["#FFFF", "#FFFF",  "#0E0D35", "#0E0D35","#FFFF"]}
        customClass="second_section"
      />
       <Section
        texts={["All", "what", "you", "need", "in", "the", "same", "place"]} 
        fontWeights={["semi-bold", "normal", "semi-bold", "semi-bold", "normal", "normal", "semi-bold", "semi-bold"]} 
        imageUrl="/src/Img/img3.png"
        colors={["#F24B4B", "#0E0D35", "#FFAA00", "#0E0D35", "#0E0D35", "#0E0D35", "#00B78C", "#00B78C"]} 
        customClass="third_section"
        />
        
        <FinalSection></FinalSection>
        </div>
        

    )
}
export default SectionGroup