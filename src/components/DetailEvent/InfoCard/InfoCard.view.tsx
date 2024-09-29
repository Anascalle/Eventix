import FunctionBtn from "../FunctionBtns/FunctionBtns.view";

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
                <button></button>
            </div>
            <div className="Host">
                <p>{prop.Host}</p>
            </div>
            <div className="InfoSecttion1">
                <p>{prop.EventType}</p>
                <p>{prop.DressCode}</p>
                <p>{prop.Date}</p>
                <p>{prop.StartTime}</p>
                <p>{prop.Location}</p>
            </div>
            <div className="InfoSecttion2">
                <p>{prop.Description}</p>
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
