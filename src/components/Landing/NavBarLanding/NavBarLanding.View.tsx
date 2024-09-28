import React from "react";
import "../NavBarLanding/NavBarLanding.css"
import ButtonLogic from "../NavButtons/NavButtons";
import useScroll from "../../../hooks/useScroll";

const Nav1: React.FC = () => {
    const scrolled = useScroll(); 

    return (
        <nav className={`nav_bar1 ${scrolled ? 'scrolled' : ''}`}>
            <h1 className="app_name">Eventix</h1>
            <ul className="nav_links">
                <li><a href="/">ABOUT US</a></li>
                <li><a href="/about">SUPPORT</a></li>
            </ul>
            <div className="nav_buttons">
            <ButtonLogic />
            </div>
        </nav>
    );
}

export default Nav1;