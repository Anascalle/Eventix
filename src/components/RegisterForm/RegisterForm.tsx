import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../service/firebaseConfig';
import { db } from '../../service/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import Inputs from "../Input/Inputs";
import RegisterMessage from "../RegisterMessage/RegisterMessage";
import RegisterButton from "../RegisterButton/RegisterButton";
import "../RegisterForm/RegisterForm.css"

function RegisterForm(){

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accountAmount, setAccountAmount] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const accountAmountNumber = parseInt(accountAmount);

        await setDoc(doc(db, 'users', user.uid), {
            username: username,
            accountAmount: accountAmountNumber,
            email: user.email
        });
        console.log('Usuario registrado:', userCredential.user, 'Usuario registrado con datos adicionales:', user);
    } catch (error) {
        console.error('Error al registrar:', error);
    }

    console.log(email, username, password, accountAmount)
    };

    return <div className='registerSpace'>
    <form id='registerForm' onSubmit={handleRegister}>
    <RegisterMessage title="Sign Up" infoMessagept1="If you already have an account registered" infoMessagept2="You can" infoLink="Login here !"></RegisterMessage>
    <Inputs inputType="email" uid="registerEmail" lillogo="/mail.svg" info="Email" infoPlaceholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} />
    <Inputs inputType="string" uid="registerUsername" lillogo="/user.svg" info="Username" infoPlaceholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
    <Inputs inputType="password" uid="registerPassword" lillogo="/lock.svg" info="Password" infoPlaceholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
    <Inputs inputType="number" uid="registerAccount" lillogo="/money.svg" info="Account Amount" infoPlaceholder="Add account amount" onChange={(e) => setAccountAmount(e.target.value)} />
    <RegisterButton buttonText="Register"></RegisterButton>
    </form>
    </div>
}

export default RegisterForm