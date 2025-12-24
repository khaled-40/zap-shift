import React from 'react';
import Banner from './Banner';
import Brands from './Brands';
import Reviews from './Reviews';

const reviewPromise = fetch('/reviews.json').then(res => res.json());
const Home = () => {
    // console.log(reviewPromise)
    return (
        <div>
           <Banner></Banner>
           <Brands></Brands>
           <Reviews reviewPromise={reviewPromise}></Reviews>
        </div>
    );
};

export default Home;