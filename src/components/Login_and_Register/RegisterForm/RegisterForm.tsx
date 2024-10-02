import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../utils/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import Inputs from '../Input/Input';
import RegisterMessage from "../RegisterMessage/RegisterMessage";
import RegisterButton from "../RegisterButton/RegisterButton";
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accountAmount, setAccountAmount] = useState('');
    const navigate = useNavigate(); // Para redirigir después del registro

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Crear el usuario con correo y contraseña
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const accountAmountNumber = parseInt(accountAmount);

            // Guardar datos adicionales en Firestore
            await setDoc(doc(db, 'users', user.uid), {
                username: username,
                accountAmount: accountAmountNumber, // Convertir a número si es necesario
                email: user.email,
            });

            console.log('Usuario registrado:', user);

            // Redirigir al main después del registro
            navigate(`/main/${user.uid}`);

        } catch (error) {
            console.error('Error al registrar:', error);
        }
    };

    return (
        <form id="registerForm" onSubmit={handleRegister}>
            <RegisterMessage 
                title="Sign Up" 
                infoMessagept1="If you already have an account registered" 
                infoMessagept2="You can"
            />
            <Inputs 
                inputType="email" 
                uid="registerEmail" 
                lillogo="" 
                info="Email" 
                infoPlaceholder="Enter your email address" 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <Inputs 
                inputType="text" 
                uid="registerUsername" 
                lillogo="" 
                info="Username" 
                infoPlaceholder="Enter your username" 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <Inputs 
                inputType="password" 
                uid="registerPassword" 
                lillogo="" 
                info="Password" 
                infoPlaceholder="Enter your password" 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <Inputs 
                inputType="number" 
                uid="registerAccount" 
                lillogo="" 
                info="Account Amount" 
                infoPlaceholder="Add account amount" 
                onChange={(e) => setAccountAmount(e.target.value)} 
            />
            <RegisterButton btnId="RegisterBtn" buttonText="Register" />
        </form>
    );
};

export default RegisterForm;
