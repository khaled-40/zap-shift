import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyParcels = () => {
    const [checkoutUrl, setCheckoutUrl] = useState(null);
    const { user } = useAuth();
    // console.log(user.email)
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            console.log(res.data)
            return res.data;
        }
    })
    // console.log(parcels)
    const handleDeleteParcel = id => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        console.log(res);
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your parcel request has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }

    const handlePayment = async (parcel) => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName
        };
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        console.log(res.data);
        setCheckoutUrl(res.data.url);
    }

    useEffect(() => {
        refetch();
        if (checkoutUrl) {
            window.location.assign(checkoutUrl);
        }
    }, [checkoutUrl,refetch]);

    return (
        <div>
            <h2>This is my parcels{parcels.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL No</th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Delivery Status</th>
                            <th>Tracking ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.cost}</td>
                                <td>
                                    {
                                        parcel.paymentStatus === 'paid' ?
                                            <span className='badge badge-success text-white'>Paid</span>
                                            :

                                            <button onClick={() => handlePayment(parcel)}
                                                className='btn btn-sm bg-primary text-black'>Pay</button>

                                    }
                                </td>
                                <td>{parcel?.deliveryStatus}</td>
                                <td>{parcel?.trackingId}</td>
                                <td>
                                    <button className='btn btn-sm hover:btn-primary text-black'>
                                        <FaEdit />
                                    </button>
                                    <button className='btn btn-sm hover:btn-primary text-black mx-2'>
                                        <FaMagnifyingGlass />
                                    </button>
                                    <button onClick={() => handleDeleteParcel(parcel._id)} className='btn btn-sm hover:btn-primary text-black'>
                                        <FaTrash />
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

export default MyParcels;