import React, { useState } from 'react'
import Body from './Components/Body/Body'
import Alerts from './Components/Alerts/Alert';
import './App.css'
import { useEffect } from 'react';
import api from './api';

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
  const [orderValue, setOrderValue] = useState(0);
  const [searchData, setSearchData] = useState([]);
  const [categoriesForNav, setCategoriesForNav] = useState([])
  const [profileInfo, setProfileInfo] = useState(null)
  const [closeSearch, setCloseSearch] = useState(false);
  const [likeds, setLikeds] = useState([])

  const callLikeds = async () => {
    try {
      const res = await api.get('/customer/getLikeds');
      const ids = res.data.map(item => item.product)
      setLikeds([...ids])
    } catch (error) {
      return null;
    }
  }

  useEffect(() => {
    callLikeds();
  }, []);

  return (
    <div>
      <Body
        response={response}
        setResponse={setResponse}
        basketValue={basketValue}
        setBasketValue={setBasketValue}
        orderValue={orderValue}
        setOrderValue={setOrderValue}
        searchData={searchData}
        setSearchData={setSearchData}
        categoriesForNav={categoriesForNav}
        setCategoriesForNav={setCategoriesForNav}
        profileInfo={profileInfo}
        setProfileInfo={setProfileInfo}
        closeSearch={closeSearch}
        setCloseSearch={setCloseSearch}
        likeds={likeds}
        setLikeds={setLikeds} />
      {
        response?.showAlert && (
          <Alerts response={response} setResponse={setResponse} />
        )
      }
    </div>
  )
}

export default App