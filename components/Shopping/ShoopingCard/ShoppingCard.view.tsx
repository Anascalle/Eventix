
interface ShoppingCardProp {

        image: string;
        name: string;
        price: number;
        disponibility: number;

}


const ShoppingCard: React.FC<ShoppingCardProp> =({image, name, price, disponibility}) => {
return(
    <div>
        <button>
            <img src={image} alt="" />
            <div>
                <p>{name}</p>
                <p>{price}</p>
                <p>{disponibility}</p>
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
