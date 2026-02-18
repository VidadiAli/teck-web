import React, { useEffect, useState } from 'react'
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi'
import './Basket.css'
import api from '../../../api'

const BasketPage = ({ setResponse }) => {
  const [basket, setBasket] = useState([])

  // Basket-i backend-dən çəkmək
  const fetchBasket = async () => {
    try {
      const token = localStorage.getItem('customerAccessToken')
      if (!token) return

      const res = await api.get('/basket', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setBasket(res.data.items || [])
      console.log(res.data)

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchBasket()
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

      fetchBasket();
    } catch (error) {
      console.error(error);
    }
  };

  const totalPrice = basket.reduce(
    (acc, item) => acc + (item.price * (item.quantity || 1)),
    0
  )

  const createOrder = async (index) => {
    try {
      const token = localStorage.getItem("customerAccessToken");
      if (!token) return;


      const item = basket[index];

      const payload = {
        productId: item._id,
        orderStatus: "pending"
      };

      const res = await api.post(
        "/orders/createOrder",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Yeni order yaradıldı:", res.data);
      setResponse({
        message: 'Sifariş uğurla yaradıldı',
        head: 'Uğurlu!',
        api: '',
        isQuestion: false,
        showAlert: true,
        type: 'success'
      });

    } catch (error) {
      console.error(error);
      alert("Sifariş yaradılmadı!");
    }
  };


  // Basketdə hər məhsul üçün düymə
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

      await api.post(
        "/basket/remove",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchBasket(); // basket-i backend-dən yenidən çək
    } catch (error) {
      console.error(error);
    }
  };

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
                <img src={item.itemImage} alt={item.itemName} />
                <div className="info">
                  <h3>{item.itemName}</h3>
                  <p>{item.salesCompany}</p>
                  <p>${item.price} | 18 ay: ${(item.price / 18).toFixed(2)} / ay</p>
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
                <button className="checkout" onClick={() => createOrder(index)}>Sifariş et</button>
              </div>
            ))}
          </div>
          <div className="basket-footer">
            <p className="total">Cəmi: ${totalPrice.toFixed(2)}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default BasketPage
