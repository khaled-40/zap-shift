import React from 'react';
import { useLoaderData } from 'react-router';

const RiderDetails = () => {
    const rider = useLoaderData();
    console.log(rider)
    return (
        <div>
            <h2>This is rider details</h2>
        </div>
    );
};

export default RiderDetails;