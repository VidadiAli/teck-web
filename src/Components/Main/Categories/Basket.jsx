import React, { useEffect, useState } from 'react'
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi'
import './Basket.css'
import axios from 'axios'

const BasketPage = () => {
  const [basket, setBasket] = useState([]);

  const createRequest = async () => {
    try {
      basket.forEach(async (item) => {
        const req = await axios.post('https://teck-web-back.onrender.com/api/users/createItemStatus',
          {
            ...item,
            productStatus: 1,
            quantity: item?.quantity ? item?.quantity : 1
          })
        console.log(req)
      })
      localStorage.setItem('basket', JSON.stringify([]))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const stored = localStorage.getItem('basket')
    setBasket(stored ? JSON.parse(stored) : [])
  }, [])

  const updateBasket = (newBasket) => {
    setBasket(newBasket)
    localStorage.setItem('basket', JSON.stringify(newBasket))
  }

  const increment = (index) => {
    const newBasket = [...basket]
    newBasket[index].quantity = (newBasket[index].quantity || 1) + 1
    updateBasket(newBasket)
  }

  const decrement = (index) => {
    const newBasket = [...basket]
    if (newBasket[index].quantity > 1) {
      newBasket[index].quantity -= 1
      updateBasket(newBasket)
    }
  }

  const removeItem = (index) => {
    const newBasket = [...basket]
    newBasket.splice(index, 1)
    updateBasket(newBasket)
  }

  const totalPrice = basket.reduce(
    (acc, item) => acc + (item.price * (item.quantity || 1)),
    0
  )

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
                  <FiTrash2 className="trash" onClick={() => removeItem(index)} />
                </div>
              </div>
            ))}
          </div>
          <div className="basket-footer">
            <p className="total">Cəmi: ${totalPrice.toFixed(2)}</p>
            <button className="checkout" onClick={createRequest}>Sifariş et</button>
          </div>
        </>
      )}
    </div>
  )
}

export default BasketPage
