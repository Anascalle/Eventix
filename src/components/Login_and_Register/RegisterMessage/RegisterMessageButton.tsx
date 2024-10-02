import React from "react";
import { useNavigate } from "react-router-dom"; 


const RegisterFormButton: React.FC = () => {
    const navigate = useNavigate(); 

    const handleLoginClick = () => {
        navigate('/login'); 
    };

    return (
        <button onClick={handleLoginClick} className="register-buttons">
            Login here !
        </button>
    );
};

export default RegisterFormButton;