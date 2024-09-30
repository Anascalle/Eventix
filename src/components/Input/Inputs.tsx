interface InputProps {
    lillogo: string;
    info: string;
    infoPlaceholder: string;
    uid: string;
}

function Inputs( { uid, info, infoPlaceholder }: InputProps) {

    return <div>
        <p>{info}</p>
        <input id={uid} type="text" placeholder={infoPlaceholder} />
    </div>
}

export default Inputs