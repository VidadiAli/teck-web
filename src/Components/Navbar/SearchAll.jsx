import React from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import "./SearchNavbar.css";

const SearchAll = ({ searchData }) => {
    console.log(searchData)
  if (!searchData || searchData.length === 0) return <p className="no-results">Nəticə tapılmadı</p>;

  return (
    <div className="search-dropdown search-all-page">
      <div className="search-header">
        <span>Bütün məhsullar</span>
      </div>

      <div className="search-results">
        {searchData.map((item) => {
          const hasDiscount = item.hasDiscount && item.discountPercent > 0;
          const discountedPrice = hasDiscount
            ? (item.price - (item.price * item.discountPercent) / 100).toFixed(2)
            : null;

          return (
            <NavLink
              key={item._id}
              to={`/product/${item._id}`}
              className="search-item"
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
    </div>
  );
};

export default SearchAll;