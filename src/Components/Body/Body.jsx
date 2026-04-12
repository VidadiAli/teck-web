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
import Liked from '../Main/Liked/Liked'
import Footer from '../Footer/Footer'
import CategoryGrid from '../Main/Categories/CategoryGrid'
import { useState } from 'react'

const Body = ({
  response, setResponse,
  basketValue, setBasketValue,
  orderValue, setOrderValue,
  searchData, setSearchData,
  setCategoriesForNav, categoriesForNav,
  setProfileInfo, profileInfo,
  closeSearch, setCloseSearch,
  likeds, setLikeds,
  totalSearchPages,
  setTotalSearchPages,
  searchPage,
  setSearchPage,
  searchLoading,
  setSearchLoading
}) => {
  return (
    <div style={{ padding: '0px' }}>
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
        closeSearch={closeSearch}
        setCloseSearch={setCloseSearch}
        setTotalSearchPages={setTotalSearchPages}
        searchPage={searchPage}
        setSearchPage={setSearchPage}
        setSearchLoading={setSearchLoading}
      />

      <Routes>
        <Route path="/" element={<Main
          categoriesForNav={categoriesForNav}
          likeds={likeds} setLikeds={setLikeds}
          setResponse={setResponse}
          setBasketValue={setBasketValue}
          profileInfo={profileInfo} />} />

        <Route
          path="/category/:slug/:categoryId"
          element={<CategoryElements
            likeds={likeds} setLikeds={setLikeds}
            setResponse={setResponse}
            setBasketValue={setBasketValue}
            profileInfo={profileInfo} />}
        />

        <Route path='/likeds' element={<Liked />} />

        <Route
          path="/product/:slug/:productId"
          element={
            <CategoryItem
              setResponse={setResponse}
              setBasketValue={setBasketValue}
              profileInfo={profileInfo}
              categoriesForNav={categoriesForNav}
              likeds={likeds}
              setLikeds={setLikeds}
            />
          }
        />

        <Route path='/basket' element={<Basket
          setResponse={setResponse}
          setBasketValue={setBasketValue}
          setOrderValue={setOrderValue}
          profileInfo={profileInfo}
          setLikeds={setLikeds}
          likeds={likeds}
        />} />

        <Route path='/orders' element={<ProductOrder profileInfo={profileInfo} />} />

        <Route path='/search' element={<SearchAll
          searchData={searchData}
          searchPage={searchPage}
          setSearchPage={setSearchPage}
          totalSearchPages={totalSearchPages}
          searchLoading={searchLoading}
        />} />


        <Route path='/products' element={<CategoryGrid
          categoriesForNav={categoriesForNav}
          setLikeds={setLikeds}
          likeds={likeds}
          setResponse={setResponse}
          setBasketValue={setBasketValue}
          profileInfo={profileInfo} />}
        />

      </Routes>

      <Footer />

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