import React from 'react';
import './Footer.css'; 
import ButtonLogic from '../NavButtons/NavButtons';

const Footer: React.FC = () => {
    return (
        <footer className="footer_container">
            
            <h1 className="footer_titles">
                <span className="footer_words" style={{ color: '#F24B4B' }}>Join</span> 
                <span className="footer_words" style={{ color: '#0E0D35' }}>us</span>
                <span className="footer_words" style={{ color: '#FFAA00' }}>now</span> 
                <span className="footer_words" style={{ color: '#00B78C' }}>!</span>
            </h1>
            <ButtonLogic showPrimary={false} showSecondary={true} />
            <div>
            <img src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/img5.png?alt=media&token=54a0b046-b1ea-4dbf-b988-0fdf6b04702f" alt="Footer" className="footer_image" />
            <img src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/img5-mobile.png?alt=media&token=ec4052e6-1be8-4c02-a0e1-928562db8adc" alt="Footer Responsive" className="footer_image_responsive" />
            <div className="footer_green-box"></div>
            </div>
            
        </footer>
    );
};

export default Footer;
