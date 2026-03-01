import React from 'react'
import Navbar from '../Navbar/Navbar'
import Main from '../Main/Main'
import { Route, Routes } from 'react-router-dom'
import CategoryItem from '../Main/Categories/CategoryItem'
import Basket from '../Main/Categories/Basket'
import CategoryElements from '../Main/Categories/CategoryElements'
import ProductOrder from '../Main/Categories/ProductOrder/ProductOrder'
import SearchAll from '../Navbar/SearchAll'
import { FaWhatsapp } from "react-icons/fa";

const Body = ({
  response, setResponse,
  basketValue, setBasketValue,
  orderValue, setOrderValue,
  searchData, setSearchData,
  setCategoriesForNav, categoriesForNav,
  setProfileInfo, profileInfo
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
        categoriesForNav={categoriesForNav}
        setCategoriesForNav={setCategoriesForNav}
        setResponse={setResponse}
        setProfileInfo={setProfileInfo}
        profileInfo={profileInfo}
      />

      <Routes>
        <Route path="/" element={<Main categoriesForNav={categoriesForNav} />} />

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
              profileInfo={profileInfo}
            />
          }
        />

        <Route path='/basket' element={<Basket
          setResponse={setResponse}
          setBasketValue={setBasketValue}
          setOrderValue={setOrderValue}
          profileInfo={profileInfo}
        />} />

        <Route path='/orders' element={<ProductOrder profileInfo={profileInfo}/>} />

        <Route path='/search' element={<SearchAll searchData={searchData} />} />

      </Routes>


      <div className="whatsapp-wrapper">
        <button
          className="whatsapp-btn"
          onClick={() => setProfileInfo(null)}
        >
          <a
            href="https://wa.me/994558781998"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-link"
          >
            <FaWhatsapp className="whatsapp-icon" />
          </a>
        </button>
      </div>
    </div>
  )
}

export default Body