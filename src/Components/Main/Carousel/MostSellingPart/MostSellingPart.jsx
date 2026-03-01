import React, { useState, useEffect } from "react";
import "./MostSellingPart.css";
import api from "../../../../api";
import LoadingCircle from "../../../Loading/LoadingCircle";

const MostSellingPart = () => {
  const [mainProductsData, setMainProductsData] = useState([]);
  const [loadingFirst, setLoadingFirst] = useState(false)

  const callData = async () => {
    setLoadingFirst(true)
    try {
      const resData = await api.get("/customer/getProducts");
      setMainProductsData(resData?.data || []);
      setLoadingFirst(false)
    } catch (error) {
      console.error(error);
      setLoadingFirst(false)
    }
  };

  useEffect(() => {
    callData();
  }, []);

  const top10Products = [...mainProductsData]
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 10);

  return (
    <div className="most-selling-container">
      <h2 className="most-selling-container-head">Ən çox satılan</h2>
      {
        loadingFirst ? <LoadingCircle /> :
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
      }
    </div>
  );
};

export default MostSellingPart;
