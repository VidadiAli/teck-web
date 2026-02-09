import React from 'react'
import Navbar from '../Navbar/Navbar'
import Main from '../Main/Main'
import { Route, Routes } from 'react-router-dom'
import CategoryGrid from '../Main/Categories/CategoryGrid'
import CategoryItem from '../Main/Categories/CategoryItem'

const Body = () => {
  return (
    <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/notebook' element={<CategoryGrid valueOfProducts={'notebook'} />} />
          <Route path='/telefon' element={<CategoryGrid valueOfProducts={'telefon'} />} />
          <Route path='/televizor' element={<CategoryGrid valueOfProducts={'televizor'} />} />
          <Route path='/soyuducu' element={<CategoryGrid valueOfProducts={'soyuducu'} />} />
          <Route path='/paltaryuyan' element={<CategoryGrid valueOfProducts={'paltaryuyan'} />} />
          <Route path='/category-item/:itemId' element={<CategoryItem />}/>
        </Routes>
    </div>
  )
}

export default Body