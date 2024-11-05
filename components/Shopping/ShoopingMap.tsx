import "./shoppingMap.css"
import React from 'react';
import Consumption from "./Consumption/Consumption.view";
import useShoppingItems from "../../hooks/useShoppingItems";
import { useConsumption } from "../../hooks/useConsumption";
import Filters from "./Filters/Filter.view";
import ShoppingCard from "./ShoopingCard/ShoppingCard.view";
import Nav3 from '../DetailEvent/Nav/Nav.view';
import BackBtnEvents from './BackBtnEvents/BackBtn.view';


const ShoopingMap: React.FC = () => {
    const { filteredItems, filterType, setFilterType } = useShoppingItems();
    const { consumption, addToConsumption, removeFromConsumption, getTotal } = useConsumption();

    return (
        <div>
            <div>
            <Nav3></Nav3>
            <BackBtnEvents></BackBtnEvents>
            </div>
            <div className="receipt-section">
            
            <div>
            <Filters filterType={filterType} onFilterSelect={setFilterType} />
            <div className="grid-card">
                {filteredItems.map((item) => (
                    <ShoppingCard
                        key={item.id}
                        id={item.id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                        disponibility={item.disponibility}
                        addToConsumption={addToConsumption}
                    />
                ))}
            </div>
            </div>
            <Consumption
                items={consumption}
                total={getTotal()}
                onRemoveItem={removeFromConsumption}
            />
            </div>
        </div>
    );
};

export default ShoopingMap;
