import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addLikeds, addToBasket, callLocalBasket, unLiked } from "../../../functions";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import AuthForm from "../../Register/AuthForm";

const ProductCard = ({
    item,
    likeds, setLikeds,
    setResponse, setBasketValue,
    profileInfo }) => {

    const [loading, setLoading] = useState(false);
    const [customerToken, setCustomerToken] = useState(null)

    const finalPrice = item.hasDiscount
        ? (item.price - (item.price * item.discountPercent) / 100).toFixed(2)
        : item.price;

    return (
        <>
            <div className="vns-product-card">
                {item.hasDiscount && (
                    <div className="vns-product-badge">
                        <span className="vns-product-badge-percent">- {item.discountPercent}%</span>
                        <span className="vns-product-badge-text">Endirim</span>
                    </div>
                )}

                {
                    likeds.includes(item._id) ?
                        <FaHeart className="heart-icon" onClick={() => unLiked(item._id, setLikeds)} /> :
                        <FaRegHeart className="heart-icon" onClick={() => addLikeds(item._id, setLikeds)} />
                }

                <div className="vns-product-image-box">
                    <img
                        src={item.itemImage}
                        alt={item.itemName}
                        className="vns-product-image"
                    />
                </div>

                <div className="vns-product-body">
                    <p className="vns-product-company">{item.salesCompany}</p>
                    <h3 className="vns-product-name">{item.itemName}</h3>

                    <p className="item-rating">
                        {((item?.price + (item?.price * 21.6) / 100) / 18).toFixed(2)} ₼ x 18 ay
                    </p>
                    <div className="vns-product-price-row">
                        <span className="vns-product-price">{finalPrice} ₼</span>
                        {item.hasDiscount && (
                            <span className="vns-product-old-price">{item.price} ₼</span>
                        )}
                    </div>

                    <div className="vns-product-actions">
                        <Link to={`/product/${item._id}`} className="vns-product-detail-btn">
                            Ətraflı bax
                        </Link>

                        <button
                            className="vns-product-cart-btn"
                            onClick={
                                () => {
                                    if (!profileInfo) {
                                        callLocalBasket(item, setResponse, true);
                                        return;
                                    }
                                    addToBasket(item._id, setLoading, false, setBasketValue, setResponse, false, false)
                                }
                            }
                        >
                            {
                                loading ? 'Əlavə olunur...' : 'Səbətə at'
                            }
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;