import React from 'react'
import Carousel from './Carousel/Carousel'
import CategoryGrid from './Categories/CategoryGrid'

const Main = ({ categoriesForNav, likeds, setLikeds }) => {
  return (
    <div>
      <Carousel setLikeds={setLikeds} likeds={likeds}/>
      <CategoryGrid categoriesForNav={categoriesForNav} setLikeds={setLikeds} likeds={likeds} />
    </div>
  )
}

export default Main