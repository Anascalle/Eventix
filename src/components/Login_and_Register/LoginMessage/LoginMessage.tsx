import LoginFormButton from "./LoginMesaageButton";
import "./LoginMessage.css"
interface MessageProps {
    title: string;
    infoMessagept1: string;
    infoMessagept2: string;
    
}

function LoginMessage( { title, infoMessagept1, infoMessagept2,  }:MessageProps ){
    return <div>
        <h1>{title}</h1>
        <div id="message_space">
        <p className="login_message">{infoMessagept1}</p>
            <div>
                <p className="login_message">{infoMessagept2}<LoginFormButton/></p>
            </div>
        </div>
    </div>
}

export default LoginMessage

