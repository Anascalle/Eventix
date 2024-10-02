import LoginFormButton from "./LoginMesaageButton";
import "./LoginMessage.css"

interface MessageProps {
    title: string;
    infoMessagept1: string;
    infoMessagept2: string;

}

function LoginMessage( { title, infoMessagept1, infoMessagept2,  }:MessageProps ){
    return <div id="MessageLogSpace">
        <h1>{title}</h1>
        <div>
        <p>{infoMessagept1}</p>
            <div id="infoWithLinkLog">
                <p>{infoMessagept2}</p>
                <LoginFormButton/>
            </div>
        </div>
    </div>
}

export default LoginMessage

