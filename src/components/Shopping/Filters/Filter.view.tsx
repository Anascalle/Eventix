
interface filterProp{
    filterType: string;
}

const Filters: React.FC<filterProp> = ({filterType}) => {
    return(
        <div>
        <p>Filters by</p>
        <input type="text"
                value={filterType}
        />
        </div>
    )

} 

export default Filters;