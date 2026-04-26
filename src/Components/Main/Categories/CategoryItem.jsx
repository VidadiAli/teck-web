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
import { addToBasket, callLocalBasket } from "../../../functions";
import { Helmet } from "react-helmet-async";
import ProductCard from "../PageLayout/ProductCard";

const CategoryItem = ({ setResponse, setBasketValue, profileInfo, categoriesForNav, likeds, setLikeds }) => {
  const { productId } = useParams();
  const [month, setMonth] = useState(2);
  const [percentageValue, setPercentageValue] = useState(3)
  const [showCompanies, setShowCompanies] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [customerToken, setCustomerToken] = useState('');
  const [addingMesage, setAddingMessage] = useState(false);
  const [imgsList, setImgsList] = useState([]);
  const [colors, setColors] = useState([]);
  const [mainColor, setMainColor] = useState('');
  const [productDetails, setProductDetails] = useState([]);
  const [modelsLikeIt, setModelsLikeIt] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/customer/getProductById/${productId}`);
        setProduct(res.data);
        try {
          const likeProduct = await api.get(`/customer/getProductsByCategory/${res.data?.category?._id}`);
          setModelsLikeIt(likeProduct.data.products);
        } catch (error) {
          setError("Məhsula uyğun modellər tapılmadı ❌");
        }
      } catch (err) {
        setError("Məhsul tapılmadı ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const addItem = async (item) => {
    try {
      if (!profileInfo) {
        callLocalBasket(item, setResponse, true);
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
      setResponse({
        message: error.response?.data?.message,
        head: 'Xəta!',
        showAlert: true,
        type: 'error'
      });
    }
  };


  useEffect(() => {
    if (product) {
      const productColors = [];
      product?.itemImageList?.forEach(e => {
        if (!productColors.includes(e.color)) {
          productColors.push(e.color);
        }
      });

      setMainColor[productColors[0]];
      setColors([...productColors]);
      const imagesList = product?.itemImageList
        ?.filter(e => e.color === productColors[0])
        .map(e => e.imageUrl);
      setImgsList([...imagesList]);
    }

    if (categoriesForNav?.length > 0 && product) {
      const details = categoriesForNav.find(e => e._id == product.category?._id);
      setProductDetails(details.productDetails.map(e => e.detailName))
    }
  }, [product]);

  const changeImage = (item) => {
    const firstImage = imgsList.find(e => e == item);
    const newList = imgsList.filter(e => e != item);
    newList.unshift(firstImage);
    setImgsList([...newList]);
  }

  const changeColor = (color) => {
    const imagesList = product?.itemImageList
      ?.filter(e => e.color === color)
      .map(e => e.imageUrl);
    setImgsList([...imagesList]);
  }


  if (loading) return <LoadingCircle />;
  if (error) return <>
    <Helmet>
      <title>
        {"Product | VNS Electronics"}
      </title>
      <meta
        name={`Məhsul`}
        content={`Məhsul`}
      />
    </Helmet>
    <h2 style={{ padding: "40px" }}>{error}</h2>
  </>;
  if (!product) return <>
    <Helmet>
      <title>
        {"Product | VNS Electronics"}
      </title>
      <meta
        name={`Məhsul`}
        content={`Məhsul`}
      />
    </Helmet>
    <h2 style={{ padding: "40px" }}>Məhsul tapılmadı ❌</h2>
  </>;

  const { itemName, hasDiscount, discountPercent, price } = product;
  return (
    <>
      <Helmet>
        <title>
          {itemName ? `${itemName} | VNS Electronics` : "Product | VNS Electronics"}
        </title>
        <meta
          name={`${itemName && itemName}`}
          content={`${itemName && itemName} məhsulu.`}
        />
      </Helmet>
      <section className="item-detail">
        <div className="item-container">

          <div className="item-image">
            <div className="first-img">
              <img src={imgsList[0]} alt={itemName} className="item-picture" />
            </div>
            <div className="item-images-box">
              {
                imgsList.slice(1).map((image, index) => (
                  <div className="other-imgs" key={image + index} onClick={() => changeImage(image)}>
                    <img src={image} alt={itemName} className="item-picture" />
                  </div>
                ))
              }
            </div>
            <div className="color-boxes">
              {
                colors.map((e) => {
                  return <div
                    onClick={() => changeColor(e)}
                    key={e}
                    className="color-box"
                    style={{ backgroundColor: e, outlineColor: e }}></div>
                })
              }
            </div>
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

            <button className="add-to-cart-main" onClick={() => addItem(product)}>
              <FaShoppingCart /> {addingMesage ? "Səbətə Əlavə edilir..." : "Səbətə əlavə et"}
            </button>
          </div>

          <div className="detail">
            <h2>Xüsusiyyətlər</h2>
            <div className="detail-box">
              {product &&
                Object.entries(product).map(([key, value]) => {
                  if (productDetails.includes(key) && value != '-' && value != 'false' && value != false && value != '0') {
                    return (
                      <div className="detail-box-child" key={key}>
                        <span className="detail-name">
                          {
                            categoriesForNav?.
                              find(e => e._id == product?.category?._id).
                              productDetails.find(f => f.detailName == key).detail.
                              split("placeholder:")[0].split("(notebook üçün)")[0]
                          }
                        </span>
                        <span className="detail-value">
                          {key === 'volume' ? `${value} dB` :
                            key === 'guarantee' ? `${value} ay` :
                              key === 'redTime' ? `${value} saniyə` :
                                key === 'maxdegrie' ? `${value} °C` :
                                  key === 'power' ? `${value} W` :
                                    value === true || value === 'true' ? 'var' : value || '-'}
                        </span>
                      </div>
                    );
                  }
                  return null;
                })
              }
            </div>
          </div>
        </div>

        <div className="models-grid-box">
          <h1 className="models-grid-head">Bunlara da bax</h1>
          <div className="models-grid">
            {
              modelsLikeIt.length > 0 && (
                modelsLikeIt.map((e) => {
                  return <ProductCard
                    key={e._id}
                    item={e}
                    likeds={likeds}
                    setLikeds={setLikeds}
                    setResponse={setResponse}
                    setBasketValue={setBasketValue}
                    profileInfo={profileInfo}
                  />
                })
              )
            }
          </div>
        </div>

        {
          showCompanies && (
            <ChooseSalesCompany
              setShowCompanies={setShowCompanies}
              products={companyOptions}
              addToBasket={
                (selectedProduct) => {
                  addToBasket(selectedProduct._id, setLoading, setError, setBasketValue, setResponse, setShowCompanies, true)
                }
              }
              addingMesage={addingMesage}
            />
          )
        }

        {
          showAuthForm && (
            <AuthForm
              setCustomerToken={setCustomerToken}
              setShowAuthForm={setShowAuthForm}
              setResponse={setResponse}
            />
          )
        }
      </section >
    </>
  );
};

export default CategoryItem;
