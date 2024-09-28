
import React from 'react';

interface OpenModalButtonProps {
    onClick: () => void;  
}

const OpenModalButton: React.FC<OpenModalButtonProps> = ({ onClick }) => {
    return (
        <div>
            <h2>Create your next event</h2>
            <button className='open_modal' onClick={onClick}>+</button>

        </div>
       
    );
};

export default OpenModalButton;
