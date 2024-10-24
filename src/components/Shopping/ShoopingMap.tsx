import Consumption from "./Consumption/Consumption.view";
import Nav3 from "../DetailEvent/Nav/Nav.view";
import Filters from "./Filters/Filter.view";
import ShoppingCard from "./ShoopingCard/ShoppingCard.view";

const ShoopingMap: React.FC <> = () => {
    return(
        <div>
            <Nav3></Nav3>
            <Filters></Filters>
            <ShoppingCard></ShoppingCard>
            <Consumption></Consumption>
        </div>
    )
}
export default ShoopingMap;