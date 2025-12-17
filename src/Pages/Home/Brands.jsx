import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import amazon from '../../assets/brands/amazon.png'
import casio from '../../assets/brands/casio.png'
import moonstar from '../../assets/brands/moonstar.png'
import randstad from '../../assets/brands/randstad.png'
import star from '../../assets/brands/star.png'
import people from '../../assets/brands/start_people.png'
import { Autoplay } from 'swiper/modules';

const brands = [amazon, casio, moonstar, randstad, star, people];
const loopBrands = [...brands, ...brands]

const Brands = () => {
    return (
        <Swiper
            loop={true}
            slidesPerView={4}
            centeredSlides={true}
            spaceBetween={30}
            grabCursor={true}
            modules={[Autoplay]}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
        >
            {
                loopBrands.map((brand,index) => (
                    <SwiperSlide key={index}>
                        <img src={brand} alt="" />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
};

export default Brands;