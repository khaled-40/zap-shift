import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Payment = () => {
    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();
    const { data: parcel = [], isLoading } = useQuery({
        queryKey: ['parcel', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })
    if (isLoading) {
        <div><span className="loading loading-infinity loading-lg"></span></div>
    }
    
    const handlePayment = async() => {
        const paymentInfo = {
            cost : parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName
        };
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        console.log(res.data);
        window.location.href = res.data.url
    }
    return (
        <div>
            <h2>Please pay USD {parcel.cost} for {parcel.parcelName}</h2>
            <button onClick={handlePayment} className='btn btn-primary text-black'>Pay</button>
        </div>
    );
};

export default Payment;