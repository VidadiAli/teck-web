import React, { useEffect, useState } from 'react'
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi'
import './Basket.css'
import api from '../../../api'
import OrderForm from './ProductOrder/OrderForm'

const BasketPage = ({
  setResponse,
  setBasketValue,
  setOrderValue
}) => {
  const [basket, setBasket] = useState([])
  const [loading, setLoading] = useState(false)
  const [creatingMessage, setCreatingMessage] = useState(false)
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [productInfo, setProductInfo] = useState({})

  // Basket-i backend-dən çəkmək
  const fetchBasket = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('customerAccessToken')
      if (!token) return

      const res = await api.get('/basket', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setBasket(res.data.items || [])
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  useEffect(() => {
    fetchBasket();
  }, [])

  const increment = async (index) => {
    try {
      const item = basket[index];
      const token = localStorage.getItem("customerAccessToken");
      if (!token) return;

      const res = await api.post(
        "/basket/increase",
        { productId: item._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBasketValue(res?.data?.count)
      // backenddən gələn count əsasında update et
      fetchBasket(); // basket-i backenddən təzədən çəkmək
    } catch (error) {
      console.error(error);
    }
  };

  const decrement = async (index) => {
    try {
      const item = basket[index];
      const token = localStorage.getItem("customerAccessToken");
      if (!token) return;

      const res = await api.post(
        "/basket/decrease",
        { productId: item._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBasketValue(res?.data?.count)
      fetchBasket();
    } catch (error) {
      console.error(error);
    }
  };

  const totalPrice = basket.reduce(
    (acc, item) => acc + (item.price * (item.quantity || 1)),
    0
  )

  const createOrderInfo = (index, productId) => {
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
      const token = localStorage.getItem("customerAccessToken");
      if (!token) return;

      const item = basket[orderData?.index];

      const payload = {
        productId: item._id,
        orderStatus: "pending",
        orderType: orderData?.orderType,
        orderLocation: orderData?.orderLocation,
        location: orderData?.location,
        orderMonth: orderData?.orderMonth,
        percentageValue: orderData?.percentageValue,
      };

      const res = await api.post(
        "/orders/createOrder",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrderValue(res?.data?.count);
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
      window.location = "/teck-web/orders/"

    } catch (error) {
      console.error(error);
      setResponse({
        message: 'Sifariş yaradılmadı',
        head: 'Uğursuz!',
        api: '',
        isQuestion: false,
        showAlert: true,
        type: 'error'
      });
      setCreatingMessage(false)
    }
  };


  basket.map((item) => (
    <div key={item._id}>
      <p>{item.itemName}</p>
      <button onClick={() => createOrder(item._id)}>Order et</button>
    </div>
  ));

  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("customerAccessToken");
      if (!token) return;

      const res = await api.post(
        "/basket/remove",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBasketValue(res?.data?.count)
      fetchBasket(); // basket-i backend-dən yenidən çək
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return (
    <>
      <h1>Səbət</h1>
      <p className="empty">Yüklənir...</p></>
  );

  return (
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
                  <img src={item.itemImage} alt={item.itemName} className='basket-img'/>
                </div>
                <div className="info">
                  <h3>{item.itemName}</h3>
                  <p>{item.salesCompany}</p>
                  <p>₼ {item.price} | 35 ay: ₼ {((item.price + (item.price * 45) / 100) / 35).toFixed(2)} / ay</p>
                  <p>⭐ {item.rating}</p>
                </div>
                <div className="actions">
                  <div className="quantity">
                    <FiMinus onClick={() => decrement(index)} />
                    <span>{item.quantity || 1}</span>
                    <FiPlus onClick={() => increment(index)} />
                  </div>
                  <FiTrash2
                    className="trash"
                    onClick={() => removeItem(item._id)}
                  />
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
    </div>
  )
}

export default BasketPage
