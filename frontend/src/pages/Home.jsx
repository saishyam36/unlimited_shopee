// import React from 'react'

import BestSeller from "../components/BestSeller"
import Carousel from "../components/CarouselDisplay"
import LatestCollections from "../components/LatestCollections"

const Home = () => {
  return (
    <div>
      <Carousel />
      <LatestCollections />
      <BestSeller />
    </div>
  )
}

export default Home