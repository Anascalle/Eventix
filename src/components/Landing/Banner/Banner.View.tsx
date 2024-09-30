import React from "react";
import ButtonLogic from "../NavButtons/NavButtons";
import LoginButton from "./Banner";

const Banner: React.FC = () =>{
    return(
        <div className="banner">
            <h1>Eventix</h1>
            <p>Organize, create, and manage</p>
            <ButtonLogic showPrimary={false} showSecondary={true} />

            <div className="account-message">
            <p>Already have an account? </p>
            <LoginButton />
            </div>
        </div>  
    
    )
}

export default Banner