import React, { useState } from "react";
import Inputs from "../Input/Input.view";
import RegisterButton from "../RegisterButton/RegisterButton.view";
import LoginMessage from "../LoginMessage/LoginMessage.view";
import useFirebaseLogin from "../../../hooks/useLogin";
import "./LoginForm.css";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error } = useFirebaseLogin();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div id='LogBackgroundSpace'>
        <div id='LogWhiteSpace'>
            <img id="LogImg" src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/LoginSigup%2FRegister-Cover.png?alt=media&token=c7f8bff3-6426-4021-a9f7-73d84d6e2798" alt="" />
                <form onSubmit={handleLogin} id="loginForm">
                    <LoginMessage
                        title="Log In"
                        infoMessagept1="If you haven't registered yet. You can"
                      
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