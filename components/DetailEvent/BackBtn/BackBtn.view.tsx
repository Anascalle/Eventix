import "./BackBtn.css"

interface BackProp{
    NameEvent: string;
}

const BackBtn: React.FC<BackProp> = (prop) =>{
    return(
        <div className="BackBtn">
            <button><img src="https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/Back.png?alt=media&token=24f43304-f4db-4705-ab8a-998f0f31123f" alt="" /></button>
            <p>{prop.NameEvent}</p>
        </div>  
    
    )
}

export default BackBtn;