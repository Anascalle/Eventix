import "../RegisterMessage/RegisterMessage.css"

interface MessageProps {
    title: string;
    infoMessagept1: string;
    infoMessagept2: string;
    infoLink: string;
}

function RegisterMessage( { title, infoMessagept1, infoMessagept2, infoLink }:MessageProps ){
    return <div id="MessageSpace">
        <h1>{title}</h1>
        <div>
        <p>{infoMessagept1}</p>
            <div>
                <p>{infoMessagept2}</p>
                <a href="">{infoLink}</a>
            </div>
        </div>
    </div>
}

export default RegisterMessage