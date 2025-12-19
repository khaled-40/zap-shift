import React from 'react';
import Logo from '../Components/Logo';
import { Outlet } from 'react-router';
import authImage from '../assets/authImage.png'

const AuthLayout = () => {
    return (
        <div className='max-w-11/12 mx-auto pt-10'>
            <Logo></Logo>
            <div className='flex justify-evenly gap-5 items-center'>
                <div>
                    <Outlet></Outlet>
                </div>
                <div className='hidden md:block'>
                    <img src={authImage} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;