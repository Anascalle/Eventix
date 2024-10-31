import React, { useEffect, useState } from "react";
import Consumption from "./Consumption/Consumption.view";
import Nav3 from "../DetailEvent/Nav/Nav.view";
import Filters from "./Filters/Filter.view";
import ShoppingCard from "./ShoopingCard/ShoppingCard.view";
import { getItems } from "../../utils/firebaseConfig"; 

interface Item {
    image: string;
    name: string;
    price: number;
    disponibility: number;
}

const ShoopingMap: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
    const fetchItems = async () => {
        const itemsList = await getItems();
        setItems(itemsList);
    };

    fetchItems();
    }, []);

    return (
    <div>
        <Nav3 />
        <Filters filterType="category" />
        <div>
        {items.map((item, index) => (
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
