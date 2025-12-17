import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import image1 from '../../assets/banner/banner1.png'
import image2 from '../../assets/banner/banner2.png'
import image3 from '../../assets/banner/banner3.png'

const Banner = () => {
    return (
        <Carousel 
        autoPlay={true}
        infiniteLoop={true}
        stopOnHover={false}
        interval={3000}
        className='mt-12'
        >
            <div>
                <img src={image1} />
            </div>
            <div>
                <img src={image2} />
            </div>
            <div>
                <img src={image3} />
            </div>
        </Carousel>
    );
};

export default Banner;