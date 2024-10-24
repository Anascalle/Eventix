
interface ShoppingCardProp {
    imgShopping: string;
    nameObject: string;
    priceObject: number;
    quantityObject: number;
}


const ShoppingCard: React.FC<ShoppingCardProp> =({imgShopping, nameObject, priceObject, quantityObject}) => {
return(
    <div>
        <button>
            <img src={imgShopping} alt="" />
            <div>
                <p>{nameObject}</p>
                <p>{priceObject}</p>
                <p>{quantityObject}</p>
            </div>
            <div>
            <input type="number" name="" id="" />
            <button>Buy</button>
            </div>
        </button>
    </div>
)

}

export default ShoppingCard;
