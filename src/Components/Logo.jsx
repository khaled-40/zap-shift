import React from 'react';
import logo from '../assets/logo.png'

const Logo = () => {
    return (
        <div className='flex items-end'>
            <img src={logo} alt="" />
            <h2 className='text-3xl font-bold -ml-2.5'>zapShift</h2>
        </div>
    );
};

export default Logo;