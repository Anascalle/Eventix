import "./BackBtn.css"

interface BackProp{
    NameEvent: string;
}

const BackBtn: React.FC<BackProp> = (prop) =>{
    return(
        <div className="BackBtn">
            <button><img src="/src/Img/Back.png" alt="" /></button>
            <p>{prop.NameEvent}</p>
        </div>  
    
    )
}

export default BackBtn;