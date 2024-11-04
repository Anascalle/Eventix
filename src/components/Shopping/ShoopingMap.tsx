import React from 'react';
import Consumption from "./Consumption/Consumption.view";
import useShoppingItems from "../../hooks/useShoppingItems";
import { useConsumption } from "../../hooks/useConsumption";
import Filters from "./Filters/Filter.view";
import ShoppingCard from "./ShoopingCard/ShoppingCard.view";
import Nav3 from '../DetailEvent/Nav/Nav.view';

const ShoopingMap: React.FC = () => {
    const { filteredItems, filterType, setFilterType } = useShoppingItems();
    const { consumption, addToConsumption, removeFromConsumption, getTotal } = useConsumption();

    return (
        <div>
            <Nav3></Nav3>
            <Filters filterType={filterType} onFilterSelect={setFilterType} />
            <div>
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
            <Consumption
                items={consumption}
                total={getTotal()}
                onRemoveItem={removeFromConsumption}
            />
        </div>
    );
};

export default ShoopingMap;
