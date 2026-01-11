import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const CompletedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels', user?.email, 'delivered'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?deliveryStatus=delivered`);
            console.log(res.data)
            return res.data;
        }
    })
    const calculatePayout = parcel => {
        if (parcel.senderDistrict === parcel.recieverDistrict) {
            return parcel.cost * 0.8;
        }
        else {
            return parcel.cost * 0.6
        }
    }
    return (
        <div>
            <h2>Completed Deliveries: {parcels.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL NO</th>
                            <th>Name</th>
                            <th>Tracking ID</th>
                            <th>Sender District</th>
                            <th>Cost</th>
                            <th>Payout</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.trackingId}</td>
                                <td>{parcel.senderDistrict}</td>
                                <td>${parcel.cost}</td>
                                <td>${calculatePayout(parcel)}</td>
                                <td>
                                    <button

                                        className='btn btn-primary text-black'>
                                        Cash Out
                                    </button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompletedDeliveries;