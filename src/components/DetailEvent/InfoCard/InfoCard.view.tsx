import FunctionBtn from "../FunctionBtns/FunctionBtns.view";
import "./InfoCard.css"

interface InfoProp {
    img: string;
    NameEvent: string;
    Host: string;
    EventType: string;
    DressCode: string;
    Date: string;
    StartTime: string;
    Location: string;
    Description: string;
}

const InfoCard: React.FC<InfoProp> = (prop) => {

    const handleNextShooping = () => {
        console.log("Shooping clicked");
    };

    const handleNextFound = () => {
        console.log("Found clicked");
    };

    const handleNextInvite = () => {
        console.log("Invite clicked");
    };

    return (
        <div className="InfoCard">
            <div className="ImgBanner">
                <img src={prop.img} alt="" />
            </div>
            <div className="NameEvent">
                <h1>{prop.NameEvent}</h1>
                <button>
                    <img className="BtnImg" src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/edit.png?alt=media&token=46d5d42f-1190-4b51-9d00-38b09a271ceb" alt="" />
                </button>
            </div>
            <div className="Host">
                <p><strong>Host:</strong> {prop.Host}</p>
            </div>
            <div className="InfoSections">
                <div className="InfoSecttion1">
                    <p><strong>Event Type:</strong> {prop.EventType}</p>
                    <p><strong>Dress Code:</strong> {prop.DressCode}</p>
                    <p><strong>Date:</strong> {prop.Date}</p>
                    <p><strong>Start Time:</strong> {prop.StartTime}</p>
                    <p><strong>Location:</strong> {prop.Location}</p>
                </div>
                <div className="InfoSecttion2">
                    <p><strong>Description:</strong> {prop.Description}</p>
                </div>
            </div>
            <div className="FunctionBtns">
                <FunctionBtn
                    NextShooping={handleNextShooping}
                    NextFound={handleNextFound}
                    NextInvite={handleNextInvite}
                />
            </div>
        </div>
    );
};

export default InfoCard;