import RegisterFormButton from "./RegisterMessageButton.view";
import "./registerMessageStyle.css"

interface MessageProps {
    title: string;
    infoMessagept1: string;

}

function RegisterMessage( { title, infoMessagept1  }:MessageProps ){
    return <div id="MessageSpace">
        <h1>{title}</h1>
        <div>
        <p id="register_message">{infoMessagept1}<RegisterFormButton/></p>
        </div>
    </div>
}

export default RegisterMessage