import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import "./SearchNavbar.css";

const SearchNavbar = ({ setSearchData, searchData }) => {
    if (!searchData || searchData.length === 0) return;

    const handleClose = () => {
        setSearchData([]);
    };

    return (
        <div className={`search-dropdown`}>
            <div className="search-header">
                <span>Məhsullar</span>
                <button className="search-close" onClick={handleClose}>
                    <FaTimes />
                </button>
            </div>

            <div className="search-results">
                {searchData.slice(0, 4).map((item) => {
                    const hasDiscount = item.hasDiscount && item.discountPercent > 0;
                    const discountedPrice = hasDiscount
                        ? (item.price - (item.price * item.discountPercent) / 100).toFixed(2)
                        : null;

                    return (
                        <NavLink
                            key={item._id}
                            to={`/product/${item._id}`}
                            className="search-item"
                            onClick={handleClose}
                        >
                            <img
                                src={item.itemImage || "/no-image.png"}
                                alt={item.itemName}
                            />
                            <div>
                                <p className="search-item-name">{item.itemName}</p>
                                <p className="search-item-price">
                                    {hasDiscount ? (
                                        <>
                                            <span>₼ {discountedPrice}</span>
                                            <del>₼ {item.price}</del>
                                        </>
                                    ) : (
                                        <span>₼ {item.price}</span>
                                    )}
                                </p>
                            </div>
                        </NavLink>
                    );
                })}
            </div>

            <NavLink
                to="/search"
                className="search-all"
                onClick={handleClose}
            >
                Bütün nəticələrə bax
            </NavLink>
        </div>
    );
};

export default SearchNavbar;