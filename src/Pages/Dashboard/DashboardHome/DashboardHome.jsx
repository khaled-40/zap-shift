import React from 'react';
import useRole from '../../../hooks/useRole';
import DashboardUserHome from './DashboardUserHome';
import DashboardRiderHome from './DashboardRiderHome';
import DashboardAdminHome from './DashboardAdminHome';

const DashboardHome = () => {
    const {role} = useRole();
    // console.log(role.role, 'home')
    if(role.role ==='user') {
        return <DashboardUserHome></DashboardUserHome>
    }
    else if(role.role ==='rider') {
        return <DashboardRiderHome></DashboardRiderHome>
    }
    if(role.role ==='admin') {
        return <DashboardAdminHome></DashboardAdminHome>
    }
};

export default DashboardHome;