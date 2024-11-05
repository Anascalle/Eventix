import "./Filter.css";
import React, { useState } from "react";

interface FilterProp {
    filterType: string;
    onFilterSelect: (type: string) => void; 
}

const Filters: React.FC<FilterProp> = ({ filterType, onFilterSelect }) => {
    const categories = ["Halloween", "Birthday", "Wedding", "Baby Shower", "Christmas", "Other"];

    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const handleFilterSelect = (category: string) => {
        setActiveCategory(category); 
        onFilterSelect(category); 
    };

    return (
        <div className="filters">
            <div>
                <p>Filters by:</p>
            </div>
            <div className="CardsFilters">
                {categories.map((category) => (
                    <button 
                        className={`filterbtn ${activeCategory === category ? 'active' : ''}`} 
                        key={category} 
                        onClick={() => handleFilterSelect(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Filters;
