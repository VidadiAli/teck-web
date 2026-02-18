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


  return (
    <div>
      <Body
        response={response}
        setResponse={setResponse} />
      {
        response?.showAlert && (
          <Alerts response={response} setResponse={setResponse} />
        )
      }
    </div>
  )
}

export default App