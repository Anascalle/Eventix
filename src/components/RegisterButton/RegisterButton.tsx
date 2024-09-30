import "../RegisterButton/RegisterButton.css"

interface buttonProps{
    buttonText: string;
}

function RegisterButton( { buttonText }:buttonProps ){
    return <button type="submit" className="theRegisterBtn">{buttonText}</button>
}

export default RegisterButton