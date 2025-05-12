import { Card, Carousel, Flex } from "antd";
import { assets } from "../assets/assets.js";
import '../styles/carousel.css'

const carouselData = [
    {
        id: 1,
        imgSrc: assets.hero_img,
        tagline: 'LATEST COLLECTION',
        headline: 'Brand New!!!',
        action: 'SHOP NOW',
    },
    {
        id: 2,
        imgSrc: assets.hero_img2,
        tagline: 'OUR BESTSELLERS',
        headline: 'Best Of Best',
        action: 'GRAB IT',
    },
    {
        id: 3,
        imgSrc: assets.hero_img3,
        tagline: 'FLASH SALE',
        headline: 'Daily Basics',
        action: 'LETS GO',
    },
];

const CarouselDisplay = () => {
    return (
        <Carousel infinite={true} autoplay={{ dotDuration: true }} speed={4000} autoplaySpeed={5000}>
            {carouselData.map((item, index) => (
                <div key={item.id} className="carousel-content">
                    <Card hoverable className="carousel-card">
                        <Flex justify="space-between" align="center">
                            <img src={item.imgSrc} className="carousel-image curved-card" alt={`Carousel img ${index}`} />
                            <Flex vertical justify="space-between" align="center" className="text-content">
                                <div className="text-[#414141]">
                                    <div className="flex items-center gap-1">
                                        <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                                        <p className="font-medium text-sm md:text-base">{item.tagline}</p>
                                    </div>
                                    <h1 className="prata-regular text-3xl leading-relaxed">{item.headline}</h1>
                                    <div className="flex items-center gap-1">
                                        <p className="font-semibold text-sm">{item.action}</p>
                                        <p className="w-8 h-[1px] bg-[#414141]"></p>
                                    </div>
                                </div>
                            </Flex>
                        </Flex>
                    </Card>
                </div>
            ))}
        </Carousel>
    )
}

export default CarouselDisplay