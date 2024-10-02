import LoginFormButton from "./LoginMesaageButton";

interface MessageProps {
    title: string;
    infoMessagept1: string;
    infoMessagept2: string;
    
}

function LoginMessage( { title, infoMessagept1, infoMessagept2,  }:MessageProps ){
    return <div>
        <h1>{title}</h1>
        <div>
        <p>{infoMessagept1}</p>
            <div>
                <p>{infoMessagept2}</p>
                <LoginFormButton/>
            </div>
        </div>
    </div>
}

export default LoginMessage

