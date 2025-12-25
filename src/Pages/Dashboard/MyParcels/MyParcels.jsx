import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyParcels = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: parcels=[]} = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        }
    })
    console.log(parcels)
    return (
        <div>
            <h2>This is my parcels{parcels.length}</h2>
        </div>
    );
};

export default MyParcels;