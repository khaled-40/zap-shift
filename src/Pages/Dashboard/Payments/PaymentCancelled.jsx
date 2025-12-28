import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            <h2 className='text-4xl'>Payment has been cancelled</h2>
            <Link to={'/dashboard/my-parcels'}><button className='btn btn-primary text-black'>Please try again</button></Link>
        </div>
    );
};

export default PaymentCancelled;