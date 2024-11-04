import React, { useState } from 'react';

interface ShoppingCardProp {
    id: number;
    image: string;
    name: string;
    price: number;
    disponibility: number;
    addToConsumption: (item: { id: number; name: string; price: number; image: string; disponibility: number }, quantity: number) => void;
}

const ShoppingCard: React.FC<ShoppingCardProp> = ({ id, image, name, price, disponibility, addToConsumption }) => {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        addToConsumption({ id, name, price, image, disponibility }, quantity);
    };

    return (
        <div>
            <button >
                <img src={image} alt={name} />
                <div>
                    <p>{name}</p>
                    <p>${price}</p>
                    <p>Disponibility: {disponibility}</p>
                </div>
                <div>
                    <input
                        type="number"
                        value={quantity}
                        min={1}
                        max={disponibility}
                        onChange={(e) => setQuantity(Math.min(Number(e.target.value), disponibility))}
                    />
                    <button onClick={handleAddToCart}>Buy</button>
                </div>
            </button>
        </div>
    );
};

export default ShoppingCard;
