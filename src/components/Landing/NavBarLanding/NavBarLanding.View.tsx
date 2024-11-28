import React from "react";
import "../NavBarLanding/NavBarLanding.css"
import ButtonLogic from "../NavButtons/NavButtons";
import useScroll from "../../../hooks/useScroll";

const Nav1: React.FC = () => {
    const scrolled = useScroll(); 

    return (
        <nav className={`nav_bar1 ${scrolled ? 'scrolled' : ''}`}>
            <h1 className="app_names">Eventix</h1>

            <div className="nav_buttonss">
            <ButtonLogic />
            </div>
        </nav>
    );
}

export default Nav1;