import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./Banner.css"

const LoginButton: React.FC = () => {
    const navigate = useNavigate(); 

    const handleLoginClick = () => {
        navigate('/login'); 
    };

    return (
        <button onClick={handleLoginClick} className="login-button">
            LOGIN
        </button>
    );
};

export default LoginButton;
