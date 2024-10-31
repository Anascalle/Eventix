
interface FilterProp {
    filterType: string;
    onFilterSelect: (type: string) => void; 
}

const Filters: React.FC<FilterProp> = ({ filterType, onFilterSelect }) => {
    const categories = ["Halloween", "Birthday", "Wedding", "Baby Shower", "Christmas"];

    return (
        <div>
            <p>Filters by:</p>
            {categories.map((category) => (
                <button key={category} onClick={() => onFilterSelect(category)}>
                    {category}
                </button>
            ))}
        </div>
    );
};

export default Filters;
