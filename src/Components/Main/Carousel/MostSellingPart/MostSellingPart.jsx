import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'
import "./MostSellingPart.css";
import api from "../../../../api";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import LoadingCircle from "../../../Loading/LoadingCircle";
import { addLikeds, unLiked } from "../../../../functions";

const MostSellingPart = ({ setLikeds, likeds }) => {
  const [mainProductsData, setMainProductsData] = useState([]);
  const [loadingFirst, setLoadingFirst] = useState(false)

  const callData = async () => {
    setLoadingFirst(true)
    try {
      const resData = await api.get("/customer/mostSellingTopTen");
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

  return (
    <div className="most-selling-container">
      <h2 className="most-selling-container-head">Ən çox satan</h2>
      {
        loadingFirst ? <LoadingCircle /> :
          <div className="most-selling-list">
            {mainProductsData.map((item) => (
              <div key={item._id} className="most-selling-item">
                <div style={{ padding: '20px 15px', display: 'flex', gap: '10px', flexDirection: 'column', position: 'relative' }}>
                  {
                    likeds.includes(item._id) ?
                      <FaHeart className="heart-icon" onClick={() => unLiked(item._id, setLikeds)} /> :
                      <FaRegHeart className="heart-icon" onClick={() => addLikeds(item._id, setLikeds)} />
                  }
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
                <div className="most-sell-item-ope">
                  <NavLink
                    className="product-button-most-selling"
                    to={`/product/${item._id}`}
                  >
                    İndi al
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
      }
    </div>
  );
};

export default MostSellingPart;
