import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { addLikeds, addToBasket, callLocalBasket, unLiked } from "../../../functions";
import { FaStar, FaHeart, FaRegHeart, FaCalendarAlt } from "react-icons/fa";
import { percentage } from "../../Data/DataFile";
import { useEffect } from "react";

const ProductCard = ({
    item,
    likeds, setLikeds,
    setResponse, setBasketValue,
    profileInfo }) => {

    const [loading, setLoading] = useState(false);
    const [month, setMonth] = useState(3);
    const [percentageValue, setPercentageValue] = useState(4.2);
    const [imgsList, setImgsList] = useState([]);
    const imageBoxRef = useRef(null);

    const finalPrice = item.hasDiscount
        ? (item.price - (item.price * item.discountPercent) / 100).toFixed(2)
        : item.price;

    useEffect(() => {
        const imagesList = item?.itemImageList?.map(e => e.imageUrl) ?? [];
        imagesList.unshift(item.itemImage);
        setImgsList([...imagesList]);
    }, [item]);

    useEffect(() => {
        const box = imageBoxRef.current;
        if (!box) return;

        const elements = box.querySelectorAll(".vns-product-image-slide");
        if (!elements.length) return;

        if (elements.length === 1) {
            elements[0].style.transform = "translateX(0)";
            return;
        }

        let currentIndex = 0;

        elements.forEach((el, index) => {
            el.style.transform = `translateX(${index * 100}%)`;
            el.style.transition = "transform 0.5s ease";
        });

        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % elements.length;

            elements.forEach((el, index) => {
                el.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [imgsList]);

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

                <div className="vns-product-image-box" ref={imageBoxRef}>
                    {imgsList?.map((image, index) => (
                        <div
                            key={item._id + image + index}
                            className="vns-product-image-slide"
                        >
                            <img
                                src={image}
                                alt={item.itemName}
                                className="vns-product-image"
                            />
                        </div>
                    ))}
                </div>

                <div className="vns-product-body">
                    <p className="vns-product-company">{item.salesCompany}</p>
                    <h3 className="vns-product-name">{item.itemName}</h3>

                    <div className="vns-product-installment">
                        <h3>
                            <FaCalendarAlt /> Aylıq ödəniş
                        </h3>

                        <div className="vns-product-month-options">
                            {percentage.map(m => {
                                if ([3, 6, 18, 35].includes(m.percentageMonth)) {
                                    return <button
                                        key={m?.id}
                                        className={month == m?.percentageMonth ? "active" : ""}
                                        onClick={() => {
                                            setMonth(m?.percentageMonth);
                                            setPercentageValue(m?.percentage)
                                        }}
                                    >
                                        {m?.percentageMonth}
                                    </button>
                                }
                            })}
                        </div>

                        <div className="vns-product-monthly-result">
                            <strong>{month} ay x {((((item.price * percentageValue) / 100) + item.price) / month).toFixed(2)} ₼</strong>
                        </div>
                    </div>
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