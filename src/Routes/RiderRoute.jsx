import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../Components/Loading';
import Forbidden from '../Components/Forbidden';

const RiderRoute = ({children}) => {
    const { loading ,user} = useAuth();
    const { role, roleLoading } = useRole();

    if(loading || !user || roleLoading) {
        return <Loading></Loading>
    }

    if(role.role !== 'rider') {
        return <Forbidden></Forbidden>
    }
    return children;
};

export default RiderRoute;