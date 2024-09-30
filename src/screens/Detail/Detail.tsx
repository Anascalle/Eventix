import MapInformation from "../../components/DetailEvent/MapInformation";
import Nav2 from "../../components/Main/Nav/Nav";
import "./Detail.css"


const DetailScreen: React.FC = () => {
    return (
      <div className="landing-screen">
          <Nav2></Nav2>
          <MapInformation></MapInformation>
        </div>
     
    );
  };
  
  export default DetailScreen;