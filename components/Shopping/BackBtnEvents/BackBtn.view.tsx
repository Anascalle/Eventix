import "./BackBTnEvents.css"
import { useNavigate } from "react-router-dom";


const BackBtnEvents: React.FC = () => {
    const navigate = useNavigate(); 

    const handleBackClick = () => {
        navigate(-1); 
    };

    return (
        <div className="BackBtnEvents">
            <button className="" onClick={handleBackClick}>
                <img src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/Back.webp?alt=media&token=e360dcdd-63d6-41f7-af72-77f6785e2105" alt="backbuttonEvents" />
            </button>
            <p>your events</p>
        </div>
    );
}

export default BackBtnEvents;