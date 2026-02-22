import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaStar,
  FaShoppingCart,
  FaMoneyBillWave,
  FaCalendarAlt
} from "react-icons/fa";
import "./CategoryItem.css";
import ChooseSalesCompany from "./ChooseSalesCompany";
import api from "../../../api";
import AuthForm from "../../Register/AuthForm";

const CategoryItem = ({ setResponse, setBasketValue }) => {
  const { productId } = useParams();
  const [month, setMonth] = useState(6);
  const [showCompanies, setShowCompanies] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [customerToken, setCustomerToken] = useState('')
  const [addingMesage, setAddingMessage] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/getProductById/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        setError("Məhsul tapılmadı ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const addItem = async () => {
    try {
      const token = localStorage.getItem("customerAccessToken");
      if (!token) {
        setResponse({ type: "info", message: "Xahiş olunur hesabınıza daxil olun", showAlert: true });
        setShowAuthForm(true)
        return;
      }

      const res = await api.get(
        `/products/getProductsByBarcodAsCustomer/${product.productBarcod}`
      );

      const productsByBarcod = res.data;

      if (!productsByBarcod || productsByBarcod.length === 0) {
        setResponse({ type: "error", message: "Məhsul tapılmadı ❌", showAlert: true });
        return;
      }

      if (productsByBarcod.length > 1) {
        setCompanyOptions(productsByBarcod);
        setShowCompanies(true);
      } else {
        setAddingMessage(true)
        const addRes = await api.post(
          "/basket/addToBasket",
          { productId: productsByBarcod[0]._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBasketValue(addRes?.data?.count)
        setAddingMessage(false)
        setResponse({ type: "success", message: "Səbətə əlavə olundu ✅", showAlert: true });
      }

    } catch (error) {
      console.error(error);
      setResponse({ type: "error", message: "Xəta baş verdi ❌", showAlert: true });
    }
  };

  const addToBasket = async (productId) => {
    try {
      setLoading(true)
      setError("S")
      const res = await api.post("/basket/addToBasket", {
        productId,
        quantity: 1,
      });

      // setBasketValue(res.data.count);

      setResponse({
        type: "success",
        message: "Səbətə əlavə olundu ✅",
        showAlert: true,
        head: "Uğurlu!",
      });

      setShowCompanies(false);

    } catch (error) {
      console.error(error);
      setResponse({
        type: "error",
        message: "Səbətə əlavə edilə bilmədi ❌",
        showAlert: true
      });
    }
  };

  if (loading) return <h2 style={{ padding: "40px" }}>Yüklənir...</h2>;
  if (error) return <h2 style={{ padding: "40px" }}>{error}</h2>;
  if (!product) return <h2 style={{ padding: "40px" }}>Məhsul tapılmadı ❌</h2>;

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

          <button className="add-to-cart-main" onClick={addItem}>
            <FaShoppingCart /> {addingMesage ? "Səbətə Əlavə edilir..." : "Səbətə əlavə et"}
          </button>
        </div>

      </div>

      {showCompanies && (
        <ChooseSalesCompany
          setShowCompanies={setShowCompanies}
          products={companyOptions}
          addToBasket={(selectedProduct) =>
            addToBasket(selectedProduct._id)
          }
          addingMesage={addingMesage}
        />
      )}

      {
        showAuthForm && (
          <AuthForm setCustomerToken={setCustomerToken} setShowAuthForm={setShowAuthForm} setResponse={setResponse} />
        )
      }
    </section>
  );
};

export default CategoryItem;
