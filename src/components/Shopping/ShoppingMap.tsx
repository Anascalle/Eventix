import React from 'react';
import { useParams } from 'react-router-dom';
import "./ShoppingMap.css"
import Consumption from "./Consumption/Consumption.view";
import useShoppingItems from '../../hooks/useShoppingItem';
import { useConsumption } from "../../hooks/useConsumption";
import Filters from "./Filters/Filter.view";
import ShoppingCard from './ShoppingCard/ShoppingCard.view';
import BackBtnEvents from './BackBtnEvents/CackBtn.view';
const ShoopingMap: React.FC = () => {
    const { id: eventId } = useParams<{ id: string }>();
    const { filteredItems, filterType, setFilterType } = useShoppingItems();
    const { consumption, addToConsumption, removeFromConsumption, getTotal, processPurchase } = useConsumption();

    return (
        <div>
            <div>
         
            </div>
            <div className="receipt-section">
               
                <div className='cards-secction'>
                <BackBtnEvents></BackBtnEvents>
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
                <div className='consumption-section'>
                <Consumption
                    items={consumption}
                    total={getTotal()}
                    onRemoveItem={removeFromConsumption}
                    onBuyAll={() => processPurchase(eventId?? "")} 
                />
                </div>
            </div>
        </div>
    );
};

export default ShoopingMap;