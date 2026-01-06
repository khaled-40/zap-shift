import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';

const AssignedTasks = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels', user?.email, 'driver_assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?deliveryStatus=driver_assigned`);
            console.log(res.data)
            return res.data;
        }
    })
    console.log(parcels)
    return (
        <div>
            <h2 className='text-4xl font-bold'>Assigned tasks: {parcels.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL NO</th>
                            <th>Name</th>
                            <th>Confirmation</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) =><tr key={parcel._id}>
                            <th>{index+1}</th>
                            <td>{parcel.parcelName}</td>
                            <td>
                                <button className='btn btn-primary text-black'>Accept</button>
                                <button className='btn btn-warning ml-2'>Reject</button>
                            </td>
                            <td>Blue</td>
                        </tr>)
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedTasks;