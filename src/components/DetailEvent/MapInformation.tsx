import BackBtn from "./BackBtn/BackBtn.view";
import InfoCard from "./InfoCard/InfoCard.view";
import "./MapInfo.css"

const MapInformation: React.FC = () => {
    const eventInfo = {
        img: "/src/Img/image.png",
        NameEvent: "Sample Event",
        Host: "John Doe",
        EventType: "Conference",
        DressCode: "Business Casual",
        Date: "2024-10-01",
        StartTime: "10:00 AM",
        Location: "Conference Hall A",
        Description: "This is a detailed description of the event.",
    };

    return (
        <div className="MapInfo">
            <BackBtn NameEvent={eventInfo.NameEvent} />
            <InfoCard
                img= {eventInfo.img}
                NameEvent= {eventInfo.NameEvent}
                Host={eventInfo.Host}
                EventType={eventInfo.EventType}
                DressCode={eventInfo.DressCode}
                Date={eventInfo.Date}
                StartTime={eventInfo.StartTime}
                Location={eventInfo.Location}
                Description={eventInfo.Description}
            />
        </div>
    );
};

export default MapInformation;