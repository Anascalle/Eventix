import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    lillogo: string;
    info: string;
    infoPlaceholder: string;
    uid: string;
}

const Inputs: React.FC<InputProps> = ({ uid, lillogo, info, infoPlaceholder, ...props }) => {

    return <div>
        <p>{info}</p>
        <input id={uid} type="text" placeholder={infoPlaceholder} {...props}/>
    </div>
}

export default Inputs