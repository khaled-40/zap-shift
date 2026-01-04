import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AssignRiders = () => {
    const [selectedParcel, setSelectedParcel] = useState(null);
    const axiosSecure = useAxiosSecure();
    const riderModalRef = useRef();
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?deliveryStatus=pending-pickup');
            return res.data;
        }
    })
    const handleModalOpen = parcel => {
        setSelectedParcel(parcel);
        console.log(selectedParcel.senderDistrict)
        riderModalRef.current.showModal();
    };
    const { data: riders = [] } = useQuery({
        queryKey: ['riders', selectedParcel?.senderDistrict, 'available'],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders?status=approved&district=${selectedParcel.senderDistrict}&workStatus=available`);
            console.log(res.data)
            return res.data;
        }
    })
    const handleAssignRider = rider => {
        const riderAssignInfo = {
            riderId: rider._id,
            riderEmail: rider.riderEmail,
            riderName: rider.riderName,

        };
        axiosSecure.patch(`/parcels/${selectedParcel._id}`, riderAssignInfo)
            .then(res => {
                console.log(res)
                riderModalRef.current.close();
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `This rider status has been ${status}`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }
    
    return (
        <div>
            <h2 className='text-4xl font-bold'>Pending Pickup: {parcels.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL NO</th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Tracking ID</th>
                            <th>Sender District</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>${parcel.cost}</td>
                                <td>{parcel.trackingId}</td>
                                <td>{parcel.senderDistrict}</td>
                                <td>
                                    <button
                                        onClick={() => handleModalOpen(parcel)}
                                        className='btn btn-primary text-black'>
                                        Assign Rider
                                    </button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Riders available : {riders.length}</h3>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>SL NO</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    riders.map((rider, i) => <tr key={rider._id}>
                                        <th>{i + 1}</th>
                                        <td>{rider.riderName}</td>
                                        <td>{rider.riderEmail}</td>
                                        <td>
                                            <button onClick={() => handleAssignRider(rider)}
                                                className='btn btn-primary text-black'>
                                                Assign
                                            </button>
                                        </td>
                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AssignRiders;