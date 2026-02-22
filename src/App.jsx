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


  const [basketValue, setBasketValue] = useState(0)
  const [orderValue, setOrderValue] = useState(0)

  return (
    <div>
      <Body
        response={response}
        setResponse={setResponse}
        basketValue={basketValue}
        setBasketValue={setBasketValue}
        orderValue={orderValue}
        setOrderValue={setOrderValue} />
      {
        response?.showAlert && (
          <Alerts response={response} setResponse={setResponse} />
        )
      }
    </div>
  )
}

export default App