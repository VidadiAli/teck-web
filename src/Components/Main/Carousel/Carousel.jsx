import React from 'react'
import CarouselPart from './CarouselPart/CarouselPart'
import MostSellingPart from './MostSellingPart/MostSellingPart'
import './Carousel.css'

const Carousel = ({ likeds, setLikeds }) => {
  return (
    <div className='carousel-main'>
      <CarouselPart />
      <MostSellingPart setLikeds={setLikeds} likeds={likeds} />
    </div>
  )
}

export default Carousel