interface buttonProps{
    buttonText: string;
    btnId: string
}

function RegisterButton( { buttonText, btnId }:buttonProps ){
    return <button type="submit" id={btnId}>{buttonText}</button>
}

export default RegisterButton