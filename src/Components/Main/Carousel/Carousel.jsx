import React from 'react'
import CarouselPart from './CarouselPart/CarouselPart'
import MostSellingPart from './MostSellingPart/MostSellingPart'
import './Carousel.css'

const Carousel = () => {
  return (
    <div className='carousel-main'>
        <CarouselPart />
        <MostSellingPart />
    </div>
  )
}

export default Carousel