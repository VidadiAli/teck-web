import React, { useEffect, useState } from 'react'
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import './Basket.css'
import api from '../../../api'
import OrderForm from './ProductOrder/OrderForm'
import LoadingCircle from '../../Loading/LoadingCircle'
import { addLikeds, callLocalBasket, decreaseItem, deleteItem, unLiked } from '../../../functions';
import AuthForm from '../../Register/AuthForm';
import { Helmet } from "react-helmet-async";

const BasketPage = ({
  setResponse,
  setBasketValue,
  setOrderValue,
  profileInfo,
  setLikeds,
  likeds
}) => {
  const [basket, setBasket] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingFirst, setLoadingFirst] = useState(false)
  const [loadingIndex, setLoadingIndex] = useState(false);
  const [creatingMessage, setCreatingMessage] = useState(false)
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [productInfo, setProductInfo] = useState({});
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [customerToken, setCustomerToken] = useState(null)

  const fetchBasket = async (valueOfLoading) => {
    try {
      valueOfLoading == "firstFetch" && setLoadingFirst(true)

      const res = await api.get('/customer/basket')
      setBasket(res.data.items || [])
      valueOfLoading == "firstFetch" && setLoadingFirst(false)
    } catch (error) {
      valueOfLoading == "firstFetch" && setLoadingFirst(false)
    }
  }

  useEffect(() => {
    profileInfo ? (
      fetchBasket("firstFetch")
    ) : setBasket(localStorage.getItem('basketValues') ?
      JSON.parse(localStorage.getItem('basketValues')) : []
    )

  }, [profileInfo])

  const increment = async (index) => {
    try {
      const item = basket[index];
      setLoading(true)
      const res = await api.post(
        "/customer/increase",
        { productId: item._id }
      );

      setBasketValue(res?.data?.count)
      await fetchBasket("increment");
      setLoading(false)
    } catch (error) {
      setResponse({
        message: error.response?.data?.message,
        head: 'Xəta!',
        showAlert: true,
        type: 'error'
      })
      setLoading(false)
    }
  };

  const decrement = async (index) => {
    try {
      const item = basket[index];
      setLoading(true)
      const res = await api.post(
        "/customer/decrease",
        { productId: item._id }
      );

      setBasketValue(res?.data?.count)
      await fetchBasket("decrement");
      setLoading(false)
    } catch (error) {
      setResponse({
        message: error.response?.data?.message,
        head: 'Xəta!',
        showAlert: true,
        type: 'error'
      });
      setLoading(false)
    }
  };

  const totalPrice = basket.reduce(
    (acc, item) => acc + (item.price * (item.quantity || 1)),
    0
  )

  const createOrderInfo = (index, productId) => {
    if (!profileInfo) {
      setShowAuthForm(true);
      return;
    }
    setShowOrderForm(true)
    setProductInfo({
      index: index,
      productId: productId,
      productPrice: basket[index].price * basket[index].quantity
    })
  }

  const createOrder = async (orderData) => {
    setCreatingMessage(true)
    try {

      const item = basket[orderData?.index];

      const payload = {
        productId: item._id,
        productQuantity: item.quantity.toString(),
        orderStatus: "pending",
        orderType: orderData?.orderType,
        orderLocation: orderData?.orderLocation,
        location: orderData?.location,
        orderMonth: orderData?.orderMonth,
        percentageValue: orderData?.percentageValue,
      };

      const res = await api.post(
        "/customer/createOrder",
        payload
      );

      setOrderValue(res?.data?.count);
      try {
        await api.patch(`/customer/updateProductStock/${item._id}`,
          { sellerId: item.sellerId });

        await removeItem(orderData?.productId);

        setResponse({
          message: 'Sifariş uğurla yaradıldı',
          head: 'Uğurlu!',
          api: '',
          isQuestion: false,
          showAlert: true,
          type: 'success'
        });

        setCreatingMessage(false)
        window.location = "/orders/"
      } catch (error) {
        setResponse({
          message: error.response?.data?.message,
          head: 'Xəta!',
          showAlert: true,
          type: 'error'
        });
      }
    } catch (error) {
      setResponse({
        message: error.response?.data?.message,
        head: 'Uğursuz!',
        api: '',
        isQuestion: false,
        showAlert: true,
        type: 'error'
      });
      setCreatingMessage(false)
    }
  };

  const removeItem = async (productId) => {
    try {
      setLoading(true)
      const res = await api.post(
        "/customer/remove",
        { productId }
      );

      setBasketValue(res?.data?.count)
      await fetchBasket("remove");
      setLoading(false)
    } catch (error) {
      setResponse({
        message: error.response?.data?.message,
        head: 'Xəta!',
        showAlert: true,
        type: 'error'
      });
      setLoading(false)
    }
  };


  const checkProductStock = async (item) => {
    try {
      const count = localStorage.getItem('basketValues')
        ? JSON.parse(localStorage.getItem('basketValues'))
          .reduce((sum, e) => e._id === item?._id ? sum + e.quantity : sum, 0)
        : 0;
      await api.post(`/customer/checkProductStock/${item?._id}`, { count: count + 1 })
      callLocalBasket(item, setResponse, true);
      setBasket(localStorage.getItem('basketValues') ?
        JSON.parse(localStorage.getItem('basketValues')) : [])
    } catch (error) {
      setResponse({
        message: error.response?.data?.message,
        head: 'Xəta!',
        showAlert: true,
        type: 'error'
      });
    }
    return;
  }

  if (loadingFirst) return (
    <LoadingCircle />
  );

  return (
    <>
      <Helmet>
        <title>
          {"Səbətim | VNS Electronics"}
        </title>
        <meta
          name="description"
          content={`Səbətdə olan məhsullara baxın.`}
        />
      </Helmet>
      <div className="basket-page">
        <h1>Səbət</h1>
        {basket.length === 0 ? (
          <p className="empty">Səbət boşdur!</p>
        ) : (
          <>
            <div className="basket-items">
              {basket.map((item, index) => (
                <div className="basket-item" key={index}>
                  <div className='basket-image-box'>
                    <img src={item.itemImageList[0].imageUrl} alt={item.itemName} className='basket-img' />
                  </div>
                  {
                    likeds.includes(item._id) ?
                      <FaHeart className="heart-icon" onClick={() => unLiked(item._id, setLikeds)} /> :
                      <FaRegHeart className="heart-icon" onClick={() => addLikeds(item._id, setLikeds)} />
                  }
                  <div className="info">
                    <h3>{item.itemName}</h3>
                    <p>{item.salesCompany}</p>
                    <p>₼ {item.price} | 35 ay: ₼ {((item.price + (item.price * 45) / 100) / 35).toFixed(2)} / ay</p>
                    <p>Ümumi: {(item?.price * item.quantity).toFixed(2)} ₼</p>
                    {/* <p>⭐ {item.rating}</p> */}
                  </div>
                  <div className="actions">
                    {
                      loading && index == loadingIndex ? <LoadingCircle size='30px' /> :
                        <>
                          <div className="quantity">
                            <FiMinus onClick={() => {
                              if (item.quantity > 1) {
                                if (!profileInfo) {
                                  decreaseItem(item);
                                  setBasket(localStorage.getItem('basketValues') ?
                                    JSON.parse(localStorage.getItem('basketValues')) : [])
                                  return;
                                }

                                decrement(index);
                                setLoadingIndex(index)
                              }
                            }} />
                            <span>{item.quantity || 1}</span>
                            <FiPlus onClick={() => {
                              if (!profileInfo) {
                                checkProductStock(item);
                                return;
                              }
                              increment(index);
                              setLoadingIndex(index)
                            }} />
                          </div>
                          <FiTrash2
                            className="trash"
                            onClick={() => {
                              if (!profileInfo) {
                                deleteItem(item);
                                setBasket(localStorage.getItem('basketValues') ?
                                  JSON.parse(localStorage.getItem('basketValues')) : [])
                                return;
                              }
                              removeItem(item._id);
                              setLoadingIndex(index)
                            }}
                          />
                        </>
                    }
                  </div>
                  <button className="checkout" onClick={() => createOrderInfo(index, item._id)}>
                    {
                      creatingMessage ? "Sifariş yaradılır..." : "Sifariş et"
                    }
                  </button>
                </div>
              ))}
            </div>
            <div className="basket-footer">
              <p className="total">Cəmi: ₼ {totalPrice.toFixed(2)}</p>
            </div>
          </>
        )}

        {
          showOrderForm && (
            <OrderForm
              setShowOrderForm={setShowOrderForm}
              setProductInfo={setProductInfo}
              productInfo={productInfo}
              createOrder={createOrder}
              creatingMessage={creatingMessage}
            />
          )
        }

        {
          showAuthForm && (
            <AuthForm setCustomerToken={setCustomerToken} setShowAuthForm={setShowAuthForm} setResponse={setResponse} />
          )
        }
      </div>
    </>
  )
}

export default BasketPage
