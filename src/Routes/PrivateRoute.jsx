import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Login from '../Pages/Auth/Login';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    // console.log(location)
    if(loading) {
        return <span className="loading loading-infinity loading-lg"></span>
    }
    if(!user) {
        return <Navigate state={location.pathname} to={'/Login'}></Navigate>
    }
    return children;
};

export default PrivateRoute;