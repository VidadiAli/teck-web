import React from 'react'
import Carousel from './Carousel/Carousel'
import CategoryGrid from './Categories/CategoryGrid'

const Main = () => {
  return (
    <div>
      <Carousel />
      <CategoryGrid valueOfProducts={"all"} />
    </div>
  )
}

export default Main