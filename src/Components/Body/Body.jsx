import React from 'react'
import Navbar from '../Navbar/Navbar'
import Main from '../Main/Main'
import { Route, Routes } from 'react-router-dom'
import CategoryGrid from '../Main/Categories/CategoryGrid'

const Body = () => {
  return (
    <div>
        <Navbar />
        <Routes>
          <Route path='/teck-web/' element={<Main />}/>
          <Route path='/teck-web/notebook' element={<CategoryGrid valueOfProducts={'notebook'} />} />
          <Route path='/teck-web/telefon' element={<CategoryGrid valueOfProducts={'telefon'} />} />
          <Route path='/teck-web/televizor' element={<CategoryGrid valueOfProducts={'televizor'} />} />
          <Route path='/teck-web/soyuducu' element={<CategoryGrid valueOfProducts={'soyuducu'} />} />
          <Route path='/teck-web/paltaryuyan' element={<CategoryGrid valueOfProducts={'paltaryuyan'} />} />
        </Routes>
    </div>
  )
}

export default Body