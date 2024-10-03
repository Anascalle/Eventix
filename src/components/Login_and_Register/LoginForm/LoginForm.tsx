import React, { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from "../../../utils/firebaseConfig";
import Inputs from "../Input/Input";
import RegisterButton from "../RegisterButton/RegisterButton";
import LoginMessage from "../LoginMessage/LoginMessage";
import "./LoginForm.css"

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Usuario autenticado:', userCredential.user);

            const userId = userCredential.user.uid;

            navigate(`/main/${userId}`);
        } catch (error: any) {
            console.error('Error al iniciar sesión:', error);
            if (error.code === 'auth/wrong-password') {
                setError('Incorrect Password.');
            } else if (error.code === 'auth/user-not-found') {
                setError('There is no account associated with that email.');
            } else {
                setError('An error occurred while signing in.');
            }
        }
    };

    return (
        <div id='LogSpace'>
            <img id="LogImg" src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/energetic-dance-floor-with-people-celebrating-birthday.webp?alt=media&token=b09e959b-bfa8-4cfd-b713-21ab511da847" alt="" />
            <div className="registerSpace">
                <form onSubmit={handleLogin} id="loginForm">
                    <LoginMessage
                        title="Log In"
                        infoMessagept1="If you haven't registered yet"
                        infoMessagept2="You can"
                    />
                    <Inputs
                        inputType="email"
                        uid="loginEmail"
                        lillogo="/mail.svg"
                        info="Email"
                        infoPlaceholder="Enter your email address"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Inputs
                        inputType="password"
                        uid="loginPassword"
                        lillogo="/lock.svg"
                        info="Password"
                        infoPlaceholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <div className="errorMessage">{error}</div>}
                    <RegisterButton btnId="" buttonText="Login" />
                </form>
            </div>
        </div>
    );
}

export default LoginForm;