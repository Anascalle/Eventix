import Inputs from "../Input/Inputs";
import RegisterMessage from "../RegisterMessage/RegisterMessage";
import RegisterButton from "../RegisterButton/RegisterButton";

function RegisterForm(){

    return <form action="" id="registerForm">
    <RegisterMessage title="Sign Up" infoMessagept1="If you already have an account registered" infoMessagept2="You can" infoLink="Login here !"></RegisterMessage>
    <Inputs uid="registerEmail" lillogo="" info="Email" infoPlaceholder="Enter your email address"></Inputs>
    <Inputs uid="registerUsername" lillogo="" info="Username" infoPlaceholder="Enter your username"></Inputs>
    <Inputs uid="registerPassword" lillogo="" info="Password" infoPlaceholder="Enter your password"></Inputs>
    <Inputs uid="registerAccount" lillogo="" info="Account Amount" infoPlaceholder="Add account amount"></Inputs>
    <RegisterButton btnId="RegisterBtn" buttonText="Register"></RegisterButton>
    </form>
}

export default RegisterForm