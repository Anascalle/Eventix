import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    lillogo: string;
    info: string;
    infoPlaceholder: string;
    uid: string;
    inputType: string;
}

const Inputs: React.FC<InputProps> = ({ uid, lillogo, info, infoPlaceholder, inputType, ...props }) => {

    return <div>
        <p>{info}</p>
        <input id={uid} type={inputType} placeholder={infoPlaceholder} {...props}/>
    </div>
}

export default Inputs