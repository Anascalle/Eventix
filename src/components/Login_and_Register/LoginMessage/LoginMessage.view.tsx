import LoginFormButton from "./LoginMesaageButton.view";
import "./LoginMessage.css"
interface MessageProps {
    title: string;
    infoMessagept1: string;
}

function LoginMessage( { title, infoMessagept1  }:MessageProps ){
    return <div id="MessageLogSpace">
        <h1>{title}</h1>
        <div id="message_space">
        <p className="login_message">{infoMessagept1}<LoginFormButton/></p>
        </div>
    </div>
}

export default LoginMessage

