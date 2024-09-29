
interface FunctionProp{
    NextShooping: () => void;
    NextFound: () => void;
    NextInvite: () => void;
}

const FunctionBtn: React.FC<FunctionProp> = (prop) =>{
    return(
        <div className="FunctionBtn">
            <button onClick={prop.NextShooping}>
                <img src="/src/Img/cart remove.png" alt="" />
                Shopping
            </button>
            <button onClick={prop.NextFound}>
                <img src="/src/Img/bill dollar.png" alt="" />
                Found
            </button>
            <button onClick={prop.NextInvite}>
                <img src="/src/Img/Group 1000004492.png" alt="" />
                Invite
            </button>
        </div>  
    
    )
}

export default FunctionBtn;