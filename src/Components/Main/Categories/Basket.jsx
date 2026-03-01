import React, { useEffect, useState } from 'react'
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi'
import './Basket.css'
import api from '../../../api'
import OrderForm from './ProductOrder/OrderForm'
import LoadingCircle from '../../Loading/LoadingCircle'

const BasketPage = ({
  setResponse,
  setBasketValue,
  setOrderValue,
  profileInfo
}) => {
  const [basket, setBasket] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingFirst, setLoadingFirst] = useState(false)
  const [creatingMessage, setCreatingMessage] = useState(false)
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [productInfo, setProductInfo] = useState({})

  const fetchBasket = async (valueOfLoading) => {
    try {
      valueOfLoading == "firstFetch" && setLoadingFirst(true)

      const res = await api.get('/customer/basket')
      setBasket(res.data.items || [])
      valueOfLoading == "firstFetch" && setLoadingFirst(false)
    } catch (error) {
      valueOfLoading == "firstFetch" && setLoadingFirst(false)
      console.error(error)
    }
  }

  useEffect(() => {
    profileInfo && (
      fetchBasket("firstFetch")
    );
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
      console.error(error);
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
      console.error(error);
      setLoading(false)
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
        "/customer/createOrder",
        payload
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
      window.location = "/orders/"

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


  // basket.map((item) => (
  //   <div key={item._id}>
  //     <p>{item.itemName}</p>
  //     <button onClick={() => createOrder(item._id)}>Order et</button>
  //   </div>
  // ));

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
      console.error(error);
      setLoading(false)
    }
  };

  if (loadingFirst) return (
    <LoadingCircle />
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
                  <img src={item.itemImage} alt={item.itemName} className='basket-img' />
                </div>
                <div className="info">
                  <h3>{item.itemName}</h3>
                  <p>{item.salesCompany}</p>
                  <p>₼ {item.price} | 35 ay: ₼ {((item.price + (item.price * 45) / 100) / 35).toFixed(2)} / ay</p>
                  <p>⭐ {item.rating}</p>
                </div>
                <div className="actions">
                  {
                    loading ? <LoadingCircle size='30px' /> :
                      <>
                        <div className="quantity">
                          <FiMinus onClick={() => decrement(index)} />
                          <span>{item.quantity || 1}</span>
                          <FiPlus onClick={() => increment(index)} />
                        </div>
                        <FiTrash2
                          className="trash"
                          onClick={() => removeItem(item._id)}
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
    </div>
  )
}

export default BasketPage
