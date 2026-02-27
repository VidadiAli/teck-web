import React from 'react'
import Carousel from './Carousel/Carousel'
import CategoryGrid from './Categories/CategoryGrid'

const Main = ({ setCategoriesForNav }) => {
  return (
    <div>
      <Carousel />
      <CategoryGrid setCategoriesForNav={setCategoriesForNav} />
    </div>
  )
}

export default Main