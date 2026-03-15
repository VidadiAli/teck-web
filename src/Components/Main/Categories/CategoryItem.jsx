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
import { percentage } from "../../Data/DataFile";
import LoadingCircle from "../../Loading/LoadingCircle";
import { addToBasket } from "../../../functions";

const CategoryItem = ({ setResponse, setBasketValue, profileInfo }) => {
  const { productId } = useParams();
  const [month, setMonth] = useState(2);
  const [percentageValue, setPercentageValue] = useState(3)
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
        const res = await api.get(`/customer/getProductById/${productId}`);
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
      if (!profileInfo) {
        setResponse({ type: "info", message: "Xahiş olunur hesabınıza daxil olun", showAlert: true });
        setShowAuthForm(true)
        return;
      }

      const res = await api.get(
        `/customer/getProductsByBarcodAsCustomer/${product.productBarcod}`
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
          "/customer/addToBasket",
          { productId: productsByBarcod[0]._id }
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

  if (loading) return <LoadingCircle />;
  if (error) return <h2 style={{ padding: "40px" }}>{error}</h2>;
  if (!product) return <h2 style={{ padding: "40px" }}>Məhsul tapılmadı ❌</h2>;

  const { itemName, price, rating, itemImage, salesCount, hasDiscount, discountPercent,
    productSize,
    ram,
    operationSystem,
    nfc,
    countOfNuva,
    brend,
    year,
    videoFormat,
    displaySize,
    displayView,
    displayType
  } = product;

  return (
    <section className="item-detail">
      <div className="item-container">

        <div className="item-image">
          <img src={itemImage} alt={itemName} />
        </div>

        <div className="item-info">
          <h1 className="item-title">{itemName}</h1>

          {/* <p className="item-rating">
            {<FaStar />}
          </p> */}

          <div className="item-price">
            <FaMoneyBillWave />
            <span >{hasDiscount ? <>
              <span style={{ paddingRight: '15px' }}>{(price - (price * discountPercent) / 100).toFixed(2)} ₼</span>
              <del style={{ fontSize: '1.5rem', color: 'gray' }}>{price} ₼</del>
            </> : <span>{price} ₼</span>}</span>
            <p>Birdəfəlik Qiymət</p>
          </div>

          <div className="installment">
            <h3>
              <FaCalendarAlt /> Aylıq ödəniş
            </h3>

            <div className="month-options">
              {percentage.map(m => (
                <button
                  key={m?.id}
                  className={month === m?.percentageMonth ? "active" : ""}
                  onClick={() => {
                    setMonth(m?.percentageMonth);
                    setPercentageValue(m?.percentage)
                  }}
                >
                  {m?.percentageMonth} ay
                </button>
              ))}
            </div>

            <div className="monthly-result">
              <strong>{month} ay x {((((price * percentageValue) / 100) + price) / month).toFixed(2)} ₼</strong>
              <span>{
                (((price * percentageValue) / 100) + price).toFixed(2)
              } ₼</span>
            </div>
          </div>

          <button className="add-to-cart-main" onClick={addItem}>
            <FaShoppingCart /> {addingMesage ? "Səbətə Əlavə edilir..." : "Səbətə əlavə et"}
          </button>
        </div>

        <div className="detail">
          <h2>Xüsusiyyətlər</h2>
          <div className="detail-box">
            {brend && brend != '0' && brend != '-' &&
              < div className="detail-box-child">
                <span className="detail-name">Brend</span> <span className="detail-value">{brend || '-'}</span>
              </div>
            }
            {productSize && productSize != '0' && productSize != '-' &&
              <div className="detail-box-child">
                <span className="detail-name">Daxili yaddaş</span> <span className="detail-value">{productSize || '-'}</span>
              </div>
            }
            {ram && ram != '0' && ram != '-' &&
              <div className="detail-box-child">
                <span className="detail-name">Operativ yaddaş</span> <span className="detail-value">{ram || '-'}</span>
              </div>
            }
            {operationSystem && operationSystem != '0' && operationSystem != '-' &&
              <div className="detail-box-child">
                <span className="detail-name">Əməliyyat Sistemi</span> <span className="detail-value">{operationSystem || '-'}</span>
              </div>
            }
            {countOfNuva && countOfNuva != '0' && countOfNuva != '-' &&
              <div className="detail-box-child">
                <span className="detail-name">Nüvələrin sayı</span> <span className="detail-value">{countOfNuva || '-'}</span>
              </div>
            }
            {ram && ram != '0' && ram != '-' &&
              <div className="detail-box-child">
                <span className="detail-name">NFC</span> <span className="detail-value">{nfc ? 'var' : 'yoxdur'}</span>
              </div>
            }
            {videoFormat && videoFormat != '0' && videoFormat != '-' &&
              <div className="detail-box-child">
                <span className="detail-name">Video Format</span> <span className="detail-value">{videoFormat || '-'}</span>
              </div>
            }
            {year && year != '0' && year != '-' &&
              <div className="detail-box-child">
                <span className="detail-name">İstehsal ili</span> <span className="detail-value">{year || '-'}</span>
              </div>
            }
            {displaySize && displaySize != '0' && displaySize != '-' &&
              <div className="detail-box-child">
                <span className="detail-name">Ekran Ölçüsü</span> <span className="detail-value">{displaySize || '-'}</span>
              </div>
            }
            {displayView && displayView != '0' && displayView != '-' &&
              <div className="detail-box-child">
                <span className="detail-name">Ekran Kalitəsi</span> <span className="detail-value">{displayView || '-'}</span>
              </div>
            }
            {displayType && displayType != '0' && displayType != '-' &&
              <div className="detail-box-child">
                <span className="detail-name">Ekran Tipi</span> <span className="detail-value">{displayType || '-'}</span>
              </div>
            }
          </div>
        </div>
      </div>

      {
        showCompanies && (
          <ChooseSalesCompany
            setShowCompanies={setShowCompanies}
            products={companyOptions}
            addToBasket={(selectedProduct) =>
              addToBasket(selectedProduct._id, setLoading, setError, setBasketValue, setResponse, setShowCompanies, true)
            }
            addingMesage={addingMesage}
          />
        )
      }

      {
        showAuthForm && (
          <AuthForm setCustomerToken={setCustomerToken} setShowAuthForm={setShowAuthForm} setResponse={setResponse} />
        )
      }
    </section >
  );
};

export default CategoryItem;
