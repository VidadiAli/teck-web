import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../Images/logo.png';
import { FiSearch, FiHeart, FiShoppingCart, FiArrowRight } from "react-icons/fi";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"; 
import './Navbar.css'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <NavLink to="/teck-web">
          <img src={logo} alt="Logo" className="navbar__logo-img" />
        </NavLink>
      </div>

      <div className="navbar__search">
        <input type="text" className="navbar__search-input" placeholder="Axtar..." />
        <FiSearch className="navbar__search-icon" />
      </div>

      <ul className={`navbar__links ${menuOpen ? "navbar__links--active" : ""}`}>
        <li className="navbar__item">
          <NavLink to="/teck-web/" className="navbar__link">
            <FiHeart className="navbar__icon" />
            <span>Bəyəndiklərim</span>
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink to="/teck-web/" className="navbar__link">
            <FiShoppingCart className="navbar__icon" />
            <span>Səbətim</span>
          </NavLink>
        </li>
        <li className="navbar__item navbar__cta">
          <NavLink to="/teck-web/" className="navbar__link navbar__link--cta">
            <span>İndi Al</span>
            <FiArrowRight className="navbar__arrow" />
          </NavLink>
        </li>
      </ul>

      <div className="navbar__menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <HiOutlineX size={28}/> : <HiOutlineMenu size={28}/>}
      </div>
    </nav>
  );
};

export default Navbar;
