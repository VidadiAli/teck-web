import React from 'react'
import Carousel from './Carousel/Carousel'
import CategoryGrid from './Categories/CategoryGrid'

const Main = ({ categoriesForNav }) => {
  return (
    <div>
      <Carousel />
      <CategoryGrid categoriesForNav={categoriesForNav} />
    </div>
  )
}

export default Main