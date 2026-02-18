import React, { useState, useEffect } from "react";
import "./MostSellingPart.css";
import api from "../../../../api";

const MostSellingPart = () => {
  const [mainProductsData, setMainProductsData] = useState([]);

  const callData = async () => {
    try {
      const resData = await api.get("/products/getProducts");
      setMainProductsData(resData?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    callData();
  }, []);

  // 🔥 API-dən gələn məhsulları salesCount-a görə sırala
  const top10Products = [...mainProductsData]
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 10);

  return (
    <div className="most-selling-container">
      <h2>Ən çox satılan</h2>

      <div className="most-selling-list">
        {top10Products.map((item) => (
          <div key={item._id} className="most-selling-item">
            <div className="item-image">
              <img
                src={item.itemImage || "/no-image.png"}
                alt={item.itemName}
                className="item-image-photo"
              />
            </div>

            <div className="item-info">
              <p className="item-name">{item.itemName}</p>

              <div className="item-price">
                {item.hasDiscount && (
                  <span className="old-price">{item.price} ₼</span>
                )}

                <span className="new-price">
                  {item.hasDiscount
                    ? Math.round(
                        item.price * (1 - item.discountPercent / 100)
                      )
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
