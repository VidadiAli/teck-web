import React, { useState } from "react";
import "./OrderForm.css";
import { percentage } from "../../../Data/DataFile";

const OrderForm = ({
  setShowOrderForm,
  productInfo,
  createOrder,
  creatingMessage,
}) => {
  const [step, setStep] = useState(1);
  const [orderType, setOrderType] = useState("Birdəfəlik");
  const [orderLocation, setOrderLocation] = useState("store");
  const [location, setLocation] = useState("");
  const [orderMonth, setOrderMonth] = useState(2);
  const [percentageValue, setPercentageValue] = useState(3)
  const [error, setError] = useState("");

  const goNext = () => {
    setError("");

    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2) {
      if (orderLocation === "home") {
        setStep(3);
      } else {
        handleCreateOrder(); // store → birbaşa sifariş
      }
      return;
    }
  };

  const goBack = () => {
    setError("");
    setStep((prev) => prev - 1);
  };


  const handleCreateOrder = () => {
    if (orderLocation === "home" && !location.trim()) {
      setError("Zəhmət olmasa ünvanı daxil edin.");
      return;
    }

    const finalOrderData = {
      ...productInfo,
      orderMonth,
      percentageValue,
      orderType,
      orderLocation,
      location:
        orderLocation === "home"
          ? location
          : "Mağazadan götürüləcək",
    };

    createOrder(finalOrderData);
    setShowOrderForm(false);
  };

  return (
    <div className="order-form-overlay">
      <div className="order-form-container">
        <button
          type="button"
          className="order-form-close"
          onClick={() => setShowOrderForm(false)}
        >
          &times;
        </button>

        <h2 className="order-form-title">Sifariş Məlumatları</h2>

        <div className="order-form-stepbar">
          <div className={`order-form-step ${step >= 1 ? "active" : ""}`}>
            Növ
          </div>
          <div className={`order-form-step ${step >= 2 ? "active" : ""}`}>
            Çatdırılma
          </div>
          {orderLocation === "home" && (
            <div className={`order-form-step ${step >= 3 ? "active" : ""}`}>
              Ünvan
            </div>
          )}
        </div>

        <div className="order-form">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="order-form-group">
              <label>Sifariş növü</label>

              <div className="order-form-radio-group">
                <label
                  className={`order-form-radio ${orderType == "Birdəfəlik" ? "active" : ""
                    }`}
                >
                  <input
                    type="radio"
                    checked={orderType == "Birdəfəlik"}
                    onChange={() => setOrderType("Birdəfəlik")}
                  />
                  Birdəfəlik
                </label>

                <label
                  className={`order-form-radio ${orderType === "Hissəli" ? "active" : ""
                    }`}
                >
                  <input
                    type="radio"
                    checked={orderType === "Hissəli"}
                    onChange={() => setOrderType("Hissəli")}
                  />
                  Hissəli

                </label>
              </div>

              {
                orderType == 'Hissəli' && (
                  <div className="taksit-box" translate="no">
                    <div className="taksit-percentage">
                      {
                        percentage.map((p) => (
                          <div key={p.id + "-" + p.percentage}
                            onClick={() => {
                              setOrderMonth(p.percentageMonth);
                              setPercentageValue(p.percentage);
                            }}
                          className="percentage-box"
                          >
                            <button className={`${p.percentageMonth == orderMonth ? 'choosen-month order-month' : 'order-month'}`}>
                              {p.percentageMonth}
                            </button>
                          </div>
                        ))
                      }
                    </div>

                    <span className="percentage-value">
                      {
                        ((((productInfo?.productPrice * percentageValue) / 100) + productInfo?.productPrice) / orderMonth).toFixed(2)
                      } ₼ / ay
                    </span>
                  </div>
                )
              }
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="order-form-group">
              <label>Çatdırılma növü</label>

              <div className="order-form-radio-group">
                <label
                  className={`order-form-radio ${orderLocation === "store" ? "active" : ""
                    }`}
                >
                  <input
                    type="radio"
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
                    checked={orderLocation === "home"}
                    onChange={() => setOrderLocation("home")}
                  />
                  Evə çatdırılma
                </label>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && orderLocation === "home" && (
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

          {/* BUTTONS */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            {step > 1 && (
              <button
                type="button"
                className="order-form-submit"
                style={{ background: "#94a3b8" }}
                onClick={goBack}
              >
                Geri
              </button>
            )}

            {step === 3 ? (
              <button
                type="button"
                className="order-form-submit"
                onClick={handleCreateOrder}
              >
                {creatingMessage
                  ? "Sifariş yaradılır..."
                  : "Sifariş et"}
              </button>
            ) : (
              <button
                type="button"
                className="order-form-submit"
                onClick={goNext}
              >
                {step === 2 && orderLocation === "store"
                  ? "Sifariş et"
                  : "İrəli"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;