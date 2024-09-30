import React from "react";
import "./Nav.css";
import useScroll from "../../../hooks/useScroll";

const Nav2: React.FC = () => {
  const scrolled = useScroll(); 

  return (
    <nav className={`nav_bar2 ${scrolled ? 'scrolled' : ''}`}>
      <h1 className="app_name">Eventix</h1>
      <ul className="nav_links">
        <li><a href="/">ABOUT US</a></li>
        <li><a href="/about">SUPPORT</a></li>
      </ul>
      <img id="porfile_img_nav" src="/src/Img/Porfileimg.png" alt="Profile" />
      <p id="user_name_nav">Fernando M</p> {/* Este se ocultará en pantallas pequeñas */}
    </nav>
  );
}

export default Nav2;
