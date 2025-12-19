import React from 'react';
import Navbar from '../Pages/Shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='max-w-7xl mx-auto'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;