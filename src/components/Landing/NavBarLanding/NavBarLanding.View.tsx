import React from "react";
import "../NavBarLanding/NavBarLanding.css"
import ButtonLogic from "../NavButtons/NavButtons";
import useScroll from "../../../hooks/useScroll";

interface NavProps extends React.InputHTMLAttributes<HTMLInputElement> {
    title: string;
    disappear1: string;
    disappear2: string;
}

const Nav1: React.FC<NavProps> = ({ title, disappear1, disappear2}) => {
    const scrolled = useScroll();

    return (
        <nav className={`nav_bar1 ${scrolled ? 'scrolled' : ''}`}>
            <h1 id={title} className="app_names">Eventix</h1>
            <ul id={disappear1} className="nav_linkss">
                <li><a href="/">ABOUT US</a></li>
                <li><a href="/about">SUPPORT</a></li>
            </ul>
            <div id={disappear2} className="nav_buttonss">
            <ButtonLogic />
            </div>
        </nav>
    );
}

export default Nav1;