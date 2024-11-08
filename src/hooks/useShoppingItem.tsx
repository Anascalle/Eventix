import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { getItems } from "../utils/firebaseConfig";

export interface Item {
    image: string;
    id: number;
    name: string;
    price: number;
    disponibility: number;
    eventType: string;
}

const useShoppingItems = () => {
    const { state } = useLocation();
    const initialEventType = state?.eventType || "";
    const [items, setItems] = useState<Item[]>([]);
    const [filterType, setFilterType] = useState<string>(initialEventType);

    useEffect(() => {
        const fetchItems = async () => {
            const itemsList = await getItems();

            
            itemsList.forEach(item => {
                if (!localStorage.getItem(item.image)) {
                    fetch(item.image)
                        .then(response => response.blob())
                        .then(blob => {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                localStorage.setItem(item.image, reader.result as string);
                            };
                            reader.readAsDataURL(blob);
                        })
                        .catch(err => console.error("Error al guardar la imagen en localStorage", err));
                }
            });

            setItems(itemsList);
        };
        fetchItems();
    }, []);

    const filteredItems = useMemo(() => {
        return filterType === "Other" ? items : items.filter((item) => item.eventType === filterType);
    }, [filterType, items]);

    return { filteredItems, filterType, setFilterType };
};

export default useShoppingItems;
