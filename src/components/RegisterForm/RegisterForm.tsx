import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../service/firebaseConfig';
import Inputs from "../Input/Inputs";
import RegisterMessage from "../RegisterMessage/RegisterMessage";
import RegisterButton from "../RegisterButton/RegisterButton";

function RegisterForm(){

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accountAmount, setAccountAmount] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Usuario registrado:', userCredential.user);
    } catch (error) {
        console.error('Error al registrar:', error);
    }

    console.log(email, username, password, accountAmount)
    };

    return <form id="registerForm" onSubmit={handleRegister}>
    <RegisterMessage title="Sign Up" infoMessagept1="If you already have an account registered" infoMessagept2="You can" infoLink="Login here !"></RegisterMessage>
    <Inputs uid="registerEmail" lillogo="" info="Email" infoPlaceholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} />
    <Inputs uid="registerUsername" lillogo="" info="Username" infoPlaceholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
    <Inputs uid="registerPassword" lillogo="" info="Password" infoPlaceholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
    <Inputs uid="registerAccount" lillogo="" info="Account Amount" infoPlaceholder="Add account amount" onChange={(e) => setAccountAmount(e.target.value)} />
    <RegisterButton btnId="RegisterBtn" buttonText="Register"></RegisterButton>
    </form>
}

export default RegisterForm