import Consumption from "./Consumption/Consumption.view";
import useShoppingItems from "../../hooks/useShoppingItems";
import Filters from "./Filters/Filter.view";
import ShoppingCard from "./ShoopingCard/ShoppingCard.view";
import Nav3 from "../DetailEvent/Nav/Nav.view";


const ShoopingMap: React.FC = () => {
    const { filteredItems, filterType, setFilterType } = useShoppingItems();
  
    return (
      <div>
        <Nav3></Nav3>
        <Filters filterType={filterType} onFilterSelect={setFilterType} />
        <div>
          {filteredItems.map((item, index) => (
            <ShoppingCard
              key={index}
              image={item.image}
              name={item.name}
              price={item.price}
              disponibility={item.disponibility}
            />
          ))}
        </div>
        <Consumption
          imgConsumption=""
          nameConsumption=""
          priceConsumption={0}
          quantityConsumption={0}
          total={0}
        />
      </div>
    );
  };
  
  export default ShoopingMap;