// import React from 'react'

import BestSeller from "../components/BestSeller"
import Carousel from "../components/CarouselDisplay"
import LatestCollections from "../components/LatestCollections"
import OurPolicy from "../components/OurPolicy"

const Home = () => {
  return (
    <div>
      <Carousel />
      <LatestCollections />
      <BestSeller />
      <OurPolicy />
    </div>
  )
}

export default Home