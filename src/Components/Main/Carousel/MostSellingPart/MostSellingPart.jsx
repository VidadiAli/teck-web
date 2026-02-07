import React from "react";
import data from "../../../Data/DataFile";
import "./MostSellingPart.css";

const { productsData } = data;

const MostSellingPart = () => {
  const allProducts = productsData.flatMap((cat) => cat.items);
  const top10Products = allProducts
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 10);

  return (
    <div className='most-selling-container'>
      <h2>Ən çox satılan</h2>
      <div className='most-selling-list'>
        {top10Products.map((item, index) => (
          <div key={index} className='most-selling-item'>
            <div className='item-image'>
              <img src={item.itemImage} alt={item.itemName} className="item-image-photo"/>
            </div>
            <div className='item-info'>
              <p className='item-name'>{item.itemName}</p>
              <div className='item-price'>
                {item.hasDiscount && (
                  <span className='old-price'>{item.price} ₼</span>
                )}
                <span className='new-price'>
                  {item.hasDiscount
                    ? Math.round(item.price * (1 - item.discountPercent / 100))
                    : item.price}{" "}
                  ₼
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostSellingPart;
