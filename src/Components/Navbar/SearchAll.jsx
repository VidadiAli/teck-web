import React from "react";
import { NavLink } from "react-router-dom";
import "./SearchNavbar.css";
import LoadingMore from "../../loadings/LoadingMore";
import { createSlug } from "../../functions";

const SearchAll = ({
  searchData,
  searchPage,
  setSearchPage,
  totalSearchPages,
  searchLoading
}) => {
  if (!searchData || searchData.length === 0) {
    return <p className="no-results">Nəticə tapılmadı</p>;
  }

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
              to={`/product/${createSlug(item.itemName).split(" ").join('-').split('/').join('-') + "-id-" + item._id}`}
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

      {searchLoading && <LoadingMore />}
      {
        searchPage < totalSearchPages && (
          <div className="search-load-more">
            <button
              className="search-load-more__btn"
              onClick={() => setSearchPage((prev) => prev + 1)}
            >
              Daha çox
            </button>
          </div>
        )
      }
    </div>
  );
};

export default SearchAll;