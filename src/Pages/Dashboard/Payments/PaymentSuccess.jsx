import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const axiosSecure = useAxiosSecure();
    const sessionId = searchParams.get('session_id');
    console.log(sessionId);
    useEffect(() => {
        if(sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res => {
                console.log(res.data)
                setPaymentInfo({
                    trackingId: res.data.trackingId,
                    transactionId: res.data.transactionId
                })

            })
        }
    },[sessionId])
    return (
        <div>
            <h2 className='text-4xl'>Payment Successfull</h2>
            <p>This is your tracking ID: {paymentInfo.trackingId}</p>
            <p>This is your transactionId ID: {paymentInfo.transactionId}</p>
        </div>
    );
};

export default PaymentSuccess;