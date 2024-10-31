
interface consumptionProp {
    imgConsumption: string;
    nameConsumption: string;
    priceConsumption: number
    quantityConsumption: number;
    total: number;

}

const Consumption: React.FC <consumptionProp> = ({imgConsumption, nameConsumption, priceConsumption, quantityConsumption, total}) => {
    return(
        <div>
            <h2>My Shoopping cart</h2>
            <div>
                <img src={imgConsumption} alt="" />
                <div>
                    <div>
                        <p>{nameConsumption}</p>
                        <p>{priceConsumption}</p>
                    </div>
                    <div>
                        <p>{quantityConsumption}</p>
                        <button>
                            <img src="" alt="" />
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <h2>Total: ${total}</h2>
                <button>Buy all</button>
            </div>
        </div>
    )

}

export default Consumption;