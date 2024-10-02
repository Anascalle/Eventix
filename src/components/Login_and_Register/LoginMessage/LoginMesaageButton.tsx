import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginMessageButton.css"


const LoginFormButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/signup');
    };

    return (
        <button onClick={handleLoginClick} className="login-buttons">
            Register here !
        </button>
    );
};

export default LoginFormButton;