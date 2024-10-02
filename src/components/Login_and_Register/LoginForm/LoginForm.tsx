import React, { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { auth } from "../../../utils/firebaseConfig";
import Inputs from "../Input/Input";
import RegisterButton from "../RegisterButton/RegisterButton";
import LoginMessage from "../LoginMessage/LoginMessage";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Definir navigate para usar en la redirección

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Usuario autenticado:', userCredential.user);

            // Obtener el uid del usuario autenticado
            const userId = userCredential.user.uid;

            // Redirigir a /main/{userId} después de la autenticación exitosa
            navigate(`/main/${userId}`);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <form onSubmit={handleLogin} id="loginForm">
            <LoginMessage 
                title="Log In" 
                infoMessagept1="If you haven't registered yet" 
                infoMessagept2="You can" 
            />
            <Inputs 
                inputType="email" 
                uid="loginEmail" 
                lillogo="" 
                info="Email" 
                infoPlaceholder="Enter your email address" 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <Inputs  
                inputType="password" 
                uid="loginPassword" 
                lillogo="" 
                info="Password" 
                infoPlaceholder="Enter your password" 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <RegisterButton btnId="" buttonText="Login" />
        </form>
    );
}

export default LoginForm;
