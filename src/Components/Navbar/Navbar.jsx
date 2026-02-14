import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../Images/logo.png';
import { FiSearch, FiHeart, FiShoppingCart, FiArrowRight } from "react-icons/fi";
import { MdOutlineAssignmentTurnedIn } from 'react-icons/md';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import './Navbar.css'

const Navbar = ({ basketValue }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <NavLink to="/">
          <img src={logo} alt="Logo" className="navbar__logo-img" />
        </NavLink>
      </div>

      <div className="navbar__search">
        <input type="text" className="navbar__search-input" placeholder="Axtar..." />
        <FiSearch className="navbar__search-icon" />
      </div>

      <ul className={`navbar__links ${menuOpen ? "navbar__links--active" : ""}`}>
        <li className="navbar__item" onClick={()=>{setMenuOpen(false)}}>
          <NavLink to="/" className="navbar__link">
            <FiHeart className="navbar__icon" />
            <span>Bəyəndiklərim</span>
          </NavLink>
        </li>
        <li className="navbar__item" onClick={()=>{setMenuOpen(false)}}>
          <NavLink to="/basket" className="navbar__link">
            <FiShoppingCart className="navbar__icon" />
            <span>Səbətim</span>
          </NavLink>
          {
            basketValue > 0 && <span className='element__count'>{basketValue}</span>
          }
        </li>
        <li className="navbar__item" onClick={()=>{setMenuOpen(false)}}>
          <NavLink to="/requests" className="navbar__link">
            <MdOutlineAssignmentTurnedIn className="navbar__icon" />
            <span>Sifarişlərim</span>
          </NavLink>
        </li>
        <li className="navbar__item navbar__cta" onClick={()=>{setMenuOpen(false)}}>
          <NavLink to="/" className="navbar__link navbar__link--cta">
            <span>İndi Al</span>
            <FiArrowRight className="navbar__arrow" />
          </NavLink>
        </li>
      </ul>

      <div className="navbar__menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <HiOutlineX size={28} /> : <HiOutlineMenu size={28} />}
      </div>
    </nav>
  );
};

export default Navbar;
