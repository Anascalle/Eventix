import RegisterFormButton from "./RegisterMessageButton";

interface MessageProps {
    title: string;
    infoMessagept1: string;
    infoMessagept2: string;
    
}

function RegisterMessage( { title, infoMessagept1, infoMessagept2,  }:MessageProps ){
    return <div>
        <h1>{title}</h1>
        <div>
        <p>{infoMessagept1}</p>
            <div>
                <p>{infoMessagept2}</p>
                <RegisterFormButton/>
            </div>
        </div>
    </div>
}

export default RegisterMessage

