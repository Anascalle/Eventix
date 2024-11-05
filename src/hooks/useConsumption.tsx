import { useState } from 'react';
import { db, eventsCollection, receiptsCollection } from '../utils/firebaseConfig';
import { doc, getDoc, updateDoc, addDoc } from 'firebase/firestore';

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

    // Función para procesar la compra y restar el amount en `events`
    const processPurchase = async (eventId: string) => {
        try {
            const eventRef = doc(eventsCollection, eventId);
            const eventDoc = await getDoc(eventRef);

            if (eventDoc.exists()) {
                const eventData = eventDoc.data();
                const currentAmount = eventData.accountAmount;
                const totalAmount = getTotal();

                if (totalAmount > currentAmount) {
                    alert("Fondos insuficientes en el evento.");
                    return;
                }

                // Restar el amount en `events`
                await updateDoc(eventRef, {
                    accountAmount: currentAmount - totalAmount,
                });

                // Guardar los detalles de la compra en `receipts`
                await addDoc(receiptsCollection, {
                    items: consumption,
                    total: totalAmount,
                    timestamp: new Date(),
                });

                alert("Compra procesada con éxito.");
                clearConsumption();
            } else {
                alert("Evento no encontrado.");
            }
        } catch (error) {
            console.error("Error al procesar la compra:", error);
            alert("Hubo un problema al procesar la compra.");
        }
    };

    return { consumption, addToConsumption, removeFromConsumption, getTotal, clearConsumption, processPurchase };
};
