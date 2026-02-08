import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import data from "../../Data/DataFile";
import "./CategoryGrid.css";

const { productsData } = data;

const getStars = (rating) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  let stars = "";
  for (let i = 0; i < full; i++) stars += "★";
  if (half) stars += "☆";
  while (stars.length < 5) stars += "☆";
  return stars;
};

const CategoryGrid = ({ valueOfProducts }) => {
  const [productsArr, setProductsArr] = useState([]);

  useEffect(() => {
    if (valueOfProducts == "all") {
      setProductsArr(productsData);
    }
    else {
      const dataOfProducts = productsData.filter(d => d.category == valueOfProducts);
      setProductsArr(dataOfProducts);
    }
  }, [])

  const callDatas = (items) => {
    let lengthOfData = [];
    if (valueOfProducts == "all") {
      lengthOfData = items.slice(0, 4);
    }
    else {
      lengthOfData = items;
    }
    return lengthOfData.map((item) => (
      <div key={item.serialNumber} className="product-card">
        {item.hasDiscount && (
          <div className="discount-badge">-{item.discountPercent}%</div>
        )}
        <img
          src={item.itemImage}
          alt={item.itemName}
          className="product-image"
        />
        <div className="product-info">
          <h3 className="product-name">{item.itemName}</h3>
          <p className="product-price">Qiymət: ${item.price}</p>
          <p className="product-serial">Serial: {item.serialNumber}</p>
          <p className="product-sales">Satış: {item.salesCount}</p>
          <p className="product-rating">
            <span className="stars">{getStars(item.rating)}</span> ({item.rating})
          </p>
          <button className="product-button">İndi al</button>
        </div>
      </div>
    ))
  }
  return (
    <div className="category-grid-container">
      {productsArr.map((category) => (
        <div key={category.category} className="category-block">
          <div className="category-header">
            <h2 className="category-title">{category.category.toUpperCase()}</h2>
            {
              valueOfProducts == "all" && (
                <NavLink className="category-link" to={`/teck-web/${category.category}`}>
                  Daha çox
                </NavLink>
              )
            }
          </div>
          <div className="card-grid">
            {
              callDatas(category.items)
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;
