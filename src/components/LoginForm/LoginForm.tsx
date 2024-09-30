import React, { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../service/firebaseConfig";
import Inputs from "../Input/Inputs";
import RegisterMessage from "../RegisterMessage/RegisterMessage";
import RegisterButton from "../RegisterButton/RegisterButton";

function LoginForm(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Usuario autenticado:', userCredential.user);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
        };

    return <form onSubmit={handleLogin} id="loginForm">
    <RegisterMessage title="Log In" infoMessagept1="If you haven't registered yet" infoMessagept2="You can" infoLink="Register here !"></RegisterMessage>
    <Inputs inputType="email" uid="loginEmail" lillogo="" info="Email" infoPlaceholder="Enter your email address" onChange={(e) => setEmail(e.target.value)}></Inputs>
    <Inputs inputType="password" uid="loginPassword" lillogo="" info="Password" infoPlaceholder="Enter your password" onChange={(e) => setPassword(e.target.value)}></Inputs>
    <RegisterButton btnId="" buttonText="Login"></RegisterButton>
    </form>
}

export default LoginForm