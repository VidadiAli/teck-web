import React, { useState } from 'react'
import Body from './Components/Body/Body'
import Alerts from './Components/Alerts/Alert';

const App = () => {

  const [response, setResponse] = useState({
    message: '',
    head: '',
    api: '',
    isQuestion: false,
    showAlert: false,
    type: ''
  });

  const getBasketLength = () => {
    const basket = localStorage.getItem("basket");
    if (!basket) return 0;

    try {
      const parsed = JSON.parse(basket);
      return Array.isArray(parsed) ? parsed.length : 0;
    } catch (e) {
      console.error("Basket parsing error:", e);
      return 0;
    }
  };

  const [basketValue, setBasketValue] = useState(getBasketLength());

  return (
    <div>
      <Body
        response={response}
        setResponse={setResponse}
        basketValue={basketValue}
        setBasketValue={setBasketValue} />
      {
        response?.showAlert && (
          <Alerts response={response} setResponse={setResponse} />
        )
      }
    </div>
  )
}

export default App