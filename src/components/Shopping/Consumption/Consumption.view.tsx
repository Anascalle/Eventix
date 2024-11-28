import "./Consumption.css";
import React from "react";

interface ConsumptionProp {
    items: { id: number; name: string; price: number; quantity: number; image: string  }[];
    total: number;
    onRemoveItem: (id: number) => void;
    onBuyAll: () => void;
}

const Consumption: React.FC<ConsumptionProp> = ({ items, total, onRemoveItem, onBuyAll }) => {
    return (
        <div className="shopping-cart">
            <h2 id="h2-consumption">My Shopping Cart</h2>
            <div>
                {items.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div>
                                <p>{item.name}</p>
                                <p>${item.price}</p>
                            </div>
                            <div className="btn-remove">
                                <p>{item.quantity} units</p>
                                <button onClick={() => onRemoveItem(item.id)}>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/Delete2.png?alt=media&token=535cf66d-bcb0-4ded-8f35-e514cdc399cb" alt="" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="total-section">
                <h2>Total: ${total}</h2>
                <button onClick={onBuyAll}>
                    <img className="img-total" src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/ShoppingCart.png?alt=media&token=be532a3d-382c-4209-bcb4-6fdec543a456" alt="" />
                    Buy all</button>
            </div>
        </div>
    );
};

export default Consumption;