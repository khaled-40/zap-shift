import React from 'react';
import Logo from '../../Components/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const {user,logOut} = useAuth();
    const links = <>
    <li><NavLink>Services</NavLink></li>
    {
        user && <li><NavLink to={'/dashboard/my-parcels'}>Dashboard</NavLink></li>
    }
    <li><NavLink to={'/send-parcel'}>Send Parcel</NavLink></li>
    <li><NavLink to={'/coverage'}>Coverage</NavLink></li>
    
    </>
    const handleLogOut = () => {
        logOut()
        .then(result => {
            console.log(result)
            console.log("hoise")
        })
        .catch(error => {
            console.log(error)
        })
    }
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <span className="btn btn-ghost text-xl">
                    <Logo></Logo>
                </span>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user? <div className='flex gap-4 items-center'>
                        <a onClick={handleLogOut} className='btn bg-primary text-black'>Log Out</a>
                        <Link to={'/beARider'} className='btn  btn-primary text-black'>Be A Rider</Link>
                    </div>
                    :<div className='space-x-2'>
                    <Link to={'/login'} className='btn border-gray-400'>Sign In</Link>
                    <Link to={'/register'} className='btn btn-primary text-black'>Sign Up</Link>
                    </div>
                }
            </div>
        </div>
    );
};

export default Navbar;