import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const AssignedTasks = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user?.email, 'driver_assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?deliveryStatus=driver_assigned`);
            console.log(res.data)
            return res.data;
        }
    })
    const handleAcceptTask = parcel => {
        const statusInfo = { deliveryStatus: 'in_transit' };
        axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Thank you for accepting`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }
    const handleDeliveryStatusUpdate = (parcel, status) => {
        const statusInfo = { deliveryStatus: status };
        axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Parcel has been successfully ${status}`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

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
                            <th>Actions</th>
                            <th>Confirmation</th>
                            <th>Delivery Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>
                                    {
                                        parcel.deliveryStatus === 'driver_assigned' && <>
                                            <button onClick={() => handleAcceptTask(parcel)} className='btn btn-primary text-black'>Accept</button>
                                            <button className='btn btn-warning ml-2'>Reject</button>
                                        </>

                                    }

                                    {
                                        parcel.deliveryStatus === 'in_transit' && <button
                                            onClick={() => handleDeliveryStatusUpdate(parcel, 'picked_up')}
                                            className='btn btn-primary text-black'>Picked Up</button>
                                    }
                                    {
                                        parcel.deliveryStatus === 'picked_up' && <button
                                            onClick={() => handleDeliveryStatusUpdate(parcel, 'delivered')}
                                            className='btn btn-primary text-black'>Delivered</button>
                                    }
                                </td>
                                <td>
                                    {
                                        parcel.deliveryStatus === 'in_transit' && <button className='badge badge-success'>Accepted</button>
                                    }
                                    {
                                        parcel.deliveryStatus === 'picked_up' && <button className='badge badge-success'>Picked_UP</button>
                                    }
                                    {
                                        parcel.deliveryStatus === 'delivered' && <button className='badge badge-success'>Delivered</button>
                                    }
                                </td>

                                <td>{parcel.deliveryStatus}</td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedTasks;