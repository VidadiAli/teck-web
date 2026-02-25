import React from 'react'
import Navbar from '../Navbar/Navbar'
import Main from '../Main/Main'
import { Route, Routes } from 'react-router-dom'
import CategoryItem from '../Main/Categories/CategoryItem'
import Basket from '../Main/Categories/Basket'
import CategoryElements from '../Main/Categories/CategoryElements'
import ProductOrder from '../Main/Categories/ProductOrder/ProductOrder'
import SearchAll from '../Navbar/SearchAll'

const Body = ({
  response, setResponse,
  basketValue, setBasketValue,
  orderValue, setOrderValue,
  searchData, setSearchData
}) => {
  return (
    <div>
      <Navbar
        basketValue={basketValue}
        setBasketValue={setBasketValue}
        orderValue={orderValue}
        setOrderValue={setOrderValue}
        searchData={searchData}
        setSearchData={setSearchData}
      />

      <Routes>
        <Route path="/" element={<Main />} />

        <Route
          path="/category/:categoryId"
          element={<CategoryElements />}
        />

        <Route
          path="/product/:productId"
          element={
            <CategoryItem
              setResponse={setResponse}
              setBasketValue={setBasketValue}
            />
          }
        />

        <Route path='/basket' element={<Basket
          setResponse={setResponse}
          setBasketValue={setBasketValue}
          setOrderValue={setOrderValue}
        />} />

        <Route path='/orders' element={<ProductOrder />} />

        <Route path='/search' element={<SearchAll searchData={searchData} />} />

      </Routes>
    </div>
  )
}

export default Body