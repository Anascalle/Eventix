import RegisterFormButton from "./RegisterMessageButton";
import "./RegisterMessage.css"

interface MessageProps {
    title: string;
    infoMessagept1: string;
    infoMessagept2: string;

}

function RegisterMessage( { title, infoMessagept1, infoMessagept2,  }:MessageProps ){
    return <div id="MessageSpace">
        <h1>{title}</h1>
        <div>
        <p>{infoMessagept1}</p>
            <div id="infoWithLink">
                <p>{infoMessagept2}</p>
                <RegisterFormButton/>
            </div>
        </div>
    </div>
}

export default RegisterMessage

