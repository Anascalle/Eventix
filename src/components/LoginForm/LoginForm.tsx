import Inputs from "../Input/Inputs";
import RegisterMessage from "../RegisterMessage/RegisterMessage";
import RegisterButton from "../RegisterButton/RegisterButton";

function LoginForm(){
    return <form action="" id="loginForm">
    <RegisterMessage title="Log In" infoMessagept1="If you haven't registered yet" infoMessagept2="You can" infoLink="Register here !"></RegisterMessage>
    <Inputs uid="loginEmail" lillogo="" info="Email" infoPlaceholder="Enter your email address"></Inputs>
    <Inputs uid="loginPassword" lillogo="" info="Password" infoPlaceholder="Enter your password"></Inputs>
    <RegisterButton btnId="" buttonText="Login"></RegisterButton>
    </form>
}

export default LoginForm