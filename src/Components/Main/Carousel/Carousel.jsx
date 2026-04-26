import React from 'react'
import CarouselPart from './CarouselPart/CarouselPart'
import MostSellingPart from './MostSellingPart/MostSellingPart'
import './Carousel.css'

const Carousel = ({ likeds, setLikeds, profileInfo }) => {
  return (
    <div className='carousel-main'>
      <CarouselPart />
      <MostSellingPart setLikeds={setLikeds} likeds={likeds} profileInfo={profileInfo} />
    </div>
  )
}

export default Carousel