import React from "react";
import "./ChooseSalesCompany.css";

const ChooseSalesCompany = ({
  products,
  addToBasket,
  setShowCompanies,
}) => {

  return (
    <div className="overlay" onClick={() => setShowCompanies(false)}>
      <div
        className="sales-card-box"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Satıcı seç!</h2>

        <button
          className="close-btn-add"
          onClick={() => setShowCompanies(false)}
        >
          ✖
        </button>

        {products?.map((item) => (
          <div key={item._id} className="sales-card">
            <div className="product-details">
              <div className="sales-company">
                🏬 {item.salesCompany}
              </div>

              <h3>{item.itemName}</h3>

              <p className="price">
                {item.price} ₼ | 18 ay:{" "}
                {(item.price / 18).toFixed(2)} ₼ / ay
              </p>

              <p className="rating">
                ⭐ {item.rating}
              </p>

              {item.hasDiscount && (
                <p className="discount">
                  Endirim: {item.discountPercent}%
                </p>
              )}
            </div>

            <button
              className="add-to-cart"
              onClick={() => {
                addToBasket(item);
                setShowCompanies(false);
              }}
            >
              🛒 Səbətə əlavə et
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseSalesCompany;
