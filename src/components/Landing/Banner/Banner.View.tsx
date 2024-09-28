import React from "react";
import Button from "../NavButtons/NavButtons.View";
import "./Banner.css"

const Banner: React.FC = () =>{
    return(
        <div className="banner">
            <h1>Eventix</h1>
            <p>Organize, create, and manage</p>
            <Button label="SIGN UP" variant="primary" />
        </div>  
    
    )
}

export default Banner