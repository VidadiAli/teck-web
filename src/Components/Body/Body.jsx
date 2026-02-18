import React from 'react'
import Navbar from '../Navbar/Navbar'
import Main from '../Main/Main'
import { Route, Routes } from 'react-router-dom'
import CategoryItem from '../Main/Categories/CategoryItem'
import Basket from '../Main/Categories/Basket'
import CategoryElements from '../Main/Categories/CategoryElements'
import ProductOrder from '../Main/Categories/ProductOrder/ProductOrder'

const Body = ({
  response, setResponse
}) => {
  return (
    <div>
      <Navbar />
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
            />
          }
        />

        <Route path='/basket' element={<Basket setResponse={setResponse}/>} />
        <Route path='/orders' element={<ProductOrder />} />
      </Routes>
    </div>
  )
}

export default Body