import React from 'react';
import Logo from '../Components/Logo';
import { Outlet } from 'react-router';
import authImage from '../assets/authImage.png'

const AuthLayout = () => {
    return (
        <div className='pt-8'>
            <Logo></Logo>
            <div className='max-w-10/12 mx-auto flex justify-center gap-5 items-center pt-5'>
                <div>
                    <Outlet></Outlet>
                </div>
                <div className='hidden md:block w-1/2'>
                    <img src={authImage} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;