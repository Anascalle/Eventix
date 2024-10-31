import { useState, useEffect } from "react";
import { getItems } from "../utils/firebaseConfig";

interface Item {
    image: string;
    name: string;
    price: number;
    disponibility: number;
    eventType: string;
}

const useShoppingItems = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [filterType, setFilterType] = useState<string>("");

useEffect(() => {
    const fetchItems = async () => {
    const itemsList = await getItems();
    setItems(itemsList);
    };

    fetchItems();
}, []);

const filteredItems = filterType
    ? items.filter((item) => item.eventType === filterType)
    : items;

    return { filteredItems, filterType, setFilterType };
};

export default useShoppingItems;