interface ConsumptionProp {
    items: { id: number; name: string; price: number; quantity: number; image: string }[];
    total: number;
    onRemoveItem: (id: number) => void;
}

const Consumption: React.FC<ConsumptionProp> = ({ items, total, onRemoveItem }) => {
    return (
        <div>
            <h2>My Shopping Cart</h2>
            <div>
                {items.map((item) => (
                    <div key={item.id}>
                        <img src={item.image} alt={item.name} />
                        <div>
                            <p>{item.name}</p>
                            <p>${item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <button onClick={() => onRemoveItem(item.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <h2>Total: ${total}</h2>
                <button>Buy all</button>
            </div>
        </div>
    );
};

export default Consumption;
