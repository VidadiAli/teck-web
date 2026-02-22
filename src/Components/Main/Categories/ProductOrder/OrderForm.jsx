import React, { useState } from "react";
import "./OrderForm.css";

const OrderForm = ({ setShowOrderForm, setProductInfo, productInfo, createOrder, creatingMessage }) => {
    const [orderType, setOrderType] = useState("nağd");
    const [orderLocation, setOrderLocation] = useState("store");
    const [location, setLocation] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (orderLocation === "home" && !location.trim()) {
            setError("Zəhmət olmasa ünvanı daxil edin.");
            return;
        }

        setError("");

        const finalOrderData = {
            ...productInfo,
            orderType,
            orderLocation,
            location:
                orderLocation === "home"
                    ? location
                    : "Mağazadan götürüləcək",
        };

        console.log(finalOrderData);

        createOrder(finalOrderData);  // ← data birbaşa ötürülür
        setShowOrderForm(false);
    };

    return (
        <div className="order-form-overlay">
            <div className="order-form-container">
                <button
                    className="order-form-close"
                    onClick={() => setShowOrderForm(false)}
                >
                    &times;
                </button>

                <h2 className="order-form-title">Sifariş Məlumatları</h2>

                <form onSubmit={handleSubmit} className="order-form">

                    {/* Order Type */}
                    <div className="order-form-group">
                        <label>Sifariş növü</label>
                        <div className="order-form-radio-group">
                            <label
                                className={`order-form-radio ${orderType === "nağd" ? "active" : ""
                                    }`}
                            >
                                <input
                                    type="radio"
                                    value="nağd"
                                    checked={orderType === "nağd"}
                                    onChange={() => setOrderType("nağd")}
                                />
                                Nağd
                            </label>

                            <label
                                className={`order-form-radio ${orderType === "taksit" ? "active" : ""
                                    }`}
                            >
                                <input
                                    type="radio"
                                    value="taksit"
                                    checked={orderType === "taksit"}
                                    onChange={() => setOrderType("taksit")}
                                />
                                Taksit
                            </label>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="order-form-group">
                        <label>Çatdırılma növü</label>
                        <div className="order-form-radio-group">
                            <label
                                className={`order-form-radio ${orderLocation === "store" ? "active" : ""
                                    }`}
                            >
                                <input
                                    type="radio"
                                    value="store"
                                    checked={orderLocation === "store"}
                                    onChange={() => setOrderLocation("store")}
                                />
                                Mağazadan götürmə
                            </label>

                            <label
                                className={`order-form-radio ${orderLocation === "home" ? "active" : ""
                                    }`}
                            >
                                <input
                                    type="radio"
                                    value="home"
                                    checked={orderLocation === "home"}
                                    onChange={() => setOrderLocation("home")}
                                />
                                Evə çatdırılma
                            </label>
                        </div>
                    </div>

                    {orderLocation === "home" && (
                        <div className="order-form-group">
                            <label>Ünvan</label>
                            <input
                                className="order-form-input"
                                type="text"
                                placeholder="Tam ünvanı daxil edin"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                    )}

                    {error && <p className="order-form-error">{error}</p>}

                    <button type="submit" className="order-form-submit">
                        {
                            creatingMessage ? "Sifariş yaradılır..." : "Sifariş et"
                        }
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OrderForm;