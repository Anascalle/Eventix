import "./FunctionBtns.css"

interface FunctionProp{
    NextShooping: () => void;
    NextFound: () => void;
    NextInvite: () => void;
}

const FunctionBtn: React.FC<FunctionProp> = (prop) =>{
    return(
        <div className="FunctionBtn">
            <button onClick={prop.NextShooping}>
                <img src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/cart%20remove.png?alt=media&token=930e0c77-ecd4-4d2f-b725-188508e07535" alt="" />
                Shopping
            </button>
            <button onClick={prop.NextFound}>
                <img src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/bill%20dollar.png?alt=media&token=84cd7e1d-2853-44eb-ba59-6c92b692b5ab" alt="" />
                Found
            </button>
            <button onClick={prop.NextInvite}>
                <img src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/Group%201000004492.png?alt=media&token=e9d287e1-5cb4-4e5b-8903-9208c08dcbbe" alt="" />
                Invite
            </button>
        </div>  
    
    )
}

export default FunctionBtn;