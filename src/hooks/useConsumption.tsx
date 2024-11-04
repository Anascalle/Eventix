import { useState } from 'react';

export const useConsumption = () => {
    const [consumption, setConsumption] = useState<{ id: number, name: string, price: number, quantity: number, image: string, disponibility: number }[]>([]);

    const addToConsumption = (item: { id: number, name: string, price: number, image: string, disponibility: number }, quantity: number) => {
        setConsumption(prev => {
            const existingItem = prev.find(i => i.id === item.id);

            if (existingItem) {
            
                return prev.map(i =>
                    i.id === item.id
                        ? { ...i, quantity: Math.min(i.quantity + quantity, i.disponibility) }
                        : i
                );
            } else {
            
                return [...prev, { ...item, quantity }];
            }
        });
    };

    const removeFromConsumption = (id: number) => {
        setConsumption(prev => prev.filter(item => item.id !== id));
    };

    const getTotal = () => {
        return consumption.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const clearConsumption = () => {
        setConsumption([]);
    };

    return { consumption, addToConsumption, removeFromConsumption, getTotal, clearConsumption };
};
