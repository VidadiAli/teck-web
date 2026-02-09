import React, { useState } from "react";
import { useParams } from "react-router-dom";
import data from "../../Data/DataFile";
import {
  FaStar,
  FaShoppingCart,
  FaMoneyBillWave,
  FaCalendarAlt
} from "react-icons/fa";
import "./CategoryItem.css";

const { productsData } = data;

const CategoryItem = () => {
  const { itemId } = useParams();
  const [month, setMonth] = useState(6);

  const allItems = productsData.flatMap(cat => cat.items);
  const product = allItems.find(item => item.id == itemId);

  if (!product) {
    return <h2 style={{ padding: "40px" }}>Məhsul tapılmadı ❌</h2>;
  }

  const { itemName, price, rating, itemImage, salesCount } = product;

  return (
    <section className="item-detail">
      <div className="item-container">

        <div className="item-image">
          <img src={itemImage} alt={itemName} />
        </div>

        <div className="item-info">
          <h1 className="item-title">{itemName}</h1>

          <p className="item-rating">
            <FaStar /> {rating} • {salesCount} satış
          </p>

          <div className="item-price">
            <FaMoneyBillWave />
            <span>{price} ₼</span>
            <p>Nağd qiymət</p>
          </div>

          <div className="installment">
            <h3>
              <FaCalendarAlt /> Aylıq ödəniş
            </h3>

            <div className="month-options">
              {[6, 12, 18].map(m => (
                <button
                  key={m}
                  className={month === m ? "active" : ""}
                  onClick={() => setMonth(m)}
                >
                  {m} ay
                </button>
              ))}
            </div>

            <div className="monthly-result">
              <strong>{(price / month).toFixed(2)} ₼</strong>
              <span>{month} ay x {(price / month).toFixed(2)} ₼</span>
            </div>
          </div>

          <button className="add-to-cart">
            <FaShoppingCart /> Səbətə əlavə et
          </button>
        </div>

      </div>
    </section>
  );
};

export default CategoryItem;
