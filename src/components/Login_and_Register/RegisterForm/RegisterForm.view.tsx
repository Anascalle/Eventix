import React, { useState } from 'react';
import Inputs from '../Input/Input.view';
import RegisterMessage from "../RegisterMessage/RegisterMessage.view";
import RegisterButton from "../RegisterButton/RegisterButton.view";
import useFirebaseAuth from '../../../hooks/useAuth';
import "./RegisterForm.css";

const RegisterForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accountAmount, setAccountAmount] = useState('');
    const { register, error } = useFirebaseAuth();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        register(email, password, username, accountAmount);
    };

    return (
        <div id='SignBackgroundSpace'>
            <div id='SignWhiteSpace'>
            <img id='SignImg' src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/LoginSigup%2FSignUp-Cover.png?alt=media&token=cf95e126-1e80-4443-8958-60ff564090c0" alt="" />
                <form id="registerForm" onSubmit={handleRegister}>
                    <RegisterMessage
                        title="Sign Up"
                        infoMessagept1="If you already have an account registered. You can"
                    />
                    <Inputs
                        inputType="email"
                        uid="registerEmail"
                        lillogo="/mail.svg"
                        info="Email"
                        infoPlaceholder="Enter your email address"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Inputs
                        inputType="text"
                        uid="registerUsername"
                        lillogo="/user.svg"
                        info="Username"
                        infoPlaceholder="Enter your username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Inputs
                        inputType="password"
                        uid="registerPassword"
                        lillogo="/lock.svg"
                        info="Password"
                        infoPlaceholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Inputs
                        inputType="number"
                        uid="registerAccount"
                        lillogo="money.svg"
                        info="Account Amount"
                        infoPlaceholder="Add account amount"
                        onChange={(e) => setAccountAmount(e.target.value)}
                    />
                    {error && <div className="errorMessage">{error}</div>}
                    <RegisterButton btnId="RegisterBtn" buttonText="Register" />
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
