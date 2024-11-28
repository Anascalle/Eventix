import { useState } from 'react';
import { eventsCollection, receiptsCollection } from '../utils/firebaseConfig';
import { doc, getDoc, updateDoc, addDoc } from 'firebase/firestore';
import toast from 'react-hot-toast'; // Importa toast para mostrar notificaciones

export const useConsumption = () => {
    const [consumption, setConsumption] = useState<{ id: number, name: string, price: number, quantity: number, image: string, disponibility: number }[]>([]);

    const addToConsumption = (item: { id: number; name: string; price: number; image: string; disponibility: number }, quantity: number) => {
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
        return parseFloat(consumption.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(3));
    };

    const clearConsumption = () => {
        setConsumption([]);
    };

    const processPurchase = async (eventId: string) => {
        try {
            const eventRef = doc(eventsCollection, eventId);
            const eventDoc = await getDoc(eventRef);
            if (!eventDoc.exists()) {
                toast.error("Event not found.");
                return;
            }
            const eventData = eventDoc.data();
            const currentAmount = eventData.accountAmount;
            const totalAmount = getTotal();
            if (totalAmount > currentAmount) {
                toast.error("Insufficient funds in the event.");
                return;
            }
            // Ejecutar las operaciones de actualización y adición en paralelo 
            await Promise.all([
                updateDoc(eventRef, {
                    accountAmount: currentAmount - totalAmount,
                }),
                addDoc(receiptsCollection, {
                    items: consumption,
                    total: totalAmount,
                    timestamp: new Date(),
                })
            ]);
            toast.success("Purchase processed successfully.");
            clearConsumption();
        } catch (error) {
            console.error("Error processing purchase:", error);
            toast.error("There was a problem processing the purchase.");
        }
    };

    return { consumption, addToConsumption, removeFromConsumption, getTotal, clearConsumption, processPurchase };
};
